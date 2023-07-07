import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  InputLabel,
  FormHelperText,
  FormControl,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CustomTextField from "../TextField/CustomTextField";
import { IUser } from "../../utility/interfaces/user";
import { IFormDesignProps } from "../../utility/interfaces/FormDesign";
import CustomButton from "../UI/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import { async } from "q";
import { IRegisterPayload } from "../../utility/interfaces/payload";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PASSWORD_EXPRESSION, PASSWORD_LENGTH } from "../../configs";
import { register } from "../../services/auth-service";
import CustomPhoneInput from "../UI/CustomPhoneInput";

export const RegistrationForm = ({ style }: IFormDesignProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    PhoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    demoPhoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{12}$/, "Phone Number must be 10 digits"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string()
      .required("Password is required")
      .min(PASSWORD_LENGTH, "Password must be at least 8 characters")
      .matches(
        PASSWORD_EXPRESSION,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const registrationValues: IRegisterPayload = {
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: "",
    demoPhoneNumber: "",
  };

  const formik = useFormik({
    initialValues: registrationValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await register(values);
        navigate(AppRoutings.LogIn);
        toast.success("Registered Successfully!");
      } catch (err) {}
      setIsLoading(false);
    },
  });

  return (
    <Box sx={style}>
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
            First Name<span className="required"> *</span>
          </FormHelperText>
          {/* <InputLabel htmlFor="name">Name</InputLabel> */}
          <CustomTextField
            id="firstname"
            placeholder="evan"
            variant="outlined"
            {...formik.getFieldProps("FirstName")}
            //label="Name"
            // name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            error={
              formik.touched.FirstName && formik.errors.FirstName ? true : false
            }
            helperText={formik.touched.FirstName && formik.errors.FirstName}
          />
        </FormControl>

        <FormControl sx={{ marginTop: "10px" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Last Name<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            id="lastname"
            placeholder="donohue"
            variant="outlined"
            {...formik.getFieldProps("LastName")}
            error={
              formik.touched.LastName && formik.errors.LastName ? true : false
            }
            helperText={formik.touched.LastName && formik.errors.LastName}
          />
        </FormControl>

        <FormControl sx={{ marginTop: "10px" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Demo Number
          </FormHelperText>
          <CustomPhoneInput
            name="demoPhoneNumber"
            label="Enter phone number"
            value={formik.values.demoPhoneNumber}
            onChange={(value) => formik.setFieldValue("demoPhoneNumber", value)}
            onBlur={formik.handleBlur("demoPhoneNumber")}
            isError={
              !!formik.touched.demoPhoneNumber &&
              !!formik.errors.demoPhoneNumber
            }
            errorMessage={formik.errors.demoPhoneNumber}
          />
        </FormControl>

        <FormControl sx={{ marginTop: "10px" }}>
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
            {...formik.getFieldProps("Email")}
            error={formik.touched.Email && formik.errors.Email ? true : false}
            helperText={formik.touched.Email && formik.errors.Email}
          />
        </FormControl>

        <FormControl sx={{ marginTop: "10px" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Password<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            id="password"
            placeholder="**********"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("Password")}
            error={
              formik.touched.Password && formik.errors.Password ? true : false
            }
            helperText={formik.touched.Password && formik.errors.Password}
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

        <FormControl sx={{ marginTop: "10px" }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ marginLeft: 0 }}
          >
            Confirm Password<span className="required"> *</span>
          </FormHelperText>
          <CustomTextField
            id="confirmpassword"
            placeholder="**********"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            {...formik.getFieldProps("ConfirmPassword")}
            error={
              formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
                ? true
                : false
            }
            helperText={
              formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormControl sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
          <CustomButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress sx={{ color: "orange" }} />
            ) : (
              "Register"
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
        Already Registered?
        <Link to={AppRoutings.LogIn} style={{ textDecoration: "none" }}>
          Login now
        </Link>
      </Typography>
    </Box>
  );
};
