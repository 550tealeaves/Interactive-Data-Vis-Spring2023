const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;

let svg;
let xScale;
let yScale;
let colorScale;
let xAxis;
let yAxis;

/* APPLICATION STATE */
let state = {
    data: [],
    selectedParty: "TOTAL" // + YOUR INITIAL FILTER SELECTION
};


d3.csv("../data/census_novar_nofilter.csv", d3.autoType)
    .then(data => {
        console.log("data", data)
        console.log(data[36])
    })