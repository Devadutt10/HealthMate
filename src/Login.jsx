import React, { useState } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebaseAuth';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("Logging in with:", formData.email, formData.password);
    // Add authentication logic here (e.g., Firebase, API call)

    try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("User logged in successfully!", userCredential.user);
        alert("Successfully logged in!!")
        navigate("/welcome")
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Incorrect email or password!")
      }
  };

  // Handle Register
  const handleRegister = async(e) => {
    e.preventDefault();
    console.log("Registering with:", formData);
    // Add registration logic here (e.g., Firebase, API call)

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("User registered successfully!", userCredential.user);
        alert("User registered successfully, you can log in now.")
        formData.firstName = "";
        formData.lastName = "";
        formData.email = "";
        formData.password = "";
    }catch(error){
        console.log(error.message);
        alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={isSignUp ? handleRegister : handleLogin}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <p className="toggle-link" onClick={toggleAuthMode}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;

