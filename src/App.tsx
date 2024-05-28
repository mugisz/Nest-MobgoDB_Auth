import React from "react";
import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./screens/AuthPage/AuthPage";

function App() {
  return (
    <div className={style.App}>
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
