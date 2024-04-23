//https://d3-graph-gallery.com/graph/choropleth_basic.html

//Constants
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.9;

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function (d) { data.set(d.code, +d.pop); })
    .await(ready);
 

// The svg
let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    
  

// Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
    .scale(100) //increase # and map becomes bigger
    .center([0, 20])
    .translate([width / 2, height / 2]); //change # and it moves map l/r & u/d

// Data and color scale
let data = d3.map();
let colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeRdPu[7]); //this is shorter way to write the below line - d3.scheme(scheme name - written on left of the color bar  - and # for # of colors)
    //.range(["#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177"])


function ready(error, topo) {
    console.log('topo', topo)

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
        .attr("fill", d => {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        }); 
    
    
}