import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Components/WelcomePage/welcome";
import Survey from "./Components/SurveyPage/survey";
import ChatBot from "./Components/ChatBOT/chatBot";
import Medicine from "./Components/MedicineRemainder/medicine";
import Doctor from "./Components/FindADoctor/doctor"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/chatBot" element={<ChatBot />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Router>
  );
}

export default App;
