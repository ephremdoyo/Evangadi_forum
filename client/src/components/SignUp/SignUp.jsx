import React, { useRef, useState } from "react";
import classes from "../../pages/Landing/landing.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

import axios from "../../API/axios";

const SignUp = ({ switchToLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const usernameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailDom.current.value.trim();
    const first_name = firstNameDom.current.value.trim();
    const last_name = lastNameDom.current.value.trim();
    const username = usernameDom.current.value.trim();
    const password = passwordDom.current.value;

    // check if missing input
    if (!email || !first_name || !last_name || !username || !password) {
      console.log("all fields are required");
      if (!email) {
        emailDom.current.style.borderColor = "#fe8302";
        return;
      }
      if (!first_name) {
        firstNameDom.current.style.borderColor = "#fe8302";
        return;
      }
      if (!last_name) {
        lastNameDom.current.style.borderColor = "#fe8302";
        return;
      }
      if (!username) {
        usernameDom.current.style.borderColor = "#fe8302";
        return;
      }
      if (!password) {
        passwordDom.current.style.borderColor = "#fe8302";
        return;
      }
    }
    // check password length
    if (password.length < 8) {
      console.log("password must at least 8 characters");
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoader(true);
      // send data to server
      const response = await axios.post("/user/register", {
        username,
        first_name,
        last_name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      setLoader(false);
      navigate("/login");
    } catch (error) {
      console.log(
        "Error during registration",
        error.response ? error.response.data : error.message
      );
      setLoader(false);
    }
    window.location.reload();
  }
  return (
    <>
      <div className={classes.signUp_title}>
        <h3>Join the network</h3>
        <p>
          Already have an account?
          <a
            to="#"
            onClick={(e) => {
              e.preventDefault();
              switchToLogin();
            }}
          >
            Sign in
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
        <div className={classes.fl_name}>
          <input
            ref={firstNameDom}
            type="text"
            placeholder="First Name"
            className={classes.f_name}
          />
          <input
            ref={lastNameDom}
            type="text"
            placeholder="Last Name"
            className={classes.l_name}
          />
        </div>
        <div>
          <input
            ref={usernameDom}
            type="text"
            placeholder="User Name"
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
          {errorMessage && (
            <p
              style={{ color: "red", marginBottom: "-15px", marginTop: "-7px" }}
            >
              {errorMessage}
            </p>
          )}
          <div className={classes.privacy_policy}>
            I argree to the
            <a href="https://www.evangadi.com/legal/privacy/" target="_blank">
              privacy policy
            </a>
            and
            <a href="https://www.evangadi.com/legal/terms/" target="_blank">
              terms of service
            </a>
            .
          </div>
          <button type="submit" className={classes.submit_btn}>
            {Loader ? (
              <ClipLoader size={20} color="green" />
            ) : (
              " Agree and Join"
            )}
          </button>
        </div>
        <div className={classes.last_link}>
          <div>
            <a
              to="#"
              onClick={(e) => {
                e.preventDefault();
                switchToLogin();
              }}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
