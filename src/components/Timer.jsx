import React, { useState, useEffect } from "react";

const Timer = ({ difficulty }) => {

    const initialTime = difficulty === "hard" ? 15 : difficulty === "medium" ? 20 : 30;

    const [timeLeft, setTime] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setTimeout(() => {
        setTime(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
        alert("Time is up!");
        }
    }, [timeLeft]);

    return <h2>Time Left: {timeLeft}</h2>;
};

export default Timer;
