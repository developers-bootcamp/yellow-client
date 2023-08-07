import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, } from 'axios';
import { stopLoader, startLoader } from '../redux/loaderSlice';
import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

import { useAppDispatch } from "../redux/store";
import GlobalModalDialog from '../components/globalModalDialog';
import GlobalErorrModal from '../components/globalErorModal';

interface GlobalAxiosState {
  showError: boolean;
}

const Axios: React.FC<GlobalAxiosState> = () => {

  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(false);
  }, []);

  const requestInterceptor = axios.interceptors.request.use(
    (config: any) => {
      let userToken = localStorage.getItem('accessToken');
    {
         config.headers["token"] = userToken;
     }
      console.log(config);
      dispatch(startLoader());
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  const responseInterceptor = axios.interceptors.response.use(
    (response: any) => {
      dispatch(stopLoader());
      return response;
    },
    (error: any) => {
       if ( error.response.status == 500){
        setShowError(true);
       }
      
      return Promise.reject(error);
    }
  );

  return (
    <>
    {showError ? (
      <GlobalErorrModal
        // showError={showError}
        onClose={() => setShowError(false)}
      />
    ) : null}
    </>
  );
};
export default Axios;
