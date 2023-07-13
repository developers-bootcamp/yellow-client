import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";

const GlobalLoader: React.FC = () => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                setLoading(true);
                return config;
            }
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response: AxiosResponse) => {
                setLoading(false);
                return response;
            },
            (error: AxiosError) => {
                setLoading(false)
                return Promise.reject(error);
            }
        )

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };

    }, [])


    return (
        <>
            {loading && <Loader />}
        </>
    )
}
export default GlobalLoader;