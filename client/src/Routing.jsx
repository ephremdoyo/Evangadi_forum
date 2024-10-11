import React from "react";
import SharedOutlet from "./components/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import Question from "./Pages/Question/Question";
import { Route, Routes } from "react-router-dom";
import Answer from "./Pages/Answer/Answer";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedOutlet />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/question" element={<Question />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/home/:questionID" element={<Answer />} />
      </Route>
    </Routes>
  );
};

export default Routing;
