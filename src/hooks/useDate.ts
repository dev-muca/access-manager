const date = new Date();

interface IOptions {
  format: "web" | "database";
}

const useDate = () => {
  function getTime() {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const currentTime = `${hour < 9 ? "0" + hour : hour}:${minutes < 9 ? "0" + minutes : minutes}:${
      seconds < 9 ? "0" + seconds : seconds
    }`;
    return currentTime;
  }

  function getDate({ format }: IOptions) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentDate =
      format === "web"
        ? `${day < 9 ? "0" + day : day}/${month < 9 ? "0" + month : month}/${year}`
        : `${year}-${month < 9 ? "0" + month : month}-${day < 9 ? "0" + day : day}`;
    return currentDate;
  }

  function getFullDateTime() {
    const time = getTime();
    const date = getDate({ format: "database" });
    const datetime = `${date} ${time}`;
    return datetime;
  }

  return { getTime, getDate, getFullDateTime };
};

export default useDate;
