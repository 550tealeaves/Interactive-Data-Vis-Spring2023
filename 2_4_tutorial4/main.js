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
    d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {

    // create an svg element in our main `d3-container` element
    svg = d3
        .select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // SPECIFY PROJECTION
    // a projection maps from lat/long -> x/y values
    // so it works a lot like a scale!
    const projection = d3.geoAlbersUsa()
        .fitSize([
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        ], geojson);

    // DEFINE PATH FUNCTION
    const path = d3.geoPath(projection)

    // draw base layer path - one path for each state
    const states = svg.selectAll("path.states")
        .data(geojson.features)
        .join("path")
        .attr("class", 'states')
        .attr("stroke", "black")
        .attr("fill", "transparent")
        .attr("d", path)

    // draw point for CUNY graduate center
    const gradCenterPoint = { Lat: 40.7423, Long: -73.9833 };
    svg.selectAll("circle.point")
        .data([gradCenterPoint])
        .join("circle")
        .attr("r", 10)
        .attr("fill", "gold")
        .attr("transform", d => {
            // use our projection to go from lat/long => x/y
            // ref: https://github.com/d3/d3-geo#_projection
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        })

    // draw point for all state capitals
    svg.selectAll("circle.heatextreme")
        .data(heat)
        .join("circle")
        .attr("r", 3)
        .attr("fill", "pink")
        .attr("transform", d => {
            // use our projection to go from lat/long => x/y
            // ref: https://github.com/d3/d3-geo#_projection
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        })

});