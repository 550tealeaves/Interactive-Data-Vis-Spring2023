/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7 ,
  margin = { top: 20, bottom: 50, left: 60, right: 40},
  radius = 10;

// // since we use our scales in multiple functions, they need global scope
let xScale, yScale; // let xScale is same as let xScale = undefined



/* APPLICATION STATE */
let state = { 
   data: [],
};

/* LOAD DATA */
d3.csv("../data/squirrelActivities.csv", d3.autoType).then(raw_data => {
  console.log("data", raw_data);  //since we are saving data into state object - raw data is first loaded
  // save our data to application state
  state.data = raw_data; //replace the empty array in the application state w/ state.data  - state.data = state("data")
  console.log('state', state)
  console.log(state.data)
  init(); //raw_data is stored in data:[] the global scope
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  /* SCALES */
  xScale = d3.scaleBand()
    .domain(state.data.map(d => d.activity)) //access state.data and map to the activity
    .range([margin.left, width - margin.right]) //0 to the end but w/ space on sides
    .paddingInner(0.2)
  
  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.count)]) //bar charts domain always starts at 0
    .range([height - margin.bottom, margin.top])


  


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  
  /* HTML ELEMENTS */
  // DEFINE SVG
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    const rect = svg
      .selectAll("rect.bar")
      .data(state.data)
      .join("rect")
      .attr("class", "bar") //4th J bro - needed especially for updates
      .attr("width", xScale.bandwidth()) //this makes the width adjustable
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("height", d => height - yScale(d.count))

    
    console.log('svg', svg) //can log multiple things if you separate w/ comma - this shows initially as undefined b/c it was defined in the scope of the init function only  - this console.log is outside of that scope = had to move the const svg down



 


}