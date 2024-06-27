import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO : 임시 ACCESS_TOKEN 변경하기(헤더에 담겨오는 accessToken 가져오기)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    if (accessToken) {
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
//Δ 환경변수에서 토큰을 가져오는 방식 .
// ∇
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     // 쿠키에서 accessToken 읽어오기
//     const accessToken = Cookies.get('token'); // 쿠키에서 토큰 가져오기
//     if (accessToken) {
//       if (!config.headers) {
//         config.headers = {} as AxiosRequestHeaders;
//       }
//       (config.headers as AxiosRequestHeaders).Authorization =
//         `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     return Promise.reject(error);
//   },
// ); 06-27오류,
// 사용자 브라우저 쿠키에서 직접 토큰을 읽음
// 사용자 로그인 > 서버로부터 받은 토큰을 쿠키에 저장한 경우
// 사용자 세션관리시 일반적으로
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const status = error.response.status;
      const errorMessages: { [key: number]: string } = {
        400: 'Bad Request',
        401: 'Unauthorized',
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
    return Promise.reject(error);
  },
);

export default axiosInstance;
