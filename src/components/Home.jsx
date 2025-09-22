import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DifficultyDropdown from "./DifficultyDropdown";
import CategoryDropdown from "./CategoryDropdown";

const Home = () => {

    const [diffData, setDiffData] = useState('');
    const [catData, setCatData] = useState('');
    const navigate = useNavigate();

    const handleStart = () => {
        if (!diffData || !catData){
            alert('Please select both a difficulty and a category to start!');
            return;
        }
        
        if (diffData && catData && catData == 'anyCategory'){
            fetch(`https://opentdb.com/api.php?amount=25&difficulty=${diffData}`)
            .then((res) => {
                if (!res.ok) {
                throw new Error(`HTTP error status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                navigate('/Quiz', {state:{questions: data.results, diff: diffData, cat: catData}});
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
            });
        }

        if (diffData && catData && catData != 'anyCategory') {
            fetch(`https://opentdb.com/api.php?amount=25&difficulty=${diffData}&category=${catData}`)
            .then((res) => {
                if (!res.ok) {
                throw new Error(`HTTP error status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                navigate('/Quiz', {state:{questions: data.results, diff: diffData, cat: catData}});
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
            });
        }
    }

    function handleDiffData(data){
        setDiffData(data);
    }
    
    function handleCatData(data) {
        setCatData(data);
    }

    return (
        <div id="rootDivHome" className="vh-100">
            <div className="atmo-gradient"></div>
            <div className="w-75 p-3 mx-auto homeContainer">
                <h1>Welcome to Trivia Trial!</h1>
                <br></br>
                <h4>The rules are simple, select a difficulty and category and hit start! Once the game begins,</h4>
                <h4>you will be given time to answer each question. Your total score will then be displayed on our</h4>
                <h4>leaderboard. Points are awarded based on right or wrong, not how fast you answer.</h4>
                <br></br>
                <h4>The difficulty also sets the ammount of time given to answer:</h4>
                <ol>
                    <h5><li>Easy: 30 seconds</li></h5>
                    <h5><li>Medium: 20 seconds</li></h5>
                    <h5><li>Hard: 10 seconds</li></h5>
                </ol>
                <br></br>
                <h4>Best of luck, and remember to have fun!</h4>
                <div id='homeComponentsDiv'>
                    <DifficultyDropdown sendBackData={handleDiffData}></DifficultyDropdown>
                    <CategoryDropdown sendBackData={handleCatData}></CategoryDropdown>
                    <div className='btnDiv'>
                        <button onClick={handleStart} className='btn btn-primary mt-3 btn-lg'>Start!</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Home;