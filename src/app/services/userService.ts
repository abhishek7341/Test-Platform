import { IUser } from "../utility/interfaces/user";
import http from "./base-service";
import { BASE_URL } from "../configs/index";
import { AppRoutings } from "../utility/enum/app-routings";

export const login = async (formValues: IUser) => {
  const payload = {
    email: formValues.emailAddress,
    password: formValues.password,
  };
  let status = 0;
  await http
    .post("account/login", payload)
    .then((response) => {
      console.log(response.data.data);
      localStorage.setItem("token", response.data.data);
      status = response.data.statusCode;
    })
    .catch((err) => {
      status = err.response.data.StatusCode;
    });
  return status;
};
