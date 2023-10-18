function convertDate(inputDate) {
  const dateParts = inputDate.split("/");
  const inputDateObject = new Date(
    `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
  );
  const formattedDate = inputDateObject.toISOString().split("T")[0];

  return formattedDate;
}
module.exports = convertDate;
