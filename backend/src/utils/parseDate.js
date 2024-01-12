const parseDate = (dateString) => {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  return parsedDate;
};



export {parseDate}