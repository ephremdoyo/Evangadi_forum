import React, { useEffect, useState } from "react";
import About from "../../components/About/About";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import classes from "./landing.module.css";
import Loader from "../../components/Loading/Loader/Loader";

const Landing = () => {
  const [activeComponent, setActiveComponent] = useState("Login");
  const [isLoading, setIsLoading] = useState(true);
  const showToLogin = () => setActiveComponent("Login");
  const showToSignUp = () => setActiveComponent("SignUp");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.outer_landing_page}>
          <section className={classes.landing_page_container}>
            <section className={classes.outer_signUp_container}>
              <section className={classes.signUp_container}>
                {activeComponent === "Login" ? (
                  <Login switchToSignUp={showToSignUp} />
                ) : (
                  <SignUp switchToLogin={showToLogin} />
                )}
              </section>
            </section>

            <div>
              <About />
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Landing;
