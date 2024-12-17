import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const { actions } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [animeSchedules, setAnimeSchedules] = useState ({});
  const [loading, setLoading] = useState (false);
  const [error, setError] = useState (null);

  const getAnimeByDay = (day) => {
    setLoading(true);
    setError(null);

  actions
  .getAnimeByDay(day)
  .then((filteredAnime) => {
    setAnimeSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: filteredAnime.map((anime) => anime.title),
    }));
  })
  .catch(() => setError("Failed to load shows."))
  .finally(() => setLoading(false));
  };


  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

  const dayOfWeek = newDate.toLocaleDateString("en-US", { weekDay: "long"});
  if (!animeSchedules[dayOfWeek]) {
      getAnimeByDay(dayOfWeek);
  }
};

  const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long"});
  const selectedDayShows = animeSchedules[dayOfWeek] || [];

  return (
    <div className="calendar-container">
      <div className="calendar-box">
      <h2>Favorite Shows Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) => {
          const day = date.toLocaleDateString("en-US", {weekday: "long"});
          return animeSchedules[day] ? "highlight" : null;
        }}
      />
      <h3>Shows on {dayOfWeek}:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
        <ul>
          {selectedDayShows.map((show, index) => (
          <li key={index}>{show}</li>
        ))}
      </ul>
        )}
    </div>
  </div>
  );
};

export default MyCalendar;
