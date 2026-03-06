import React from "react";
import {useState, useEffect} from 'react';
import { auth } from "../../firebaseAuth"; // Go up 2 folders to src/
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './welcome.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();

  //Header text animation

  const text = "Welcome To HealthMate, Your Virtual Health Assistant.";

  const textVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // Controls the letter delay
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 10 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } } // Appear letter by letter
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigate("/"); // Redirect to login page
      alert("Successfully logged out!")
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleMedicalSurvey = () => {
    try {
      navigate('/survey')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChatBot = () => {
    try {
      navigate('/chatBot')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleMedicineRemainder = () => {
    try {
      navigate('/medicine');
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleFindADoctor = () => {
    try {
      navigate('/doctor');
    } catch (error) {
      console.log(error.message)
    }
  }


  //Section for automatically changing images
  const images = [
    "/welcome/ghibli3.jpg",
    "/welcome/ghibli1.jpg",
    "/welcome/ghibli2.jpg",
    "/welcome/ghibli4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  //Nav scrolling
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  return (
    <div className="container">
      <header className="navbar">

        <h1 className="logo">HealthMate</h1>
        <nav>
          <ul>
            <li className="nav-item" onClick={() => scrollToSection("home")}>Home</li>
            <li className="nav-item" onClick={() => scrollToSection("services")}>Services</li>
            <li className="nav-item" onClick={() => scrollToSection("team")}>Team</li>
            <li className="nav-item" onClick={() => scrollToSection("contact")}>Contact</li>
          </ul>
        </nav>
        <button className="login-btn" onClick={handleLogout}>Logout</button>
      </header>

      <section className="hero" id="home">
      <motion.h1 
        variants={textVariants} 
        initial="hidden" 
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
        </motion.h1>
        <p>We make managing your health easier.</p>
      </section>

      <section className="services" id="services">
        <h1>Our Services</h1>
        <p>Discover the best health assistance services tailored for you.</p>

        <div className="serviceContainer">
          <div className="eachService">
            <h2>Medical Survey</h2>
            <img src="/welcome/surveyImage.jpg" />
            <p>Take our medical survey where you will be asked highly sophisticated questions regarding your health. Find out how healthy you are.</p>
            <button className="serviceBtn" onClick={handleMedicalSurvey}>Visit</button>
          </div>
          <div className="eachService">
            <h2>AI Health Assistant</h2>
            <img src="/welcome/chatBotImage.jpg" />
            <p>Still wondering about your health? Ask our highly advanced chatbot any questions regarding your health and get real time responses.</p>
            <button className="serviceBtn" onClick={handleChatBot}>Visit</button>
          </div>
          <div className="eachService">
            <h2>Medicine Reminder</h2>
            <img src="/welcome/medicineReminderImage.jpg" />
            <p>Are you someone who have a poor memory and forget to take your medicines? If so, we offer you our medicine reminder service where you will be notified with an email when its time to take your medicines.</p>
            <button className="serviceBtn" onClick={handleMedicineRemainder}>Visit</button>
          </div>
          <div className="eachService">
            <h2>Find a Doctor</h2>
            <img src="/welcome/findADoctorImage.jpg" />
            <p>Are you facing a medical emergency? If so, we offer you our Find A Doctor service where you can find nearby doctors of your specified field.</p>
            <button className="serviceBtn" onClick={handleFindADoctor}>Visit</button>
          </div>
        </div>
      </section>

      <section className="team" id="team">
        <h1>MEET THE TEAM</h1>
        <div className="aboutDiv">
          <div className="image-container">
            <img src={images[currentIndex]} alt="Team" />
          </div>
          <p>Our dynamic team—Navneet, Devadutt, Krishnanath, and Derin—is a powerhouse of innovation, each bringing unique expertise to this project. Navneet, the visionary, spearheaded the architecture and backend, ensuring seamless performance. Devadutt, a frontend maestro, crafted an intuitive and visually stunning user interface. Krishnanath, our AI and chatbot specialist, infused intelligence into our system, making interactions smarter. Derin, the Firebase and notifications expert, flawlessly implemented real-time alerts and database management. As third-year Computer Science students at the College of Engineering Aranmula, we take pride in pushing boundaries, proving that our skills and teamwork can rival even the best in the industry! 🚀</p>
        </div>
      </section>
      <section className="contact" id="contact">
        <h1>CONTACT US</h1>
        <div className="contactList">
          <p><a href="https://www.instagram.com/nav_neet_6_9?igsh=em1zamJyMm1tZHdr " target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          nav_neet_6_9
            </a></p>
          <p><a href="https://www.instagram.com/devaduttp?igsh=MWwyaHFkdzF1MWVicw== " target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          devaduttp
            </a></p>
          <p><a href="https://www.instagram.com/derintomdaison?igsh=ZWRyMmF3bzhidXAz " target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          derintomdaison
            </a></p>
          <p>Krishnanath: +91 6282587357</p>
        </div>
      </section>
    </div>


  );
};



export default Welcome;
