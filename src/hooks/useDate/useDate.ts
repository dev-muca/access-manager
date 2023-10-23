import { useState } from "react";

const useDate = () => {
  const [ , setTime] = useState("");

  const getTime = () => {
    const date = new Date().toLocaleString();
    const arr = date.split(", ");
    const currentDate = arr[0].split("/").reverse().join("-");
    const currentTime = arr[1];

    const currentDateTime = `${currentDate} ${currentTime}`;
    setTime(currentDateTime);
    return currentDateTime;
  };

  return { getTime };
};

export default useDate;
