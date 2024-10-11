import React from "react";
import classes from "./howitworks.module.css";

const HowItWorks = () => {
  return (
    <div className={classes.how_it_works}>
      <h2>How It Works</h2>
      <h5>✨ Create an Account:</h5>
      <p>
        {" "}
        Join our vibrant community of full stack developers with a quick
        sign-up!
      </p>{" "}
      <h5>❓ Ask Questions:</h5>
      <p>
        {" "}
        Have a question? Don’t hesitate! Our platform is your go-to for all
        things development.
      </p>{" "}
      <h5>🤝 Get Answers:</h5>
      <p>
        Receive insightful responses from fellow community members and seasoned
        experts.
      </p>
      <h5> 💡 Share Knowledge:</h5>{" "}
      <p>
        {" "}
        Give back by answering questions and helping others grow
        in their journey.
      </p>
    </div>
  );
};

export default HowItWorks;
