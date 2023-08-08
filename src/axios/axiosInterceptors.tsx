import axios from "axios";
import { stopLoader, startLoader } from "../redux/loaderSlice";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import GlobalErorrModel from "../components/globalErorModel";

interface GlobalAxiosState {
  Error: boolean;
}
const Axios: React.FC<GlobalAxiosState> = () => {
  const dispatch = useAppDispatch();
  const [Error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, []);

  const requestInterceptor = axios.interceptors.request.use(
    (config: any) => {
      let accessToken = localStorage.getItem("accessToken");
      {
        config.headers["Authorization"] = accessToken;
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
      if (error.response.status == 500) {
        setError(true);
        if (error.response.status == 401 || error.response.status == 403) {
          alert("you need to relogin");
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <>{Error ? <GlobalErorrModel onClose={() => setError(false)} /> : null}</>
  );
};
export default Axios;
