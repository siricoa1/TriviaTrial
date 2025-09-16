import React, { useState, useEffect } from "react";
import Timer from "./Timer";

const Question = ({ currentQuestion, difficulty }) => {
    console.log("Current Question:",currentQuestion.question);
    const [questionAsked, setQuestion] = useState('');
    const [correctAnswer, setCorrect] = useState('');
    const [possibleAnswers, setPossibleAnswers] = useState([]);

    useEffect(() => {
        setQuestion(currentQuestion.question);
        setCorrect(currentQuestion.correct_answer);
        setPossibleAnswers([...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(()=> Math.random() - 0.5));
    }, [currentQuestion]);


    return(
        <div className="w-75 p-3 mx-auto questionDiv">
            <h1>{questionAsked}</h1>
            <br></br>
            <Timer difficulty={difficulty}/>
            <div className="questionBtnDiv">
                <ul>
                    {possibleAnswers.map((ans, index) => (
                        <li key={index}><button className="btn btn-dark mt-3 btn-lg">{ans}</button></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Question;