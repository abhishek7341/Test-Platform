import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const CurrentDateTime: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const formattedDate =
    format(dateTime, "EEEE, MMMM dd, yyyy") +
    " at " +
    format(dateTime, "KK:mm aa");

  return <div>{formattedDate}</div>;
};

export default CurrentDateTime;
