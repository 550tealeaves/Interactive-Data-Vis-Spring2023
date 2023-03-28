/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9;
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };



/**
* APPLICATION STATE
* */
let svg;
let state = {
    geojson:[], //use empty array instead of null b/c null not iterable
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
    d3.json("../data/usState.json")
    ]).then(([geojson]) => {
    state.geojson = geojson;
    console.log("state: ", state);
    init(); //forces synchronicity
    });

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() { 
    // REASSIGN SVG
    svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        //.style("background-color", "aqua")




    // CREATE PROJECTION 
    const projection = d3.geoAlbersUsa()
        .fitSize([width, height], state.geojson)

    // CREATE GEOPATH - map is actually a path
    const geoPath = d3.geoPath(projection)

       
    // DRAW THE MAP
    svg.selectAll(".state")
        .data(state.geojson.features) //have to use state b/c geojson defined in state
        .join("path")
        .attr("class", "state") //w/o class state - it wouldn't find elements w/ path state when redrawing
        .attr("d", d => geoPath(d))
        .attr("fill", "transparent")
        .on("mouseover", (event, d) => {  //mouseover is for hovering over div & child elements
            console.log('event', event)

    //         hover: {
    //             latitude: null,
    //                 longitude: null,
    //                     state: null,
    //          }
            // ADD THE NAME
            state.hover.state = d.properties.NAME
        }) 

        .on("mousemove", (event) => {
            console.log('event', event)
            // const mx = d3.pointer(event)[0] //d3.pointer locates mouse on screen
            // const my = d3.pointer(event)[1]
            const [mx, my] = d3.pointer(event) //shorter way of writing above 2 lines
            // USE PROJECITON INVERT METHOD TO GET LAT/LONG
            const [projX, projY] = projection.invert([mx, my])
            state.hover.longitude = projX
            state.hover.latitude = projY
            draw()

        })



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