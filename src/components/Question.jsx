import React, { useState, useEffect } from "react";


const Question = ({ currentQuestion, correctCallback, numberCallback }) => {

    const [questionAsked, setQuestion] = useState('');
    const [correctAnswer, setCorrect] = useState('');
    const [possibleAnswers, setPossibleAnswers] = useState([]);

    useEffect(() => {
        setQuestion(currentQuestion.question);
        setCorrect(currentQuestion.correct_answer);
        setPossibleAnswers([...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(()=> Math.random() - 0.5));
    }, [currentQuestion]);

    const handleAnswer = (index) => {
        if(possibleAnswers[index] === correctAnswer) {
            correctCallback(1)
        }
        numberCallback(1)
    };
    
    function decodeHTMLEntities(str) {
        if (!str) return str;
        const entities = {
            "&quot;": '"',
            "&#34;": '"',
            "&apos;": "'",
            "&#39;": "'",
            "&#039;": "'",
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&nbsp;": " ",
            "&plus;": "+",
            "&minus;": "−",
            "&times;": "×",
            "&divide;": "÷",
            "&equals;": "=",
            "&ouml;": "ö",
            "&Ouml;": "Ö",
            "&auml;": "ä",
            "&Auml;": "Ä",
            "&uuml;": "ü",
            "&Uuml;": "Ü",
            "&eacute;": "é",
            "&Eacute;": "É",
            "&egrave;": "è",
            "&Egrave;": "È",
            "&ecirc;": "ê",
            "&Ecirc;": "Ê",
            "&ntilde;": "ñ",
            "&Ntilde;": "Ñ"
        };
        return str.replace(/&[a-zA-Z0-9#]+;/g, match => entities[match] || match);
    }

    return(
        <div className="w-75 p-3 mx-auto questionDiv">
            <h1>{decodeHTMLEntities(questionAsked)}</h1>
            <div className="questionBtnDiv">
                <ul>
                    {possibleAnswers.map((ans, index) => (
                        <li key={index}><button onClick={() => handleAnswer(index)} className="btn btn-dark mt-3 btn-lg">{decodeHTMLEntities(ans)}</button></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Question;