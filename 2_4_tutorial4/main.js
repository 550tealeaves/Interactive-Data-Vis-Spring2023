/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Promise.all([]) - loads multiple datasets at once
 * */
Promise.all([
    d3.json("../data/usState.json"), d3.csv("../data/stateCapitals.csv"),
    d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, capitals, heat]) => {

    // CREATE ZOOM 
    const zoom = d3.zoom()
        .scaleExtent([1, 8]) //extent to which you can zoom
        .on("zoom", zoomed);
    
    // CREATE SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .on("click", reset)
    
        
    //CREATE G - NEEDED FOR ZOOM
    const g = svg.append("g") //must append g to svg so the zoom function works

    
    // SPECIFY PROJECTION

    // A projection maps from lat/long -> x/y values - works like a scale
    const projection = d3.geoAlbersUsa() //this is the projection that works w/ US data
        .fitSize([
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        ], geojson);

    // DEFINE PATH FUNCTION
    const path = d3.geoPath(projection)

    // DRAW BASE LAYER PATH (1 PATH PER STATE)
    const states = g.selectAll("path.states")
        .append("g")
        .data(geojson.features) //use features b/c geojson alone is not iterable array
        .join("path") //join path to elements w/ class states
        .attr("class", 'states') //give joined elements a class "states"
        .attr("stroke", "black")
        .attr("fill", "#c6ffdb")
        .attr("d", path)

    // DRAW POINT FOR CUNY GC
    const gradCenterPoint = { Lat: 40.7423, Long: -73.9833 };
    g.selectAll("circle.point") //selects all circle elements in DOM w/ class point
        .data([gradCenterPoint]) //use the const gradCenterPoint as data
        .join("circle") //join circle to the selected element
        .attr("class", "circle-point")
        .attr("r", 10)
        .attr("fill", "orange")
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        }) //projection changes the lat/long of gradCenterPoint into x/y coordinates for map

    // CREATE LABEL FOR GRAD CENTER POINT
    g.selectAll("label")
        .data([gradCenterPoint])
        .enter()
        .append("text")
        .attr("class", "label")
        .text("The GC") //labels dot
        .attr("fill", "#d602b9")
        .attr("font-size", 20)
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x + 15}, ${y + 8})` //adding #s to x/y moves translates the label 15 to the right and 7 down
        })


    // DRAW POINT FOR ALL US HEAT EXTREMES
    g.selectAll("circle.heatextreme") //select all circle elements in DOM w/ class heatextreme
        .data(heat) //use heat extremes dataset
        .join("circle") //join circle to selected elements
        .attr("class", "point")
        .attr("r", 2.5) //decreased r so circles don't overlap
        .attr("fill", "#9f3bc6")
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        }) //projection converts lat/long from the heat extremes dataset into x/y coordinates for map


    // DRAW POINT FOR ALL STATE CAPITALS
    g.selectAll("circle.capital")
        .data(capitals)
        .join("circle")
        .attr("r", 5)
        .attr("fill", "red")
        .attr("transform", d => {
            // use our projection to go from lat/long => x/y
            // ref: https://github.com/d3/d3-geo#_projection
            const [x, y] = projection([d.longitude, d.latitude])
            return `translate(${x}, ${y})`
        }) //projection converts lat/long from the capitals dataset into x/y coordinates for map


    //CALL ZOOM
    svg.call(zoom);

    //DEFINE RESET FUNCTION 
    function reset() {
        states.transition().style("fill", null);
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
        states.transition().style("fill", null);
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

});
