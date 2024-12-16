import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/notifications.css"; 

export const Notifications = ({ calendarShows }) => {
  const [isActive, setIsActive] = useState(false);

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
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    if (calendarShows[formattedDate]) {
      calendarShows[formattedDate].forEach((show) => {
        toast.info(`Reminder: "${show}" is airing today!`);
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
}

  useEffect(() => {
    let notificationInterval;

    if (isActive) {
      notificationInterval = setInterval(() => {
        notifyShows();
      }, 3600000);
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
        {isActive ? "Deactivate Notifications" : "Activate Notifications"}
      </button>
      <button className="test-button" onClick={testNotification}>
        Test Notification
      </button>
      <ToastContainer />
    </div>
  );
};


