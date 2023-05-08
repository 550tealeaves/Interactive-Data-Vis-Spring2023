/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 10;

// these variables are in global scope = allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;
let xAxis;
let yAxis;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "all" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  //console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  // alternatively written as state["data"] = raw_data
  //use state["my data"] when loading keys w/ spaces (can't have spaces w/ .)
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *ONE TIME* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d. ideologyScore2020)) //d3.extent returns min/max values
    .range([margin.left, width - margin.right]) // 0 to end w/ padding

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020)) //d3.extent returns min/max values
    .range([height - margin.top, margin.bottom])
  
  colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

  
    // ARE THERE ANY INDEPENDENTS?
    //Filter - d.Party !== "R (does not equal R) && (and) d.Party !== "D" (does not equal D) 
    const filteredData = state.data.filter((d) => d.Party !== "R" && d.Party !== "D")
    console.log("independents", filteredData) //independents is the name shown in console log and it's taking in the filteredData


  // + AXES - NOT WORKING
  // xAxis = d3.axisBottom(xScale)
  //   svg.append("g")
  //     .attr("transform", `translate(0,${height - margin.bottom})`)
  //     .call(xAxis);

  // yAxis = d3.axisLeft(yScale)
  //   svg.append("g")
  //     .attr("transform", `translate(${margin.left},0)`)
  //     .call(yAxis);


  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown") //selects the element "select" w/ id dropdown
    .on('change', (event) => { //for select elements, use onChange
      console.log('selected', event.target.value) //event.target = element that changes during event & .value = get value from the attribute value
      
      // how and where do we store new value?
      //reassign the .selectedParty portion of (state) & set equal to event.target.value 
      //changes state to the selectedParty
      state.selectedParty = event.target.value 
      console.log('state', state)
      draw() //every time we change state (choose something in dropdown), call draw
    })  

  
  
  //CREATE DROPDOWN LIST (EITHER IN JS (BELOW) OR HTML)
  //selectElement.selectAll("option") //select all option elements 
    // .data(["All", "Democrat", "Republican"])
    // .join("option") 
    // .attr("value", d => d) // 2nd d references the .data(["all", "dem", "rep"])
    // .html(d => d) // tells html to put the .data(["all", "dem", "rep"]) in the tags

    

  


  // + CREATE SVG ELEMENT
  svg = d3.select("#container") //writing it in init() b/c only need it ran once
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES



  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
     .filter(d => state.selectedParty === "all" || state.selectedParty === d.Party) //filter and return any value that's All or selected party
     console.log('filteredData', filteredData)


  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.BioID) //look at bioiD as unique ID for data pts
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter
        .append("circle") //must write .append 1st time enter is listed
        .attr("cx", 0) //start X at 0 (before transition) "
        .attr("cy", d => yScale(d.envScore2020))
        .attr("r", 0) // radius starts at 0 (before transition)
        .attr("fill", d => colorScale(d.Party))
        .call(sel => sel   //.call(sel => sel) gives access to the selection
          .transition() //returns transition NOT a selection - call transition on selection, which is the dots
          .attr("r", radius) //transitions into radius = 10
          .transition() // transition another attribute
          .duration(2000) // dots will grow in "
          .attr("cx", d => xScale(d.ideologyScore2020)) //transitions to ideologyScore2020 value - dots move across the DOM

        ),

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
      .call(sel => sel  //.call(sel => sel) gives access to the selection
        //before transition
        .attr("opacity", 1)
        .transition() //returns transition NOT a selection
        .duration(3000)
        .delay((d, i) => i * 50) // i = index - multiply index by 50 milliseconds
        
        //after transition
        .attr("opacity", 0)
        .remove() //removes the dots 
        )
    );
}