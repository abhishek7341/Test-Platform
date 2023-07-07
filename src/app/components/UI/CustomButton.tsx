import { Button, ButtonProps } from "@mui/material";
import classes from "./Button.module.css";

interface CustomButtonProp extends ButtonProps {
  type?: "submit" | "reset" | "button";
}

const CustomButton = ({
  type = "button",
  disabled,
  children,
  ...rest
}: CustomButtonProp) => {
  return (
    <Button
      disabled={disabled}
      sx={{
        color: "#F88634",
        borderRadius: "20px",
        backgroundColor: "white",
        border: "2px solid #F88634",
        "&:hover": { backgroundColor: "#F88634", color: "white" },
        textTransform: "none",
        fontWeight: "bold",
        px: 2,
        ...rest.sx,
      }}
      type={type}
      variant="text"
      {...rest}
    >
      {children}
    </Button>
  );
};
export default CustomButton;
