import React, { useState } from "react";

const CategoryDropdown = ({ sendBackData }) => {
    const [catSelect, setCatSelect] = useState("");
    const [label, setLabel] = useState('');

    const handleChange = (event) => {
        setCatSelect(event.target.value);
        setLabel(event.target.options[event.target.selectedIndex].text)
        sendBackData(event.target.value);
    };

    return (
        <div className="mb-3">
            <h3><label htmlFor="category" className="form-label">Select Category</label></h3>
            <select id="category" className="form-select" value={catSelect} onChange={handleChange}>
                <option value="">-- Choose --</option>
                <option value="9">General Knowledge</option>
                <option value="23">History</option>
                <option value="17">Science & Nature</option>
                <option value="22">Geography</option>
                <option value="20">Mythology</option>
                <option value="anyCategory">Any Category</option>
            </select>
        </div>
    );
};

export default CategoryDropdown;
