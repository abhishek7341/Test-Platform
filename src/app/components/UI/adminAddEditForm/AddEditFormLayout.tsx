import classes from "./AddEditFormLayout.module.css";
import { ReactNode } from "react";
interface IAddEditFormLayoutProps {
  children: ReactNode;
  isAdd: boolean;
}
const MissionAddEdit: React.FC<IAddEditFormLayoutProps> = (
  addEditFormLayoutProps
) => {
  return (
    <>
      <div className={classes.addEditMainBox}>
        <div className={classes.addEditHead}>
          {addEditFormLayoutProps.isAdd ? <span>Add</span> : <span>Edit</span>}
        </div>
        <div className={classes.subBox}>{addEditFormLayoutProps.children}</div>
      </div>
    </>
  );
};
export default MissionAddEdit;
