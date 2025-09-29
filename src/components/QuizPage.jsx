import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";

const QuizPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { questions, diff} = location.state || {};
    const [curQuestion, setCurQuestion] = useState(0);
    const [numCorrect, setCorrect] = useState(0);

    if(questions.length < 1){
        return (
            <div id="rootDivQuiz" className="vh-100">
                <div className="atmo-gradient"></div>
                <div className="w-75 p-3 mx-auto quizContainer">
                    <h1>Questions unavailable for this catagory/difficulty, returning home.</h1>
                    {setTimeout(() => {
                        navigate('/');
                    }, 3000)}
                </div>
            </div>
        );
    }
    
    const initialTime = diff === "hard" ? 10 : diff === "medium" ? 20 : 25;
    const initialBarWidth = 100;
    
    
    const [timeLeft, setTime] = useState(initialTime);
    const [barWidth, setBarWidth] = useState(initialBarWidth);

    function handleCurrentQuestion(data) {
        setTime(initialTime);
        setBarWidth(initialBarWidth);
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

    useEffect(() => {
        let timerId;

        if (barWidth <= 0){
            setBarWidth(initialBarWidth);
            return;
        };
        if (diff === "hard") {
            timerId = setTimeout(() => {
                setBarWidth(barWidth - 10);
            }, 1000);
        } else if(diff === "medium"){
            timerId = setTimeout(() => {
                setBarWidth(barWidth - 5);
            }, 1000);
        } else {
            timerId = setTimeout(() => {
                setBarWidth(barWidth - 4);
            }, 1000);
        }

        return () => clearTimeout(timerId);
    }, [barWidth, initialBarWidth]);

    function handleNavigationHome() {
        navigate('/');
    }

    if (curQuestion >= questions.length) {
        return (
            <div id="rootDivQuiz" className="vh-100">
                <div className="atmo-gradient"></div>
                <div className="w-75 p-3 mx-auto quizContainer">
                    <div className='timerDiv'>
                        <h1  className="countdownText">Quiz Over! You got {numCorrect} correct.</h1>
                    </div>
                    <div className='btnDiv'>
                        <button onClick={handleNavigationHome} className="btn btn-primary mt-3 btn-lg">Play Again?</button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div id="rootDivQuiz" className="vh-100">
            <div className="atmo-gradient"></div>
            <div className="w-75 p-3 mx-auto quizContainer">
                <div className="w-75 mx-auto timerDiv">
                    <h1 className="countdownText">Time Left: {timeLeft}</h1>
                    <div className='countDownBar' style={{ width: `${barWidth}%` }}></div>
                    <div className="countDownBarEmpty"></div>
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