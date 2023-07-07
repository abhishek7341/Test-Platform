import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { orange } from "@mui/material/colors";

interface AdminAddButtonProps {
  pageName: string;
}

const AdminAddButton = (props: AdminAddButtonProps) => {
  const buttonStyle = {
    borderRadius: "50px",
    padding: "7px 15px",
    marginRight: "20px",
  };
  return (
    // <Button variant="outlined" size="medium" component={Link} to={`/${props.pageName}/add`} >    </Button>

    <Button
      variant="outlined"
      size="medium"
      color="warning"
      component={Link}
      to={`/${props.pageName}/add`}
      startIcon={<AddIcon />}
      style={buttonStyle}
    >
      <b>Add</b>
    </Button>
  );
};

export default AdminAddButton;
