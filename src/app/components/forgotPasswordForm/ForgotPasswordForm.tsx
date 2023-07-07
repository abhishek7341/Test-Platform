import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser } from "../../utility/interfaces/user";
import {
  TextField,
  Button,
  InputLabel,
  FormHelperText,
  FormControl,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import CustomTextField from "../TextField/CustomTextField";
import { IFormDesignProps } from "../../utility/interfaces/FormDesign";
import CustomButton from "../UI/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import { IForgotPasswordPayload } from "../../utility/interfaces/payload";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { forgotPassword } from "../../services/auth-service";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ForgotPasswordForm = ({ style }: IFormDesignProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const registrationValues: IForgotPasswordPayload = {
    email: "",
  };

  const formik = useFormik({
    initialValues: registrationValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await forgotPassword(values);
        toast.success(response.data.message);
        navigate(AppRoutings.LogIn);
      } catch (err) {}
      setIsLoading(false);
    },
  });

  return (
    <Box sx={style}>
      <Typography variant="h5">Forgot Password</Typography>
      <Typography
        sx={{
          color: "gray",
          marginBottom: "2rem",
          marginTop: "1rem",
          fontSize: "15px",
        }}
      >
        Enter your email address you've given to your account below and we will
        send you a password reset link
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <FormControl>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Email Address<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            id="email"
            placeholder="evandonohue@gmail.com"
            variant="outlined"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
          <CustomButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress sx={{ color: "orange" }} />
            ) : (
              "Reset My password"
            )}
          </CustomButton>
        </FormControl>
      </Box>
      <Link
        to={AppRoutings.LogIn}
        style={{ textDecoration: "none", color: "gray" }}
      >
        Login
      </Link>
    </Box>
  );
};
