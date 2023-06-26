//https://d3-graph-gallery.com/graph/choropleth_basic.html

//Constants
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.9;

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function (d) { data.set(d.code, +d.pop); })
    .await(ready);
 
// CREATE ZOOM 
const zoom = d3.zoom()
    .scaleExtent([1, 8]) //extent to which you can zoom
    .on("zoom", zoomed);

// The svg
let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
    }))
    .on("click", reset)

//CREATE G - NEEDED FOR ZOOM
const g = svg.append("g") //must append g to svg so the zoom function works
    

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
    //.range(d3.schemeBlues[7]);
    .range(["#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#c51b8a", "#7a0177"])

//CALL ZOOM
svg.call(zoom);

//DEFINE RESET FUNCTION 
function reset() {
    path.transition().style("fill", null);
    svg.transition().duration(850).call( //.duration affects the speed of the reset (smaller # = faster)
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg).invert([width / 2, height / 2])
    );
}


//DEFINE CLICKED FUNCTION - HAPPENS WHEN CLICK AFTER ZOOMING
function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    path.transition().style("fill", null);
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
    );
}

//DEFINE FUNCTION ZOOMED ON AN EVENT
function zoomed(event) {
    const { transform } = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
}

function ready(error, topo) {

    // Draw the map
    g
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