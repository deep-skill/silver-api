const handleStatusQuery = (query) => {
  let searches = ["en", "progreso", "cancelado", "finalizado"];
  let statusTypes = {
    en: "INPROGRESS",

    progreso: "INPROGRESS",

    finalizado: "COMPLETED",
    cancelado: "CANCELED",
  };
  let result;
  searches.forEach((e, index) => {
    if (e.includes(query)) result = statusTypes[searches[index]];
  });
  console.log(result);
  return result;
};

module.exports = handleStatusQuery;
