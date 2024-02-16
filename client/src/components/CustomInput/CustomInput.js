import React, { useState } from 'react';
import './CustomInput.scss';

const CustomInput = ({ label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="custom-input-container input-effect">
            <input
                className={`effect ${inputValue && 'has-content'}`}
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder=""
            />
            <label>{label}</label>
            <span className="focus-border">
                <i></i>
            </span>
        </div>
    );
};

export default CustomInput;