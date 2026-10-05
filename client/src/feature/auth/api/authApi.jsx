import axios from "axios";
import { useContext } from "react";
import { MyStore } from "../../../app/context/MyContext";
import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

const useApi = () => {
  const { accessToken, setAccessToken } = useContext(MyStore);

  const accessTokenRef = useRef(accessToken);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000/api",
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = accessTokenRef.current;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/auth/refresh")
        ) {
          originalRequest._retry = true;

          try {
            const response = await api.post("/auth/refresh");

            const newAccessToken = response.data.data.accessToken;

            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api, setAccessToken]);

  return api;
};

export default useApi;
