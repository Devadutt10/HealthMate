import React, {useEffect } from 'react';
import './result.css';
import HealthScoreMeter from './healthScoreMeter.jsx';


export default function Result({ resultArray, surveyQuestions }) {

    const resultSum = resultArray.reduce((acc, num) => acc + num, 0);
    useEffect(() => {
        const resultDiv = document.getElementById("resultDiv");
        const resultSumElement = document.getElementsByClassName('resultSum')[0];
        if (resultSumElement) {
            if (resultSum >= 85) {
                resultDiv.style.backgroundColor = "#d0ebff"; 
                resultSumElement.style.color = "#004085";  
            } else if (resultSum >= 70) {
                resultDiv.style.backgroundColor = "#d4edda";
                resultSumElement.style.color = "#155724";  
            } else if (resultSum >= 50) {
                resultDiv.style.backgroundColor = "#fff3cd"; 
                resultSumElement.style.color = "#856404";  
            } else if (resultSum >= 30) {
                resultDiv.style.backgroundColor = "#ffe5b4"; 
                resultSumElement.style.color = "#8B4513";  
            } else {
                resultDiv.style.backgroundColor = "#f8d7da"; 
                resultSumElement.style.color = "#8B0000"; 
            }
        }
        
    }, [resultSum]);


    const handleRestartClick = () => {
        window.location.reload();
    }

    return (
        <div className='resultContainer'>
            <video className='backgroundVideo' autoPlay loop muted>
                <source src='/Videos/bgVideo.mp4' type='video/mp4'/>
            </video>
            <div className='resultDisplay'>
                <div id='resultDiv' className='result'>
                    <HealthScoreMeter resultSum={resultSum}/>
                </div>
                <div className='additionalRemark'>
                    <p className='resultText'>
                        {resultSum >= 85
                            ? "Excellent job! Your overall health is in great condition. Your balanced diet, regular exercise, and proper hydration contribute to a strong and resilient body. Maintaining good sleep habits and stress management is key to long-term wellness. Keep up the great work and continue monitoring your health for any necessary adjustments!"
                            : resultSum >= 70
                            ? "You're in good health! While your habits are mostly positive, there's room for improvement. Consider optimizing your exercise routine, maintaining consistent hydration, or improving your sleep quality. Small changes can help you move towards excellent health and prevent potential issues in the future."
                            : resultSum >= 50
                            ? "Your health is average. This means some of your habits are beneficial, but others might be putting your well-being at risk. Evaluate your lifestyle—do you get enough physical activity? Are you consuming too much processed food? Improving these areas can greatly enhance your overall health and energy levels."
                            : resultSum >= 30
                            ? "Your health could be at risk. There are several areas that need urgent improvement. Poor sleep, high stress, inadequate physical activity, or unhealthy food choices could be affecting your well-being. It's important to address these habits now to prevent long-term health problems. Consider making gradual but consistent changes."
                            : "Your health score indicates a high risk. Unhealthy habits, poor nutrition, and lack of physical activity may be severely impacting your overall well-being. It is highly recommended that you consult a healthcare professional, make immediate lifestyle changes, and seek support for better long-term health."}
                    </p>
                </div>
                <button className='restartBtn' onClick={handleRestartClick}>Restart Survey</button>
            </div>
            
            <div className='remarkDisplay'>
                {
                    <div className='individualRemarks'>
                        {resultArray.map((value, index) => {
                            let remarkText;
                            let remarkClass;
                    
                            if (value > 5) {
                                remarkText = surveyQuestions[index].positiveRemark;
                                remarkClass = "positive";
                            } else {
                                remarkText = surveyQuestions[index].negativeRemark;
                                remarkClass = "negative";
                            }
                    
                            return (
                                <p key={index} className={remarkClass}>
                                    {remarkText}
                                </p>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

