import React, { useContext, useState } from "react";
import Sidebar from "./app/components/SidebarHeader/SidebarHeader";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Mission from "../src/app/pages/Missions/missionListing";
import User from "../src/app/pages/User/UserListing";
import "./App.css";
import { Typography } from "@mui/material";
import Login from "./app/pages/Login";
import ResetPassword from "./app/pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutings } from "./app/utility/enum/app-routings";
import MissionAddEdit from "./app/pages/Missions/missionAddEdit";
import Registration from "./app/pages/Registration/Registration";
import ForgotPassword from "./app/pages/ForgotPassword/ForgorPassword";
import CMSPage from "./app/pages/cms/CMSPage";
import AddEditCms from "./app/pages/cms/AddEditCms";
import AuthContext from "./app/store/auth-context";
import { useLocation } from "react-router";
import { AuthNotRequired } from "./app/utility/constants";
import BannerListing from "./app/pages/Banner/BannerListing";
import BannerAddEdit from "./app/pages/Banner/BannerAddEdit";
import MissionThemeListing from "./app/pages/MissionTheme/MissionThemeListing";
import MissionThemeAddEdit from "./app/pages/MissionTheme/MissionThemeAddEdit";

const App: React.FC = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <ToastContainer />
      {!isLoggedIn &&
        !AuthNotRequired.toString().includes(location.pathname) && (
          <Navigate to={AppRoutings.LogIn} />
        )}
      <Typography>
        <Routes>
          <Route path="*" element={<Navigate to={AppRoutings.LogIn} />} />
          <Route
            path={AppRoutings.UserListing}
            element={
              <Sidebar>
                <User />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.MissionListing}
            element={
              <Sidebar>
                <Mission />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.MissionAdd}
            element={
              <Sidebar>
                <MissionAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.MissionEdit + ":missionId"}
            element={
              <Sidebar>
                <MissionAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.ThemeListing}
            element={
              <Sidebar>
                <MissionThemeListing />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.ThemeAdd}
            element={
              <Sidebar>
                <MissionThemeAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.ThemeEdit + ":themeId"}
            element={
              <Sidebar>
                <MissionThemeAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.SkillListing}
            element={
              <Sidebar>
                <Mission />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.ApplicationListing}
            element={
              <Sidebar>
                <Mission />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.StoryListing}
            element={
              <Sidebar>
                <Mission />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.BannerListing}
            element={
              <Sidebar>
                <BannerListing />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.BannerAdd}
            element={
              <Sidebar>
                <BannerAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.BannerEdit + ":bannerId"}
            element={
              <Sidebar>
                <BannerAddEdit />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.LogIn}
            element={
              !isLoggedIn ? (
                <Login />
              ) : (
                <Navigate to={AppRoutings.UserListing} />
              )
            }
          />
          <Route path={AppRoutings.ResetPassword} element={<ResetPassword />} />
          <Route path={AppRoutings.Registation} element={<Registration />} />
          <Route
            path={AppRoutings.ForgotPassword}
            element={<ForgotPassword />}
          />
          <Route
            path={AppRoutings.CMSListing}
            element={
              <Sidebar>
                <CMSPage />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.CMSAdd}
            element={
              <Sidebar>
                <AddEditCms />
              </Sidebar>
            }
          />
          <Route
            path={AppRoutings.CMSEdit + ":contentId"}
            element={
              <Sidebar>
                <AddEditCms />
              </Sidebar>
            }
          />
        </Routes>
      </Typography>
    </>
  );
};

export default App;
