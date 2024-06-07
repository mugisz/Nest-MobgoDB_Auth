import React from "react";
import style from "./App.module.scss";
import { Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./screens/UserPage/UserPage";
import { useAuth } from "./Providers/AuthProviders";
import LoginPage from "./screens/AuthPage/LoginPage.tsx/LoginPage";
import RegistratinPage from "./screens/AuthPage/RegistrainPage/RegistrainPage";
import { Bounce, ToastContainer } from "react-toastify";
import { Toast } from "react-toastify/dist/components";

function App() {
  const { isLoged } = useAuth();
  console.log("APP: ", isLoged);
  return (
    <div className={style.App}>
      <div className={style.container}>
        <Routes>
          {isLoged ? (
            <Route path="/user" element={<UserPage />} />
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistratinPage />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isLoged ? "/user" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
