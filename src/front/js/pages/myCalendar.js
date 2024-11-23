import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shows, setShows] = useState({
    "2024-11-18": ["Naruto", "Attack on Titan"],
    "2024-11-19": ["Demon Slayer"]
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAddShow = () => {
    const showName = prompt("Enter show name:");
    if (showName) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setShows((prev) => ({
        ...prev,
        [formattedDate]: [...(prev[formattedDate] || []), showName],
      }));
    }
  };

  return (
    <div className="calendar-container">
      <h2>Favorite Shows Calendar</h2>
      <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => {
                const formattedDate = date.toISOString().split("T")[0];
                return shows[formattedDate] ? "highlight" : null;
            }}
            />
      <h3>Shows on {selectedDate.toDateString()}:</h3>
      <ul>
        {(shows[selectedDate.toISOString().split("T")[0]] || []).map((show, index) => (
          <li key={index}>{show}</li>
        ))}
      </ul>
      <button onClick={handleAddShow}>Add Show</button>
    </div>
  );
};

export default MyCalendar;
