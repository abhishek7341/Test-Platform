import {
  Box,
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
import CustomButton from "../UI/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PASSWORD_EXPRESSION, PASSWORD_LENGTH } from "../../configs";

const ResetPasswordForm = ({ style }: IFormDesignProps) => {
  const [validateMessage, setValidateMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const formValues: IUser = {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box sx={style}>
      <Typography variant="h4">New Password</Typography>
      <Typography sx={{ color: "gray", marginBottom: "2rem" }}>
        Please enter a new password in the fields below
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}
      >
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText sx={{ marginLeft: 0 }}>New Password</FormHelperText>
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
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "1rem" }}>
          <FormHelperText sx={{ marginLeft: 0 }}>
            Confirm New Password
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
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <CustomButton type="submit">Change Password</CustomButton>
      </Box>
      <Link to="/login" style={{ textDecoration: "none", color: "gray" }}>
        Login
      </Link>
    </Box>
  );
};
export default ResetPasswordForm;
