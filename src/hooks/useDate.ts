import { useMemo, useState } from "react";

const date = new Date();

interface Options {
  format: "web" | "database";
}

const useDate = () => {
  const [time, setTime] = useState("");

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
