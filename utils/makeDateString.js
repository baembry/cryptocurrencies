const makeDateString = function(date) {
  const year = date.getFullYear();
  const month = date
    .getMonth()
    .toString()
    .padStart(2, '0');
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return dateString;
};

module.exports = makeDateString;
