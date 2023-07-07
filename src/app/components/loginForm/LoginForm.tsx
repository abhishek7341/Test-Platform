import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { login } from "../../services/auth-service";
import AuthContext from "../../store/auth-context";
import { AppRoutings } from "../../utility/enum/app-routings";
import { IFormDesignProps } from "../../utility/interfaces/FormDesign";
import { ILoginPayload } from "../../utility/interfaces/payload";
import { IUser } from "../../utility/interfaces/user";
import CustomTextField from "../TextField/CustomTextField";
import CustomButton from "../UI/CustomButton";

const LoginForm = ({ style }: IFormDesignProps) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validateMessage, setValidateMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const loginValues: ILoginPayload = {
    email: "",
    password: "",
  };
  const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: loginValues,
    validationSchema: validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await login(values);
        toast.success("successfully loggedIn");
        authCtx.login(response.data.data.token);
        setValidateMessage("");
        // navigate("/admin/cms");
        navigate(AppRoutings.UserListing);
      } catch (err) {
        setValidateMessage("Invalid Credentials");
      }
      setIsLoading(false);
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
          <FormHelperText id="outlined-weight-helper-text">
            Email Address<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            type="email"
            id="emailAddress"
            placeholder="evan.donohou@gmail.com"
            variant="outlined"
            {...getFieldProps("email")}
            error={
              (touched.email && errors.email) || validateMessage ? true : false
            }
            helperText={(touched.email && errors.email) || validateMessage}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText id="outlined-weight-helper-text">
            Password<span className="required"> *</span>
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
          <CustomButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress sx={{ color: "orange" }} />
            ) : (
              "Login"
            )}
          </CustomButton>
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
        <Link to={AppRoutings.Registation} style={{ textDecoration: "none" }}>
          Create an account
        </Link>
      </Typography>
    </Box>
  );
};
export default LoginForm;
