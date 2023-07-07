import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useFormik } from "formik";
import classes from "./CustomPhoneInput.module.css";

interface PhoneInputProps {
  name: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  isError: Boolean;
  errorMessage: string | undefined;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  isError,
  errorMessage,
}) => {
  return (
    <>
      <PhoneInput
        country="in"
        inputProps={{
          required: true,
        }}
        placeholder={label}
        value={value}
        onChange={onChange}
        containerClass={isError ? classes.errorBorder : ""}
        inputClass={isError ? classes["form-control"] : ""}
        onBlur={onBlur}
      />

      {isError && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default CustomPhoneInput;
