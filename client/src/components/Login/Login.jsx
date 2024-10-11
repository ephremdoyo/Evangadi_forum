import React, { useRef, useState } from "react";
import classes from "../../pages/Landing/landing.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import axios from "../../API/axios";

const Login = ({ switchToSignUp }) => {
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);

    const email = emailDom.current.value.trim();
    const password = passwordDom.current.value;

    // check if missing input
    if (!email || !password) {
      if (!email) {
        emailDom.current.style.borderColor = "#fe8302";
        setLoader(false);
        return;
      }

      if (!password) {
        passwordDom.current.style.borderColor = "#fe8302";
        setLoader(false);
        return;
      }
    }

    try {
      // send data to server
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
      setLoader(false);
    } catch (error) {
      console.log(
        "Error during registration",
        error.response ? error.response.data.message : error.message
      );
      setErrorMessage(error.response.data.message);
      setLoader(false);
    }
  }
  return (
    <>
      <div className={classes.signUp_title}>
        <h3>Login to your account</h3>
        <p>
          Don't have an account?
          <a
            to="#"
            onClick={(e) => {
              e.preventDefault();
              switchToSignUp();
            }}
          >
            Create a new account
          </a>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            ref={emailDom}
            type="email"
            placeholder="Email"
            className={classes.email_password}
          />
        </div>

        <div>
          <div className={classes.password_field}>
            <input
              className={classes.password_input}
              ref={passwordDom}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className={classes.toggle_password}
            >
              {showPassword ? <BiShow size={25} /> : <BiHide size={25} />}
            </button>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className={classes.forgot_password}>
            <div>
              <Link href="#">Forgot Password</Link>
            </div>
          </div>
          <button type="submit" className={classes.submit_btn}>
            {Loader ? <ClipLoader size={20} color="green" /> : "Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
