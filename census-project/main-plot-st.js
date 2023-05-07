/*Define global constants*/
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
// data initialized as empty array - must load and assign it to state
let state = {
    data: [],
    selectedJobs: "All"
};

/* LOAD DATA */
d3.csv("../data/census_occ_pct.csv", d3.autoType).then(raw_data => {
    console.log("raw_data", raw_data);
    console.log(raw_data.slice(1, 13));
    state.data = raw_data;
    init();
});


/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in