export function getCurrentDate() {
  const Data = new Date();
  const day = Data.getDate();
  const month = Data.getMonth();
  const year = Data.getFullYear();
  const today = `${day}/${month < 10 ? "0" + month : month}/${year}`;
  return today;
}
