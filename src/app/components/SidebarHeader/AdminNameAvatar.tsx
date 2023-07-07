import Avatar from "@mui/material/Avatar";
import "./SidebarHeader.css";
const CurrentDateTime: React.FC = () => {
  return (
    <>
      <div className="header-right-box">
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ mr: 1 }}
        />
        <span>Evan Donohue</span>
      </div>
    </>
  );
};
export default CurrentDateTime;
