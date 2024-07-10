import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRrefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true, //cookie에 refresh토큰 조회
  headers: {
    'Content-Type': 'application/json',
  },
});
const excludeUrlEndings = ['/login', '/user/reissue'];

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 쿠키에서 accessToken 읽어오기
    const accessToken = Cookies.get('accessToken'); // 쿠키에서 토큰 가져오기.

    const isExcludedUrl = excludeUrlEndings.some((ending) =>
      config.url?.endsWith(ending),
    );

    if (!accessToken && !isExcludedUrl) {
      window.location.href = '/'; // 랜딩 페이지로 리디렉션
      throw new AxiosError('No access token', '401');
    }

    if (accessToken && !isExcludedUrl) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      (config.headers as AxiosRequestHeaders).Authorization =
        `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);
//
//response interceptor setting
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await axiosInstance.get('/user/reissue');
          const newAccessToken = response.headers['authorization'];

          if (newAccessToken) {
            Cookies.set('accessToken', newAccessToken, {
              expires: 1,
              secure: true,
              sameSite: 'Strict',
            });

            isRefreshing = false;
            onRrefreshed(newAccessToken);

            (originalRequest.headers as AxiosRequestHeaders).Authorization =
              `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          Cookies.remove('accessToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          (originalRequest.headers as AxiosRequestHeaders).Authorization =
            `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });

      return retryOriginalRequest;
    } else if (error.response?.status !== 401) {
      if (error.response) {
        const status = error.response.status;
        const errorMessages: { [key: number]: string } = {
          400: 'Bad Request',
          403: 'Forbidden',
          404: 'Not Found',
          405: 'Method Not Allowed',
          408: 'Request Timeout',
          409: 'Conflict',
          410: 'Gone',
          429: 'Too Many Requests',
          500: 'Internal Server Error',
          501: 'Not Implemented',
          502: 'Bad Gateway',
          503: 'Service Unavailable',
          504: 'Gateway Timeout',
          505: 'HTTP Version Not Supported',
        };

        const message = errorMessages[status] || `Error (${status})`;
        console.error(`${message}:`, error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
