import React, { useState } from "react";
import "../AuthPage/authPage.scss";
import { Iauth } from "../../interface/Auth";
import { useMutation } from "react-query";
import { AuthService } from "../../service/auth.service";
import { useAuth } from "../../Providers/AuthProviders";

const AuthPage = () => {
  const [data, setData] = useState<Iauth>({
    email: "",
    password: "",
  });
  const [type, setType] = useState<string>("login");
  const { user, setUser } = useAuth();
  console.log(type);
  const { mutateAsync: loginAsync } = useMutation(
    "login",
    () => AuthService.login(data.email, data.password),
    {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: (user: Iauth) => {
        console.log(user);
        setUser(user);
      },
    }
  );
  const { mutateAsync: registrationAsync } = useMutation(
    "registration",
    () => AuthService.registration(data.email, data.password),
    {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: (user: Iauth) => {
        setUser(user);
      },
    }
  );

  const isAuthType = type === "login";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isAuthType) {
      await loginAsync();
    } else {
      await registrationAsync();
    }
  };

  return user ? (
    <h1>User in system</h1>
  ) : (
    <section className="authForm">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">
          <span>
            {isAuthType
              ? "Sign in to your(Login)"
              : "Sign up to your(Register)"}
          </span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <span> </span>
        </div>

        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>

        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit" className="submit">
          <span className="sign-text">{isAuthType ? "Login" : "Register"}</span>
        </button>

        {isAuthType ? (
          <p className="signup-link">
            <button
              type="button"
              className="up"
              onClick={() => {
                setType("registration");
              }}
            >
              Register
            </button>
          </p>
        ) : (
          <p className="signup-link">
            <button
              type="button"
              className="up"
              onClick={() => {
                setType("login");
              }}
            >
              Login
            </button>
          </p>
        )}
      </form>
    </section>
  );
};

export default AuthPage;
