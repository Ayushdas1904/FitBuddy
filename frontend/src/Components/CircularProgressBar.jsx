// CircularProgressBar.js
import React from 'react';
import '../Style/food.css';


const CircularProgressBar = ({ percentage }) => {

    const circleStyle = {
        background: `conic-gradient(#4caf50 ${percentage * 3.6}deg, #ccc 0deg)`
    };

    return (
        <div className="progress-circle" style={circleStyle}>
            <div className="circle">
                <div
                    className="mask full"
                    style={{ transform: `rotate(${percentage * 1.8}deg)` }}
                />
                <div
                    className="mask half"
                    style={{ transform: `rotate(${percentage * 1.8}deg)` }}
                />
                <div className="inside-circle">
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

export default CircularProgressBar;
