import { AppRoutings } from "../enum/app-routings";

export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const SOMETHING_WENT_WRONG = "Something went wrong";
export const UNAUTHORIZED = "Unauthorized";
export const MINIMUM_LENGTH: number = 2;
export const MAXIMUM_LENGTH: number = 255;
export const AuthNotRequired = [
  AppRoutings.Registation,
  AppRoutings.ForgotPassword,
  AppRoutings.ResetPassword,
];

export const INITIAL_PAGE_NUMBER = 0;
export const INITIAL_ROWSIZE = 5;
export const PAGE_OPTIONS = [5, 10, 25, 50];
