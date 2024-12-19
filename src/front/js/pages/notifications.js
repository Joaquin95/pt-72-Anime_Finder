import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/notifications.css";

export const Notifications = ({ calendarShows, day }) => {
  const [isActive, setIsActive] = useState(false);
  const { actions, store } = useContext(Context);

  const fetchDailyShows = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const response = await fetch("https://api.jikan.moe/v4/anime");
    const data = await response.json();

    const dailyShows = data.data.filter(
      (anime) => anime.broadcast?.day?.toLowerCase() === getWeekday(date)
    );

    return dailyShows.map((anime) => anime.title);
  };

  const getWeekday = (date) => {
    return date.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
  };

  const notifyShows = async () => {
    console.log("notify shows ran");
    // const today = new Date();
    // // Adjust to local time zone and format as YYYY-MM-DD
    // const offsetDate = new Date(
    //   today.getTime() - today.getTimezoneOffset() * 60000
    // );
    actions.getAnimeByDay(day)
    // const formattedDate = offsetDate.toISOString().split("T")[0];
    console.log(store.watchlist);
    if (store.watchlist) {
      watchlist.forEach((show) => {
        toast.info(`Reminder: "${show.title}" is airing today!`);
      });
    } else {
      const apiShows = await fetchDailyShows(today);
      apiShows.forEach((show) => {
        toast.info(`New show "${show}" is airing today!`);
      });
    }
  };
  const testNotification = () => {
    // this is a test notification
    toast.info("Test Notification: This is how a notification will appear!");
  };

  useEffect(() => {
    let notificationInterval;

    if (isActive) {
      notificationInterval = setInterval(() => {
        notifyShows();
      }, 9000);
    }

    return () => {
      if (notificationInterval) clearInterval(notificationInterval);
    };
  }, [isActive, calendarShows]);

  return (
    <div className="notifications-container">
      <button
        className={`toggle-button ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <i className="fa-regular fa-bell"></i>
        {/* {isActive ? "Deactivate Notifications" : "Activate Notifications"} */}
      </button>
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default Notifications;
