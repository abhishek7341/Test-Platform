import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import AdminNameAvatar from "./AdminNameAvatar";
import HeaderCurrentDateTime from "./HeaderCurrentDateTime";
import "./SidebarHeader.css";
import { NavLink, useLocation } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";

const drawerWidth = 280;

interface ISidebarHeaderProps {
  window?: () => Window;
}
const SidebarHeader: React.FC<ISidebarHeaderProps> = (sidebarHeaderProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();

  const navTabsContent = [
    { text: "User", icon: <PersonIcon />, path: AppRoutings.UserListing },
    {
      text: "CMS Page",
      icon: <FeedRoundedIcon />,
      path: AppRoutings.CMSPageListing,
    },
    {
      text: "Mission",
      icon: <AdsClickRoundedIcon />,
      path: AppRoutings.MissionListing,
    },
    {
      text: "Mission Theme",
      icon: <AutoAwesomeMosaicRoundedIcon />,
      path: AppRoutings.ThemeListing,
    },
    {
      text: "Mission Skills",
      icon: <ConstructionRoundedIcon />,
      path: AppRoutings.SkillListing,
    },
    {
      text: "Mission Applicatins",
      icon: <FolderRoundedIcon />,
      path: AppRoutings.ApplicationListing,
    },
    {
      text: "Story",
      icon: <NoteAddRoundedIcon />,
      path: AppRoutings.StoryListing,
    },
    {
      text: "Banner Management",
      icon: <LoopRoundedIcon />,
      path: AppRoutings.BannerListing,
    },
  ];
  const { window } = sidebarHeaderProps;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="sidebar-box">
      <Toolbar sx={{ letterSpacing: 4, mt: 2.5, fontWeight: "Bold" }}>
        NAVIGATION
      </Toolbar>
      <List sx={{ fontSize: "0.9rem" }}>
        {navTabsContent.map((tab) => (
          <ListItem
            key={tab.text}
            disablePadding
            sx={{ mb: 1 }}
            component={NavLink}
            to={tab.path}
          >
            <ListItemButton
              sx={{ height: "50px", mx: 3, borderRadius: 2 }}
              className={`sidebar-tab-hover ${
                location.pathname === tab.path ? "sidebar-tab-hover-active" : ""
              }`}
            >
              <div className="tab-icon">{tab.icon}</div>
              <span className="tab-text">{tab.text}</span>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          color: "#000000",
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              fontSize: 13,
            }}
          >
            <HeaderCurrentDateTime />
            <AdminNameAvatar />
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      ></Box>
    </Box>
  );
};
export default SidebarHeader;
