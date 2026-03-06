import React, { useEffect, useState } from "react";
import "./medicine.css";

export default function Medicine() {
  const [time, setTime] = useState("");
  const [medicine, setMedicine] = useState("");
  const [reminders, setReminders] = useState([]);


  // Handle time change
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // Handle medicine input change
  const handleMedicineInput = (event) => {
    setMedicine(event.target.value);
  };

  // Save reminder to Firestore
  const handleTimeSetterBtn = () => {
    if (medicine && time) {
      const reminderTime = new Date();
      const [hours, minutes] = time.split(":");
      reminderTime.setHours(hours, minutes, 0, 0);

      // Clear input fields
      setMedicine("");
      setTime("");

    //Add new reminders to the reminder list
      setReminders([...reminders, { medicine, time: reminderTime }]);

      // Fetch updated reminders list

    } else {
        alert("Missing required fields, medicine or time")
      console.error("Missing required fields (medicine, time, or token).");
    }
  };

  const removeReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  return (
    <div className="parentDiv">
      <div className="mainContainerMedicine">
        <div className="timeDisplay">
          <h1>Your Reminders:</h1>
          <div className="timeReminders">
            <ul>
              {reminders.map((reminder, index) => (
                <div className="reminder" key={index}>
                  <li>{reminder.medicine} - {new Date(reminder.time).toLocaleTimeString()}</li>
                  <button
                    className="removeBtn"
                    onClick={() => removeReminder(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="timeSetter">
          <div className="inputText">
            <label>Medicine Name:</label>
            <input placeholder="Medicine Name..." value={medicine} onChange={handleMedicineInput} />
            <label className="label">Select Time:</label>
            <input type="time" value={time} onChange={handleTimeChange} className="time-input" />
            <p className="selected-time">{time ? `Selected Time: ${time}` : "No time selected"}</p>
            <button className="setterBtn" onClick={handleTimeSetterBtn}>Set Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
}