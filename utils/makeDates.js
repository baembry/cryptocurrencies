const makeDateString = require('./makeDateString');

function makeDatesArray(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates = [makeDateString(startDate)];
  let currentDate = startDate;
  while (currentDate < endDate) {
    const dateString = makeDateString(currentDate);
    dates.push(dateString);
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

module.exports = makeDatesArray;
