import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Notifications from "./notifications";

const MyCalendar = () => {
  const { actions, store } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [animeSchedules, setAnimeSchedules] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAnimeByDay = (day) => {
    setLoading(true);
    setError(null);

    actions.getAnimeByDay(day);
    // .then((filteredAnime) => {
    //   setAnimeSchedules((prevSchedules) => ({
    //     ...prevSchedules,
    //     [day]: filteredAnime.map((anime) => anime.title),
    //   }));
    // })
    // .catch(() => setError("Failed to load shows."))
    // .finally(() => setLoading(false));
    // console.log("anime from store: ", store.anime);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

    const dayOfWeek = newDate.toLocaleDateString("en-US", { weekday: "long" });
    if (!animeSchedules[dayOfWeek]) {
      actions.getAnimeByDay(dayOfWeek);
    }
  };

  const dayOfWeek = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const selectedDayShows = animeSchedules[dayOfWeek] || [];

  useEffect(() => {
    console.log("useEffectttttt: ");
    actions.getFavorites();
    // actions.getAnimeByDay(new Date());
    handleDateChange(new Date());
  }, []);

  return (
    <div className="calendar-container">
      <Notifications calendarShows={store.watchlist, dayOfWeek} />
      <div className="calendar-box">
        <h2>Favorite Shows Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            const day = date.toLocaleDateString("en-US", { weekday: "long" });
            return animeSchedules[day] ? "highlight" : null;
          }}
        />
        <h3>Favorite Shows on {dayOfWeek}:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {store.watchlist.length > 0 ? (
              store.watchlist.map((show, index) => (
                <li key={index}>{show.title}</li>
              ))
            ) : (
              <p>No favorite shows for this day.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
