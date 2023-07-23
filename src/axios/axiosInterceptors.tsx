import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, } from 'axios';
import { stopLoader, startLoader } from '../redux/loaderSlice';
const Interceptor = (store: any) => {

    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            store.dispatch(stopLoader())
            return response;
        },
        (error: AxiosError) => {
            store.dispatch(stopLoader())
            return Promise.reject(error);
        }
    );

    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            store.dispatch(startLoader())
            return config;
        }
    );

}
export default Interceptor;