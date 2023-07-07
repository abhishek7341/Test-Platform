import { Box } from "@mui/material";
import { Fragment, ReactNode } from "react";
import { ILayoutProps } from "../../utility/interfaces/layout";
import Carousel from "../carousel/Carousel";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Carousel style={{ width: "70%", height: "100vh" }} />
      {children}
    </Box>
  );
};
export default Layout;
