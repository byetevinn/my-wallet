const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);
  const day = dateFormatted.getDate();
  const month = dateFormatted.getMonth() + 1;
  const year = dateFormatted.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export default formatDate;
