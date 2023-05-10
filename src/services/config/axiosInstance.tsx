import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
export const baseUrl =
  `https://www.googleapis.com/books/v1/`;

 
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

const onRequest = async (request:InternalAxiosRequestConfig):Promise<InternalAxiosRequestConfig> => {
  request.headers.Authorization = `Bearer`;
  return request;
};

const onRequestError = (error:AxiosError):Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response:AxiosResponse):AxiosResponse => {
  return response;
};

const onResponseError = async (error:AxiosError) => {
  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
