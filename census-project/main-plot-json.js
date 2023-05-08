const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


/* LOAD DATA */
d3.json("../data/census_occ_subset.json", d3.autoType)
    .then(raw_data => {
        // + SET YOUR DATA PATH
        console.log("data", raw_data);
        
    });