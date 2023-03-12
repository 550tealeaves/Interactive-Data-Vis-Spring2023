 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, left: 60, bottom: 60, right: 20};

/* LOAD DATA */
d3.csv("../data/populationOverTime.csv", d => {  //parse the csv
  return {
    year: new Date(+d.Year, 0, 1), //way to convert the year (string) into a date
    country: d.Entity, //entity will be relabeled as country 
    population: +d.Population //will convert the pop (written as string) into # - +d = converts it
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE




});