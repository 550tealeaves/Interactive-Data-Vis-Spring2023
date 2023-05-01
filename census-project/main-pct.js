/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;


Promise.all([
    d3.csv("../data/census_categories_pct.csv"),
    d3.csv("../data/census_states_pct.csv", d3.autoType),
]).then(([catPct, statesPct]) => {
    console.log("catPct", catPct)
    console.log("statesPct", statesPct)

    //EMPLOYEMENT TYPES

    const svg = d3.select('#container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

});