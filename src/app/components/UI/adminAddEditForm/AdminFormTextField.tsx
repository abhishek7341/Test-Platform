import CustomTextField from "../../TextField/CustomTextField";
import classes from "./AddEditFormLayout.module.css";

interface IAdminFormTextFieldProps {
  name: string;
  value: string | number | Date | undefined;
  type: string;
  error: boolean | undefined;
  helperText: string | undefined | boolean;
  onChange: (event: any) => void;
}

const AdminFormTextField: React.FC<IAdminFormTextFieldProps> = (
  adminFormTextFeildProps
) => {
  return (
    <CustomTextField
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "0.5px solid #D9D9D9",
          },
          "&:hover fieldset": {
            border: "0.5px solid #f88634",
          },
          "&.Mui-focused fieldset": {
            border: "0.5px solid #f88634",
          },
        },
        mb: 4,
      }}
      fullWidth
      name={adminFormTextFeildProps.name}
      className={classes.formTextFileds}
      value={adminFormTextFeildProps.value}
      type={adminFormTextFeildProps.type}
      onChange={adminFormTextFeildProps.onChange}
      error={adminFormTextFeildProps.error}
      helperText={adminFormTextFeildProps.helperText}
    />
  );
};
export default AdminFormTextField;
