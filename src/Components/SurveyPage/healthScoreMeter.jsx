import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HealthScoreMeter = ({ resultSum }) => {
    const getColor = (score) => {
        if (score >= 85) return '#007bff'; 
        if (score >= 70) return '#28a745'; 
        if (score >= 50) return '#ffc107'; 
        if (score >= 30) return '#fd7e14'; 
        return '#dc3545'; 
    }

return (
    <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
            value={resultSum}
            text={`${resultSum}`}
            styles={buildStyles({
                textColor: getColor(resultSum),
                pathColor: getColor(resultSum),
                trailColor: "#ddd",
                textSize: "20px"
            })}
        />
    </div>
    );
};

export default HealthScoreMeter;