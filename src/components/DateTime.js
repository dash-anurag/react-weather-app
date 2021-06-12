import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const secondsTimer = setInterval(() => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(secondsTimer);
  }, []);

  return <div className="date-time">{`${date} - ${time}`}</div>;
};

export default DateTime;
