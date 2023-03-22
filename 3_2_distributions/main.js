/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 10;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

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
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *ONE TIME* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d. ideologyScore2020)) //will return min/max scores
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020))
    .range([height - margin.top, margin.bottom])
  
  colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

  
    // are there independents?
    const filteredData = state.data.filter((d) => d.Party !== "R" && d.Party !== "D")
    console.log("independents", filteredData)


  // + AXES


  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")
    .on('change', (event) => { //for select elements, use onChange
      console.log('selected', event.target.value)
      // how and where do we store new value?
      state.selectedParty = event.target.value
      console.log('state', state)
      draw() //everytime we change state (choose something in dropdown), call draw
    })  

  //selectElement.selectAll("option") //can create the dropdown list w/ JS OR HTML
    // .data(["All", "Democrat", "Republican"])
    // .join("option") 
    // .attr("value", d => d)
    // .html(d => d)

    

  


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
        .append("circle")
        .attr("cx", 0)
        .attr("cy", d => yScale(d.envScore2020))
        .attr("r", 0)
        .attr("fill", d => colorScale(d.Party))
        .call(sel => sel
          .transition()
          .attr("r", radius)
          .transition()
          .duration(2000)
          .attr("cx", d => xScale(d.ideologyScore2020))

        ),

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
      .call(sel => sel
        //before transition
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .delay((d, i) => i * 50) 
        
        //after transition
        .attr("opacity", 0)
        .remove()
        )
    );
}