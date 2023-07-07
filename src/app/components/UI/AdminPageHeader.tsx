import "./AdminPageHeader.css";
import { ReactNode } from "react";

interface IAdminPageHeaderProps {
  children: ReactNode;
}
const AdminPageHeader: React.FC<IAdminPageHeaderProps> = (
  adminPageHeaderProps
) => {
  return (
    <>
      <div className="heading-box">
        <div className="adminPageHeading">{adminPageHeaderProps.children}</div>
        <hr />
      </div>
    </>
  );
};
export default AdminPageHeader;
