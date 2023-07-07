import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { login } from "../../services/userService";
import { AppRoutings } from "../../utility/enum/app-routings";
import { IFormDesignProps } from "../../utility/interfaces/FormDesign";
import { IUser } from "../../utility/interfaces/user";
import CustomTextField from "../TextField/CustomTextField";
import CustomButton from "../UI/Button";

const LoginForm = ({ style }: IFormDesignProps) => {
  const [validateMessage, setValidateMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const loginValues: IUser = {
    emailAddress: "",
    password: "",
  };
  const validate = Yup.object().shape({
    emailAddress: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: loginValues,
    validationSchema: validate,
    onSubmit: async (values) => {
      console.log(values);
      const response: number = await login(values);
      if (response === 200) {
        toast.success("successfully loggedIn");
        setValidateMessage("");
      } else {
        setValidateMessage("Invalid Credentials");
      }
    },
  });
  return (
    <Box sx={style}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Email Address
          </FormHelperText>
          <CustomTextField
            type="email"
            id="emailAddress"
            placeholder="evan.donohou@gmail.com"
            variant="outlined"
            {...getFieldProps("emailAddress")}
            error={
              (touched.emailAddress && errors.emailAddress) || validateMessage
                ? true
                : false
            }
            helperText={
              (touched.emailAddress && errors.emailAddress) || validateMessage
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Password
          </FormHelperText>
          <CustomTextField
            type={showPassword ? "text" : "password"}
            id="password"
            variant="outlined"
            placeholder="********"
            {...getFieldProps("password")}
            error={
              (touched.password && errors.password) || validateMessage
                ? true
                : false
            }
            helperText={
              (touched.password && errors.password) || validateMessage
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></CustomTextField>
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <CustomButton type="submit">Login</CustomButton>
        </FormControl>
      </Box>
      <Link
        style={{ color: "gray", textDecoration: "none", marginBottom: "2rem" }}
        to={AppRoutings.ForgotPassword}
      >
        Lost your password
      </Link>
      <Typography sx={{ color: "gray", marginTop: "1rem" }}>
        Don't have an account?
        <Link to="/register" style={{ textDecoration: "none" }}>
          Create an account
        </Link>
      </Typography>
    </Box>
  );
};
export default LoginForm;
