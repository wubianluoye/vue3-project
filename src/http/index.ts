import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosPromise, AxiosError }  from 'axios'

const http = axios.create({
  baseURL: '',
  timeout: 6000
}) as AxiosInstance

http.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response: AxiosResponse): AxiosPromise => {
  if(response.status!==200 || response.data.code!==200) {
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(error)
})

export default http