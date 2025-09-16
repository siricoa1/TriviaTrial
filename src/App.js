import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Quiz" element={<QuizPage/>}/>
        </Routes>
    </div>
  );
};

export default App;
