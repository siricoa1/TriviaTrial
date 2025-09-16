import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Question from "./Question";

const QuizPage = () => {

    const location = useLocation();
    const { questions, diff, cat } = location.state || {};
    console.log("recieved Questions: ", questions);
    const [curQuestion, setCurQuestion] = useState(0);
    return(
        <div id="rootDivQuiz" className="vh-100">
            <div className="atmo-gradient"></div>
            <div className="w-75 p-3 mx-auto quizContainer"></div>
            <Question currentQuestion={questions[curQuestion]} difficulty={diff}></Question>
        </div>
    );
}

export default QuizPage;