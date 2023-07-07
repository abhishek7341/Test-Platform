import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { IFormDesignProps } from "../../utility/interfaces/FormDesign";
import { IUser } from "../../utility/interfaces/user";
import CustomTextField from "../TextField/CustomTextField";
import * as Yup from "yup";
import CustomButton from "../UI/CustomButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PASSWORD_EXPRESSION, PASSWORD_LENGTH } from "../../configs";
import { IResetPasswordPayload } from "../../utility/interfaces/payload";
import { resetPassword } from "../../services/auth-service";
import { toast } from "react-toastify";
import { AppRoutings } from "../../utility/enum/app-routings";

const ResetPasswordForm = ({ style }: IFormDesignProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [validateMessage, setValidateMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const formValues: IResetPasswordPayload = {
    password: "",
    confirmPassword: "",
  };

  const validate = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(PASSWORD_LENGTH, "Password must be at least 8 characters")
      .matches(
        PASSWORD_EXPRESSION,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: formValues,
    validationSchema: validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await resetPassword(
          values,
          "331a1c60-b110-4b30-aa00-851e404be34827-06-2023+07%3a49%3a13+%2b00%3a00"
        );
        toast.success("Password changed successfully");
        navigate(AppRoutings.LogIn);
      } catch (err) {}
      setIsLoading(false);
    },
  });
  return (
    <Box sx={style}>
      <Typography variant="h4">New Password</Typography>
      <Typography sx={{ color: "gray", marginBottom: "2rem" }}>
        Please enter a new password in the fields below
      </Typography>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}
      >
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText>
            New Password<span className="required"> *</span>
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
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText>
            Confirm New Password<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            variant="outlined"
            {...getFieldProps("confirmPassword")}
            error={
              touched.confirmPassword && errors.confirmPassword ? true : false
            }
            helperText={touched.confirmPassword && errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <CustomButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress sx={{ color: "orange" }} />
          ) : (
            "Change Password"
          )}
        </CustomButton>
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
export default ResetPasswordForm;
