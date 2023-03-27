import React, { useEffect, useState } from "react";
import "./signInForm.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../reducer/asyncAuthReducer";
import { getEmailDataAction } from "../reducer/asyncMailBoxReducer";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userProfileData);
  console.log(userData)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const signupFormHandler = () => {
    navigate("/signupform");
  };
  const forgotPasswordFormHandler = () => {
    navigate("/forgotpasswordform");
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginButtonHandler = (e) => {
    e.preventDefault();
    const loginObj = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");
    dispatch(userSignInAction(loginObj));
    dispatch(getEmailDataAction(userData.email));
    navigate("/mailboxmainpage");
  };
  return (
    <div className="box">
      <div className="container">
        <div className="top-header">
          <span>Have an account?</span>
          <header>Login</header>
        </div>
        <div className="input-field">
          <input
            onChange={emailChangeHandler}
            value={email}
            type="email"
            className="input"
            placeholder="email"
            required
          />
          <PermIdentityIcon className="i" />
        </div>
        <div className="input-field">
          <input
            onChange={passwordChangeHandler}
            value={password}
            type="password"
            className="input"
            placeholder="password"
            required
          />
          <HttpsIcon className="i" />
        </div>
        <div className="input-field">
          <input
            type="submit"
            className="submit"
            value="Login"
            onClick={loginButtonHandler}
          />
        </div>
        <div className="bottom">
          <div className="left">
            <label
              htmlFor="check"
              style={{ cursor: "pointer" }}
              onClick={signupFormHandler}
            >
              Create an account
            </label>
          </div>
          <div className="right">
            <label
              style={{ cursor: "pointer" }}
              onClick={forgotPasswordFormHandler}
            >
              Forgot password?
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
