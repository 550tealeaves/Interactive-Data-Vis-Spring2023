//https://d3-graph-gallery.com/graph/choropleth_basic.html

//Constants
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.9;

// The svg
var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
    .scale(100) //increase # and map becomes bigger
    .center([0, 20])
    .translate([width / 2, height / 2]); //change # and it moves map l/r & u/d

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    //.range(d3.schemeBlues[7]);
    .range(["#fee5d9", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"])

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function (d) { data.set(d.code, +d.pop); })
    .await(ready);

function ready(error, topo) {

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        }); 
}