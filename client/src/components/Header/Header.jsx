import React, { useContext, useState } from "react";
import classes from "./header.module.css";
import Logo from "../../assets/evangadi-logo-black.png";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { AppState } from "../../App";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { user } = useContext(AppState);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return;
  }
  const navigate = useNavigate();
  // log out function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    // navigate("/login");
  };

  return (
    <section className={classes.outer_header_wrapper}>
      <div className={classes.header_container}>
        {/* evangadi logo */}
        <div>
          <img src={Logo} alt="" />
        </div>
        {/* right side links  */}
        <div className={classes.right_side_links}>
          {user.username ? (
            <p>
              <Link to="/">Home</Link>
            </p>
          ) : (
            <p>
              <Link to="/login">Home</Link>
            </p>
          )}

          <p>
            <Link to="/how-it-works">How it Works</Link>
          </p>

          {user.username ? (
            <Link to="#">
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                }}
                className={classes.button}
              >
                LOG OUT
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className={classes.button}>SIGN IN</button>
            </Link>
          )}
        </div>
        <div className={classes.header_menu_icon} onClick={toggleSidebar}>
          <RiMenu3Line size={35} style={{ color: "orange" }} />
        </div>

        {isSidebarOpen && (
          <div className={classes.header__sidebar}>
            <span
              className={classes.header__close_icon}
              onClick={toggleSidebar}
            >
              {/* Close (X) icon */}
              <IoMdClose />
            </span>
            <nav className={classes.header__nav}>
              <a href="/" onClick={toggleSidebar}>
                Home
              </a>
              <a href="/how-it-works" onClick={toggleSidebar}>
                How it works
              </a>
            </nav>
            {user.username ? (
              <button className={classes.button} onClick={handleLogout}>
                SIGN OUT
              </button>
            ) : (
              <button className={classes.button} onClick={handleLogout}>
                SIGN IN
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
