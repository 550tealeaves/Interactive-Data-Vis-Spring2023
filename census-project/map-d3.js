/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9;
height = window.innerHeight * 0.6,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };



/**
* APPLICATION STATE
* */
let svg;
let state = {
    geojson: [], //use empty array instead of null b/c null not iterable
    hover: {
        latitude: null,
        longitude: null,
        state: null,
    }
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
    d3.json("../data/usState-jobs.json"), d3.json("../data/census_states_all_totals.json")]).then(([geojson, data]) => {
        state.geojson = geojson; //store object in state
        console.log("state: ", state); //"state: " will be the title in console log
        console.log("census data", data); //"census data" will be the title in console log
        init(); //forces synchronicity
    });  //runs 1x after data finished loading 

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {
    // CREATE ZOOM 
    const zoom = d3.zoom()
        .scaleExtent([1, 8]) //extent to which you can zoom
        .on("zoom", zoomed);


    // REASSIGN SVG - just call svg to refer to global scope
    svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .on("click", reset)

    //CREATE G - NEEDED FOR ZOOM
    const g = svg.append("g") //must append g to svg so the zoom function works




    // CREATE PROJECTION - stored object geojson into state b/c need to access it to create projection
    const projection = d3.geoAlbersUsa()
        .fitSize([width, height], state.geojson)

    // CREATE GEOPATH - map is actually a path
    const geoPath = d3.geoPath(projection)


    // DRAW THE MAP
    g.selectAll(".state") //select elements called state
        .data(state.geojson.features) //have to use state b/c geojson defined in state
        .join("path")
        .attr("class", "state") //w/o class state - it wouldn't find elements w/ path state when redrawing
        .attr("d", d => geoPath(d)) //d defines coordinates path follows
        .attr("fill", "transparent")
        .attr("stroke", "black")
        .on("mouseover", (event, d) => {  //mouseover is for hovering over div & child elements - 
            console.log('event', event)

            //         hover: {
            //             latitude: null,
            //                 longitude: null,
            //                     state: null,
            //          }
            // ADD THE NAME
            state.hover.state = d.properties.NAME
        })  // calling .on evokes an event - always pass event, and then the data used - 

        //pass both states and 
        .on("mousemove", (event) => {
            console.log('event', event)
            // const mx = d3.pointer(event)[0] //d3.pointer locates mouse on screen
            // const my = d3.pointer(event)[1]
            const [mx, my] = d3.pointer(event) //shorter way of writing above 2 lines
            // USE PROJECTION INVERT METHOD TO GET LAT/LONG
            const [projX, projY] = projection.invert([mx, my])
            state.hover.longitude = projX
            state.hover.latitude = projY
            draw()
        })

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

    draw(); // calls the draw function
}


/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
    const hoverBox = d3.select("#hover-content")
    console.log('hover data', state.hover)
    const hoverData = Object.entries(state.hover)
    hoverBox.selectAll("div.row")
        .data(hoverData) //pass an array into the HTML
        .join("div")
        .attr("class", "row")
        .html(d => d)
}