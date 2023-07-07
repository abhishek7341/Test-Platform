import { ReactNode } from "react";

export interface ILayoutProps {
  children: ReactNode;
}

export interface IDeleteDialogProp {
  handleDelete: () => void;
  handleCancel?: () => void;
  message: string;
}
