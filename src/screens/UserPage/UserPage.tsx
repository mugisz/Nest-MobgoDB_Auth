import React from "react";
import { useAuth } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { user, logout } = useAuth();
  const navigator = useNavigate();
  const handleLogout = () => {
    logout();
    navigator("/login");
  };

  console.log("User PAge", user);
  return (
    <div>
      <h1>Login with email: {user.data.user.email}</h1>
      <h2>Pass lenth is: {user.data.user.password}</h2>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default UserPage;
