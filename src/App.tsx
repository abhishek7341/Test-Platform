import React from "react";
import Sidebar from "./app/components/SidebarHeader/SidebarHeader";
import { Route, Routes } from "react-router-dom";
import Mission from "../src/app/pages/Missions/missionListing";
import "./App.css";
import { Typography } from "@mui/material";
import logo from "./logo.svg";
import "./App.css";
import Carousel from "./app/components/carousel/Carousel";
import Layout from "./app/components/Layout/Layout";
import Login from "./app/pages/Login";
import ResetPassword from "./app/pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutings } from "./app/utility/enum/app-routings";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const ignoreSidebar = [
    AppRoutings.UserListing,
    AppRoutings.CMSPageListing,
    AppRoutings.MissionListing,
    AppRoutings.ThemeListing,
    AppRoutings.BannerListing,
    AppRoutings.StoryListing,
    AppRoutings.ApplicationListing,
    AppRoutings.SkillListing,
  ];
  const location = useLocation();
  let showSidebar = ignoreSidebar.toString().includes(location.pathname);
  return (
    <>
      {showSidebar ? <Sidebar /> : null}

      <ToastContainer />
      <Typography
        component={"div"}
        sx={{
          marginLeft: showSidebar ? { md: "280px" } : null,
          p: showSidebar ? 3 : null,
        }}
      >
        <Routes>
          <Route path={AppRoutings.UserListing} element={<Mission />} />
          <Route path={AppRoutings.CMSPageListing} element={<Mission />} />
          <Route path={AppRoutings.MissionListing} element={<Mission />} />
          <Route path={AppRoutings.ThemeListing} element={<Mission />} />
          <Route path={AppRoutings.SkillListing} element={<Mission />} />
          <Route path={AppRoutings.ApplicationListing} element={<Mission />} />
          <Route path={AppRoutings.StoryListing} element={<Mission />} />
          <Route path={AppRoutings.BannerListing} element={<Mission />} />
          <Route path={AppRoutings.LogIn} element={<Login />} />
          <Route path={AppRoutings.ResetPassword} element={<ResetPassword />} />
        </Routes>
      </Typography>
    </>
  );
};

export default App;
