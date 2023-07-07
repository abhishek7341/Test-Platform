import { Button } from "@mui/material";
import classes from "./Button.module.css";

const CustomButton = ({ ...props }) => {
  return (
    <Button
      sx={{
        color: "#757575",
        borderRadius: "20px",
        backgroundColor: "white",
        border: "2px solid #757575",
        "&:hover": { backgroundColor: "#757575", color: "white" },
        textTransform: "none",
        fontWeight: "bold",
        px: 2,
        marginRight: "10px",
      }}
      type={props.type}
      variant="text"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
export default CustomButton;
