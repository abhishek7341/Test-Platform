import http from "./base-service";
import { AxiosResponse } from "axios";
import {
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from "../utility/interfaces/payload";

export const login = (payload: ILoginPayload): Promise<AxiosResponse> =>
  http.post("account/login", payload);

export const resetPassword = (
  payload: IResetPasswordPayload,
  token: string
): Promise<AxiosResponse> =>
  http.post(
    "account/reset-password?resetPasswordtoken=93136e28-76f6-4395-84e5-8bc0a06d095c05-07-2023+04%3a25%3a19+%2b00%3a00",
    payload
  );

export const register = (payload: IRegisterPayload): Promise<AxiosResponse> => {
  return http.post("account/register", payload);
};

export const forgotPassword = (
  payload: IForgotPasswordPayload
): Promise<AxiosResponse> => {
  return http.put("account/forgot-password", payload);
};
