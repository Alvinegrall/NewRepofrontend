export default function (date) {
  const dateObj = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  };
  const dateLisible = dateObj.toLocaleDateString("fr-FR", options);

  return dateLisible;
}
