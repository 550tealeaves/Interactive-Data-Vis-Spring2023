/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, capitals]) => {

  //INSPECT DATA
  console.log('geojson', geojson)
  console.log('capitals', capitals)

  //APPEND SVG
  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  
  // SPECIFY PROJECTION
  const projection = d3.geoAlbersUsa() //projection used for US data
  .fitSize([width, height], geojson) //use entire size of SVG to map data on states
 

  // DEFINE PATH FUNCTION
  const pathGen = d3.geoPath(projection) //pass projection above into geoPath generator


  // APPEND GEOJSON PATH  (jonas brothers) 
  const states = svg.selectAll("path.states") //selecting all path elements w/ class states
  .data(geojson.features) //data = always must be an iterable array - needs array of features - geojson is NOT an array - so can't pass it - pass the features
  .join("path")
  .attr("class", "states")
  .attr("d", coords => pathGen(coords)) //for each feature - draw a path, use the functions that were defined earlier to do so - geoPath function expects coords
  .attr("fill", "transparent") //default fill for paths = black
  .attr("stroke", "black")
  
  
  // APPEND DATA AS SHAPE
  const capitalCircles = svg.selectAll("circle.capital")
  .data(capitals)
  .join("circle")
  .attr("class", "capital")
  .attr("r", 5)
  .attr("fill", "cyan")
  .attr("transform", (d) => {
    const [x, y] = projection([d.longitude, d.latitude])
    return `translate(${x}, ${y})`
  })

});