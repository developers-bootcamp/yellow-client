import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, } from 'axios';
import { off, on } from '../redux/loaderSlice';
const Interceptor = (store: any) => {

    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            store.dispatch(off())
            return response;
        },
        (error: AxiosError) => {
            store.dispatch(off())
            return Promise.reject(error);
        }
    );

    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            store.dispatch(on())
            return config;
        }
    );

}
export default Interceptor;