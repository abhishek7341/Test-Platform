/* eslint-disable import/no-anonymous-default-export */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import { HttpStatusCodes } from "../utility/enum/http-status-codes";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../utility/constants";
import { AppRoutings } from "../utility/enum/app-routings";
import { BASE_URL } from "../configs/index";

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config.url);
    let isTokenRequired = true;
    // if (config.url?.includes(AppRoutings.LogIn)) {
    //   isTokenRequired = false;
    // }
    if (isTokenRequired === true) {
      const token = localStorage.getItem("token"); // TO DO
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization);
      }
    }

    if (config.url) {
      config.url = BASE_URL + config.url;
    }

    if (config.url) {
      config.headers["Cache-Control"] =
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0";
      config.headers.Pragma = "no-cache";
      config.headers.Expires = "0";
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
        toast.error(UNAUTHORIZED);
        break;
      case HttpStatusCodes.BadRequest:
        toast.error(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message
        );
        break;
      case HttpStatusCodes.InternalServerError:
        toast.error(INTERNAL_SERVER_ERROR);
        break;
      case HttpStatusCodes.NotFound:
        toast.error(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message
        );
        break;
      default:
        toast.error(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message
        );
        break;
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
