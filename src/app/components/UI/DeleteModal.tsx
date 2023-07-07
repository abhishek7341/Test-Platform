import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";

import { toast } from "react-toastify";

interface Props {
  contentId: number;
  onDelete: (contentId: number) => void;
  children: React.ReactNode;
}

const BASE_URL = "api/cmspages/";

const deleteRecord = async (contentId: number) => {
  try {
    await axios.delete(`${BASE_URL}${contentId}`);
  } catch (error: any) {}
};

const AlertDialog: React.FC<Props> = ({ contentId, onDelete }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    try {
      onDelete(contentId);
      deleteRecord(contentId);
      handleClose();
      toast.success("Content deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete content.");
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon sx={{ color: "#757575" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
