import React from "react";
import leftImage from "./../../image/bg1.jpg";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="a-right col-md-6">
        <h1 className="text-center login-title">LOGIN</h1>
        <span className="sub-text">login with your mobile and password</span>
        <form className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Enter Your Mobile"
          />
          <input
            type="password"
            className="login-input"
            placeholder="Enter Your Password"
          />

          <button className="login-btn" type="submit">
            LOGIN
          </button>
        </form>
        <Link className="Link" to="/register">
          <span className="no-account">Don't have an account ? SIGNUP</span>
        </Link>
      </div>

      <div className="a-left col-md-6">
        <img src={leftImage} className="a-left-image" alt="" />
      </div>
    </div>
  );
}
export default Login;
