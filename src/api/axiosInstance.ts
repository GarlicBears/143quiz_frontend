import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

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
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      try {
        // refresh token으로 accessToken 갱신
        // const response = await axiosInstance.get('user/reissue');
        const response = await axiosInstance.get('/user/reissue');
        const accessToken = response.headers['authorization'];
        if (accessToken) {
          Cookies.set('accessToken', accessToken, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          });

          // 요청 다시 시도
          if (error.config) {
            (error.config.headers as AxiosRequestHeaders).Authorization =
              `Bearer ${accessToken}`;
            return axiosInstance.request(error.config);
          }
        }
      } catch (refreshError) {
        console.error('리프레쉬 토큰 오류:', refreshError);
        Cookies.remove('accessToken');
        window.location.href = '/login';
      }
    } else {
      // 401 외의 에러 처리
      if (error.response) {
        const status = error.response.status;
        const errorMessages: { [key: number]: string } = {
          400: 'Bad Request',
          // 401: 'Unauthorized',
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
