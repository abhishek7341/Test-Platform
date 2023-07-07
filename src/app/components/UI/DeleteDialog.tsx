import * as React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { IDeleteDialogProp } from "../../utility/interfaces/ui";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({
  handleDelete,
  message,
  handleCancel,
}: IDeleteDialogProp) => {
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ backgroundColor: "#f6a164", color: "white" }}>
        Delete Confirmation
      </DialogTitle>
      <DialogContent sx={{ marginTop: "1rem" }}>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>No</Button>
        <Button onClick={handleDelete}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
