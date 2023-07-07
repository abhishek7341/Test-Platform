import { Button, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "./SidebarHeader.css";
const CurrentDateTime: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    authCtx.logout();
  };
  return (
    <>
      <div className="header-right-box">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ mr: 1 }}
          />
          <span>Evan Donohue</span>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};
export default CurrentDateTime;
