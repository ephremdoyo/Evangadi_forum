import React, { useState } from "react";
import About from "../../components/About/About";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import classes from "./landing.module.css";

const Landing = () => {
  const [activeComponent, setActiveComponent] = useState("Login");
  const showToLogin = () => setActiveComponent("Login");
  const showToSignUp = () => setActiveComponent("SignUp");
  return (
    <section className={classes.outer_landing_page}>
      <section className={classes.landing_page_container}>
        <div>
          <section className={classes.outer_signUp_container}>
            <section className={classes.signUp_container}>
              {activeComponent === "Login" ? (
                <Login switchToSignUp={showToSignUp} />
              ) : (
                <SignUp switchToLogin={showToLogin} />
              )}
            </section>
          </section>
        </div>
        <div>
          <About />
        </div>
      </section>
    </section>
  );
};

export default Landing;
