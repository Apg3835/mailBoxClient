import React, { useState } from "react";
import "./signInForm.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../reducer/asyncAuthReducer";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signupButtonHandler = (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (password === confirmPassword) {
      const signupFormObj = {
        email: email,
        password: password,
        confirmPassword:confirmPassword,
      };
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      dispatch(userSignUpAction(signupFormObj));
    } else {
      toast.error("password not matching");
      console.log("jhghgg");
      return;
    }
  };

  const signinFormHandler = () => {
    navigate("/");
  };
  return (
    <div class="box">
      <div class="container">
        <div class="top-header">
          <span>Create an account?</span>
          <header>Signup</header>
        </div>
        <div class="input-field">
          <input
            onChange={emailChangeHandler}
            value={email}
            type="email"
            class="input"
            placeholder="email"
            required
          />
          <PermIdentityIcon className="i" />
        </div>
        <div class="input-field">
          <input
            onChange={passwordChangeHandler}
            value={password}
            type="password"
            class="input"
            placeholder="password"
            required
          />
          <HttpsIcon className="i" />
        </div>
        <div class="input-field">
          <input
            onChange={confirmPasswordChangeHandler}
            value={confirmPassword}
            type="password"
            class="input"
            placeholder="confirm-password"
            required
          />
          <HttpsIcon className="i" />
        </div>
        <div class="input-field">
          <input
            onClick={signupButtonHandler}
            type="submit"
            class="submit"
            value="Signup"
          />
        </div>
        <div class="bottom">
          <div class="left">
            <label
              for="check"
              style={{ cursor: "pointer" }}
              onClick={signinFormHandler}
            >
              Already have an account
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
