import React, {useState} from 'react';
import Result from "./result.jsx";
import './survey.css';

function Survey() {

  const surveyQuestions = [
    {
      questionText: "How often do you engage in physical exercise? ",
      answerOptions: [
        {answerText: "Daily" , points: 10},
        {answerText: "2-3 times a week",  points: 6},
        {answerText: "Once a week", points: 4},
        {answerText: "Rarely or never", points: 2}
      ],
      positiveRemark: "Fantastic! Staying active keeps your heart strong, boosts energy, and improves mood.",
      negativeRemark: "Your body thrives on movement! Try incorporating even small activities to boost health"
    },
    {
      questionText: "How would you rate your daily water intake? ",
      answerOptions: [
        {answerText: "8 or more glasses" , points: 10},
        {answerText: "4-7 glasses",  points: 6},
        {answerText: "2-3 glasses", points: 4},
        {answerText: "Less than 2 glasses", points: 2}
      ],
      positiveRemark: "Great job! Proper hydration keeps your body functioning optimally and improves skin, digestion, and energy levels",
      negativeRemark: "Your body needs more water! Dehydration can cause fatigue, headaches, and sluggish metabolism."
    },
    {
      questionText: "How many hours of sleep do you get on average per night?",
      answerOptions: [
        {answerText: "7-9 hours" , points: 10},
        {answerText: "5-6 hours",  points: 6},
        {answerText: "4-5 hours", points: 4},
        {answerText: "Less than 4 hours", points: 2}
      ],
      positiveRemark: "Excellent! Quality sleep is the foundation of good health, keeping your mind sharp and your body strong",
      negativeRemark: "Sleep is essential for recovery and mental clarity. Try improving your sleep routine for better well-being"
    },
    {
      questionText: "What is your last recorded blood pressure?",
      answerOptions: [
        {answerText: "Normal (≤120/80 mmHg)" , points: 10},
        {answerText: "Pre-hypertension (121-139/81-89 mmHg)",  points: 6},
        {answerText: "Mild hypertension (140-149/90-99 mmHg", points: 4},
        {answerText: "Severe hypertension (≥150/100 mmHg)", points: 2}
      ],
      positiveRemark: "Well done! Healthy blood pressure means a lower risk of heart disease and better overall circulation.",
      negativeRemark: "High blood pressure can be a silent risk. Managing stress, diet, and activity levels can help keep it in check."
    },
    {
      questionText: "What is your last recorded blood sugar level?",
      answerOptions: [
        {answerText: "Normal (<100 mg/dL when fasting)" , points: 10},
        {answerText: "Prediabetes (100-125 mg/dL)",  points: 6},
        {answerText: "Mild diabetes (126-140 mg/dL)", points: 4},
        {answerText: "Uncontrolled diabetes (>140 mg/dL)", points: 2}
      ],
      positiveRemark: "Great! Balanced blood sugar means steady energy levels and a lower risk of diabetes.",
      negativeRemark: "Elevated blood sugar can lead to complications. Watch your sugar intake and maintain an active lifestyle."
    },
    {
      questionText: "What is your last recorded cholesterol level?",
      answerOptions: [
        {answerText: "Healthy (<200 mg/dL)" , points: 10},
        {answerText: "Borderline high (200-239 mg/dL)",  points: 6},
        {answerText: "High (240-259 mg/dL)", points: 4},
        {answerText: "Very high (≥260 mg/dL)", points: 2}
      ],
      positiveRemark: "Awesome! Healthy cholesterol levels keep your heart and blood vessels functioning smoothly.",
      negativeRemark: "High cholesterol can clog arteries over time. A balanced diet and exercise can help lower your levels."
    },
    {
      questionText: "What is your current BMI (Body Mass Index)?",
      answerOptions: [
        {answerText: "Normal (18.5 - 24.9)" , points: 10},
        {answerText: "Overweight (25 - 29.9)",  points: 6},
        {answerText: "Obese (30 - 34.9)", points: 4},
        {answerText: "Severely obese (≥35)", points: 2}
      ],
      positiveRemark: "You're at a healthy weight! Maintaining this balance reduces the risk of chronic diseases and keeps you feeling great",
      negativeRemark: "An unbalanced BMI can affect your overall health. Small lifestyle changes can make a big difference!"
    },
    {
      questionText: "How often do you consume processed or unhealthy foods?",
      answerOptions: [
        {answerText: "Rarely or never" , points: 10},
        {answerText: "Occasionally (1-2 times a week)",  points: 6},
        {answerText: "Regularly (3-4 times a week)", points: 4},
        {answerText: "Frequently (5+ times a week)", points: 2}
      ],
      positiveRemark: "Great discipline! Prioritizing whole foods nourishes your body and boosts long-term health.",
      negativeRemark: "Too much processed food can drain energy and increase health risks. Try healthier swaps for a stronger body."
    },
    {
      questionText: "Do you smoke or consume alcohol regularly?",
      answerOptions: [
        {answerText: "No, I don’t smoke or drink" , points: 10},
        {answerText: "Occasionally (Social drinking, casual smoking)",  points: 6},
        {answerText: "Weekly consumption", points: 4},
        {answerText: "Regularly", points: 2}
      ],
      positiveRemark: "Awesome choice! Avoiding smoking and excess alcohol helps protect your heart, lungs, and liver.",
      negativeRemark: "Regular smoking or drinking takes a toll on your body. Cutting back can dramatically improve your health."
    },
    {
      questionText: "How would you rate your current mental health?",
      answerOptions: [
        {answerText: "Excellent (No anxiety, depression, or chronic stress)" , points: 10},
        {answerText: "Moderate (Occasional stress/anxiety, manageable)",  points: 6},
        {answerText: "Somewhat poor (Frequent stress, mild depression/anxiety)", points: 4},
        {answerText: "Poor (Chronic stress, depression, or anxiety affecting daily life)", points: 2}
      ],
      positiveRemark: "Great mental well-being! Managing stress and staying positive keeps your mind and body in harmony.",
      negativeRemark: "Your mental health matters. Consider relaxation techniques or talking to someone for support."
    }
  ];

  const [question, setQuestion] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionSelected, setOptionSelected] = useState(false);
  const [quizCompleted,setQuizCompleted] = useState(false);
  const [resultArray,setResultArray] = useState([]);
 

  //Function for handling "next" button click
  const handleNextClick = () => {
    if(question < surveyQuestions.length - 1 && optionSelected){
      setQuestion((prev)=>prev+1);
      setSelectedOption(null);
      setOptionSelected(false);
      setResultArray((prevArray) => [
        ...prevArray,
        surveyQuestions[question].answerOptions[selectedOption].points, 
      ]);
    }
    else if(!optionSelected){
      alert("Please select an option!")
    }
  }

  const handleSubmitClick = () => {
    if(!optionSelected){
      alert("Please select an option!")
    }
    else{
      setQuizCompleted(true);
      setResultArray((prevArray) => [
        ...prevArray,
        surveyQuestions[question].answerOptions[selectedOption].points, 
      ]);
    }
  }

  if(quizCompleted){
    return(<Result resultArray={resultArray} surveyQuestions={surveyQuestions}/>)
  }

  if(question == surveyQuestions.length -1){
    document.getElementById('submitBtn').style.display = "block";
    document.getElementById('nextButton').style.display = "none";
  }

  return (
  <div className='mainContainer'>
    <div className="QuizContainer">
      <video className='backgroundVideo' autoPlay loop muted>
        <source src='/images/bgVideo.mp4' type='video/mp4'/>
      </video>    
      <h2>{question + 1}. {surveyQuestions[question].questionText}</h2>
      <div className="options">
        {surveyQuestions[question].answerOptions.map((option, index) => (
          <button
            key={index}
            className={`optionBtn ${selectedOption === index ? "selected" : ""}`}  
            onClick={() => {
              setSelectedOption(index);
              setOptionSelected(true);
            }}
          >
            {option.answerText}
          </button>
        ))}
      </div>
      <div className="buttonContainer">
        <button id="nextButton" onClick={handleNextClick}>Next</button>
        <button id="submitBtn" onClick={handleSubmitClick}>Submit</button>
      </div>
    </div>
  </div>  
  );
}

export default Survey;