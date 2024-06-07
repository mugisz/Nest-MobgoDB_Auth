import React, { useState, useEffect } from "react";
import "../authPage.scss";

import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/AuthProviders";
import { AuthService } from "../../../service/auth.service";
import { Iauth } from "../../../interface/Auth";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const RegistrainPage = () => {
  const [data, setData] = useState<Iauth>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { user, setUser, setIsLoged } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: registrationAsync } = useMutation(
    "registration",
    () => AuthService.registration(data.email, data.password),
    {
      onSuccess: (user: Iauth) => {
        setUser(user);
      },
    }
  );

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (data.password.trim().length === 0) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await registrationAsync();
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setIsLoged(true);
        navigate("/user");
      } catch (error: any) {
        toast.error(`Something wrong: ${error.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <section className="authForm">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">
          <span>Sign up to your SPACE</span>
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
          <span className="sign-text">Registration</span>
        </button>
        <p className="signup-link">
          <Link to="/login" className="up">
            Switch to Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </section>
  );
};

export default RegistrainPage;
