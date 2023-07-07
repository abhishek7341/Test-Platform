import React, { useEffect, useState } from "react";
import { weekdays } from "../utility/helper/weekdays";

function AdminCurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateClock = () => {
    const date = new Date();
    const day = weekdays[date.getDay()];
    const month = date.toLocaleString("default", { month: "long" });
    const todayDate = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const dateTimeString = `${day}, ${month} ${todayDate}, ${year}, ${time}`;
    setCurrentDateTime(dateTimeString);
  };

  return <div id="datetime-current">{currentDateTime}</div>;
}

export default AdminCurrentDateTime;
