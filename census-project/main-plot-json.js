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


/* LOAD DATA */
d3.json("../data/census_cat_total_subset.json", d3.autoType)
    .then(raw_data => {
        // + SET YOUR DATA PATH
        console.log("data", raw_data);
        console.log(raw_data[3].Alabama);
        state.data = raw_data;
        var maleJobs = ["Alabama", "Alaska", "Arizona"]
        console.log('maleJobs', maleJobs)

        var dataReadyMale = maleJobs.map(function (jobs) {
            return {
                name: jobs,
                values: state.data.map(function (d) {
                    return {
                        value: +d[jobs]
                    }; //returns array of objects that has state + corresponding male value
                })
            }
        }) //formats the maleJobs variable 
        console.log('dataReadyMale', dataReadyMale)
    
    
    
    
    
    
    
    
    });