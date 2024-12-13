import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shows, setShows] = useState ({});
  const [loading, setLoading] = useState (false);
  const [error, setError] = useState (null);

  const fetchAnimeByDay = (day) => {
    setLoading(true);
    setError(null);

    return fetch("https://api.jikan.moe/v4/anime")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data.")
      }
      return response.json();
    })
    .then((data) => {
      const filteredAnimes = data.data.filter((anime) => anime.broadcast.day === day);
      return filteredAnimes.map((anime) => anime.title);
    })
    .catch((err) => { 
      setError(err.message);
      return[];
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

const formattedDate = newDate.toISOString().split("T")[0];
    if (!shows[formattedDate]) {
      setShows((prev) => ({
        ...prev,
        [formattedDate]: getRandomShows(),
      }));
    }
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

  const selectedDateShows = shows[selectedDate.toISOString().split("T")[0]] || [];

    // data.broadcast.day for fetching the animes for the day selected on the calendar
  // use this URL to get to data.broadcast.day https://api.jikan.moe/v4/anime
  // that way when a user clicks on a date, it will display the animes for that day

  return (
    <div className="calendar-container">
      <div className="calendar-box">
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
        {selectedDateShows.map((show, index) => (
          <li key={index}>{show}</li>
        ))}
      </ul>
      <button onClick={handleAddShow}>Add Show</button>
    </div>
  </div>
  );
};

export default MyCalendar;
