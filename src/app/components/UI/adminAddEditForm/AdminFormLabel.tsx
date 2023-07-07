import { ReactNode } from "react";
import classes from "./AddEditFormLayout.module.css";

interface IAdminFormLabelProps {
  children: ReactNode;
  htmlFor?: string;
}
const AdminFormLabel: React.FC<IAdminFormLabelProps> = (
  adminFormLabelProps
) => {
  return (
    <label
      className={classes.adminFormLabel}
      htmlFor={adminFormLabelProps.htmlFor}
    >
      {adminFormLabelProps.children}
    </label>
  );
};
export default AdminFormLabel;
