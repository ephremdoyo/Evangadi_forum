import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./answer.module.css";
import axios from "../../API/axios";
import { useLocation, useParams } from "react-router-dom";
import { AppState } from "../../App";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../../components/Loading/Loader/Loader";

const Answer = () => {
  const [answer, setAnswer] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [ErrorQuestion, setErrorQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Alert message state
  const [singleQuestion, setSingleQuestion] = useState({});
  // To track success or error
  const [alertType, setAlertType] = useState("");
  const { user } = useContext(AppState);
  const { questionID } = useParams();
  const token = localStorage.getItem("token");
  // use useEffetct to fetch data when the Component is mount

  const answerDom = useRef(null);

  async function singQuestion() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/question/${questionID}`, {
        headers: { Authorization: "Bearer " + token },
      });

      setSingleQuestion(data.question[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function getAnswer() {
    try {
      const { data } = await axios.get(`/answer/${questionID}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswer(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setErrorQuestion(error.response.data.message);
    }
  }

  async function postAnswer(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    if (!answerValue) {
      answerDom.current.style.borderColor = "#fe8302";
      return;
    }
    try {
      const response = await axios.post(
        `/answer/${questionID}`,
        { answer: answerValue },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setAlertMessage("Your answer was posted successfully!");
      setAlertType("success");
    } catch (error) {
      console.log(error);
      setAlertMessage("There was an error submitting your post.");
      setAlertType("error");
    }
    setTimeout(() => {
      setAlertMessage("");
      window.location.reload();
    }, 4000);
  }

  useEffect(() => {
    singQuestion();
    getAnswer();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.answer_page_container}>
          <section className={classes.answer_inner_container}>
            <div className={classes.answer_title}>
              <h1>QUESTION</h1>
            </div>
            {/* Question Section  */}
            <div className={classes.question_section}>
              <div style={{ display: "flex" }}>
                <FaArrowCircleRight
                  style={{ color: "blue", marginRight: "10px" }}
                />
                <h5 className={classes.question_title}>
                  {singleQuestion.title}
                </h5>
              </div>
              <div className={classes.border_bottom}></div>
              <div className={classes.description_wrapper}>
                <p>{singleQuestion.content}</p>
              </div>
            </div>
            {/* answer section  */}
            <div>
              <div className={classes.community_title}>
                <h2>Answer From The Community</h2>
              </div>
              <div className={classes.answer_container_community}>
                {ErrorQuestion ? (
                  <h4 style={{ paddingBottom: "30px" }}>
                    No answer yet. Be the first one to answer 😊
                  </h4>
                ) : (
                  answer.map((singleAnswer) => {
                    const answer = singleAnswer.content;
                    const username = singleAnswer.user_name;
                    const answerSec = (
                      <div>
                        <div
                          className={classes.answer_user_container}
                          style={{ display: "flex" }}
                        >
                          <div>
                            <FaUserCircle
                              size={55}
                              style={{ color: "#022553" }}
                            />
                            <p>{username}</p>
                          </div>
                          <div className={classes.answer_container}>
                            {answer}
                          </div>
                        </div>
                        <div
                          className={classes.answer__user_border_bottom}
                        ></div>
                      </div>
                    );
                    return answerSec;
                  })
                )}
              </div>
            </div>

            {/* Post question section */}

            <div className={classes.post_answer_sec}>
              {alertMessage && (
                <div
                  className={classes.question_alert_message}
                  style={{
                    color: alertType === "success" ? "green" : "red",
                  }}
                >
                  {alertMessage}
                </div>
              )}
              <form onSubmit={postAnswer}>
                <textarea
                  className={classes.post_textarea}
                  ref={answerDom}
                  rows="6"
                  cols="100"
                  name=""
                  id=""
                  placeholder="Your answer ..."
                ></textarea>
                <br />
                <button className={classes.post_button} type="submit">
                  Post Answer
                </button>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Answer;
