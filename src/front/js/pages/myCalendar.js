import React from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <h2>Select a Date</h2>
            <Calendar onChange={handleDateChange} value={date} />
            <p>Selected Date: {date.toDateString()}</p>
        </div>
    );
};

export default MyCalendar;
