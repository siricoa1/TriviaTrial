import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Question from "./Question";

const QuizPage = () => {

    const location = useLocation();
    const { questions, diff} = location.state || {};
    const [curQuestion, setCurQuestion] = useState(0);
    const [numCorrect, setCorrect] = useState(0);
    
    const initialTime = diff === "hard" ? 15 : diff === "medium" ? 20 : 30;
    
    const [timeLeft, setTime] = useState(initialTime);

    function handleCurrentQuestion(data) {
        setTime(initialTime);
        setCurQuestion(prev => prev + data);
    };

    function handleCorrectQuestion(data) {
        setCorrect(prev => prev + data);
    };

    useEffect(() => {
        if (timeLeft <= 0){
            setTime(initialTime);
            setCurQuestion(prev => prev + 1);
            return;
        };

        const timerId = setTimeout(() => {
        setTime(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft, initialTime]);


    if (curQuestion >= questions.length) {
        return (
            <div id="rootDivQuiz" className="vh-100">
                <div className="atmo-gradient"></div>
                <div className="w-75 p-3 mx-auto quizContainer">
                    <div className='timerDiv'>
                        <h1  className="countdownText">Quiz Over! You got {numCorrect} correct.</h1>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div id="rootDivQuiz" className="vh-100">
            <div className="atmo-gradient"></div>
            <div className="w-75 p-3 mx-auto quizContainer">
                <div className="timerDiv">
                    <h1 className="countdownText">Time Left: {timeLeft}</h1>
                </div>
                <br></br>
                <Question 
                    currentQuestion={questions[curQuestion]}  
                    correctCallback={handleCorrectQuestion}
                    numberCallback={handleCurrentQuestion}>
                </Question>
            </div>
        </div>
    );
}

export default QuizPage;