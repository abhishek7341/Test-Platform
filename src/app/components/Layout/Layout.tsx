import { Box } from "@mui/material";
import { Fragment, ReactNode } from "react";
import { ILayoutProps } from "../../utility/interfaces/ui";
import Carousel from "../carousel/Carousel";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
      }}
    >
      <Carousel
        style={{
          width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" },
          height: { lg: "100vh", md: "100vh", sm: "60vh", xs: "50vh" },
        }}
      />
      {children}
    </Box>
  );
};
export default Layout;
