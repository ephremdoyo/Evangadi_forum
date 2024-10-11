import React, { useContext, useEffect, useState } from "react";
import classes from "./home.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { AppState } from "../../App";
import axios from "../../API/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [question, setQuestion] = useState([]);
  const [ErrorQuestion, setErrorQuestion] = useState("");
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");

  async function getQuestion() {
    try {
      const { data } = await axios.get("/question", {
        headers: { Authorization: "Bearer " + token },
      });

      setQuestion(data.questions);
      // console.log(data);
    } catch (error) {
      console.log(error);
      setErrorQuestion(error.response.data.message);
    }
  }
  useEffect(() => {
    if (!user.username) {
      window.location.reload();
      return;
    }
    getQuestion();
  }, []);

  return (
    <section className={classes.home_page_container}>
      <section className={classes.inner_home_container}>
        <div className={classes.ask_question_link}>
          <Link to="/question">
            <button className={classes.ask_question_btn}>Ask Question</button>
          </Link>
          <p style={{ paddingRight: "50px" }}>
            Welcome: <span style={{ color: "#FF8500" }}>{user.username}</span>{" "}
          </p>
        </div>
        <div className={classes.search_input}>
          <input type="text" placeholder="Search question" />
        </div>

        {ErrorQuestion ? (
          <h4 style={{ paddingBottom: "30px" }}>No Question yet 😊</h4>
        ) : (
          question.map((singleQuestion) => {
            const title = singleQuestion.title;
            const content = singleQuestion.content;
            const username = singleQuestion.user_name;
            const questionID = singleQuestion.question_id;

            let question = (
              <div
                key={questionID}
                className={classes.username_title_container}
              >
                <div className={classes.username_container}>
                  <FaRegCircleUser size={80} /> <p>{username}</p>
                </div>
                <Link to={`/home/${questionID}`}>
                  <div className={classes.title_container}>{title}</div>
                </Link>
                <Link to={`/home/${questionID}`}>
                  <div className={classes.right_angle_container}>
                    <FaAngleRight size={50} />
                  </div>
                </Link>
              </div>
            );
            return question;
          })
        )}
      </section>
    </section>
  );
};

export default Home;
