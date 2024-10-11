import React from "react";
import classes from "./footer.module.css";
import Logo from "../../assets/evangadi-logo-footer.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <section className={classes.footer_container}>
      {/* inner fooer container  */}
      <div className={classes.footer_inner_container}>
        {/* left side link container  */}
        <div className={classes.footer_left_side_links}>
          <div className={classes.footer_logo}>
            <a href="">
              <img src={Logo} alt="" />
            </a>
          </div>
          <div className={classes.social_links}>
            <a href="https://www.facebook.com/evangaditech">
              <FacebookOutlinedIcon size={30} />
            </a>

            <a href="https://www.instagram.com/evangaditech/">
              <InstagramIcon size={30} />
            </a>

            <a href="https://www.youtube.com/@EvangadiTech">
              <YouTubeIcon size={30} />
            </a>
          </div>
        </div>
        {/* middle links container  */}
        <div className={classes.footer_middle_side_links}>
          <h5>Useful Link</h5>
          <p>
            <a href="/how-it-works">How it works</a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/terms/">Terms of Service</a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/privacy/">Privacy policy</a>
          </p>
        </div>
        {/* right side links container  */}
        <div className={classes.footer_right_side_links}>
          <h5>Contact info</h5>
          <p>
            <a href="">Evangadi Networks</a>
          </p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
