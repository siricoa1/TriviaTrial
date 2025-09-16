import React, { useState } from "react";

const DifficultyDropdown = ({ sendBackData }) => {
    const [diffSelect, setDiffSelect] = useState("");


    const handleChange = (event) => {
        setDiffSelect(event.target.value);
        sendBackData(event.target.value);
    };

    return (
        <div className="mb-3">
            <h3><label htmlFor="difficulty" className="form-label">Select difficulty</label></h3>
            <select id="difficulty" className="form-select" value={diffSelect} onChange={handleChange}>
                <option value="">-- Choose --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    );
};

export default DifficultyDropdown;
