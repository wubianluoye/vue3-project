import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from "axios";
import { Toast } from "vant";

const http = axios.create({
  baseURL: "",
  timeout: 6000,
}) as AxiosInstance;

http.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse): AxiosPromise => {
    Toast.clear();
    if (response.status !== 200 || response.data.code !== 200) {
      Toast.fail(response.data);
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
