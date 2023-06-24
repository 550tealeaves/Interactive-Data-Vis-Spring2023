/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

/** these variables allow us to access anything we manipulate in
* init() but need access to in draw().
* All these variables are empty before we assign something to them.*/
let svg;

/**
* APPLICATION STATE
* */
let state = {
    geojson: null,
    extremes: null,
    hover: {
        latitude: null,
        longitude: null,
        state: null,
    },
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
    d3.json("/data/usState.json")
]).then(([geojson]) => {
    console.log("states", geojson)
    state.geojson = geojson;
    // console.log("state: ", state);
    init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {
    // our projection and path are only defined once, and we don't need to access them in the draw function,
    // so they can be locally scoped to init()
    const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
    const path = d3.geoPath().projection(projection);

    // CREATE ZOOM 
    const zoom = d3.zoom()
        .scaleExtent([1, 8]) //extent to which you can zoom
        .on("zoom", zoomed);

    // create an svg element in our main `d3-container` element
    svg = d3
        .select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .on("click", reset)

    //CREATE G - NEEDED FOR ZOOM
    const g = svg.append("g") //must append g to svg so the zoom function works

    g
        .selectAll(".state")
        // all of the features of the geojson, meaning all the states as individuals
        .data(state.geojson.features)
        .join("path")
        .attr("d", path)
        .attr("class", "state")
        .attr("stroke", "red")
        .attr("fill", "transparent")
        .on("mouseover", (event, d) => {
            // when the mouse rolls over this feature, do this
            state.hover["state"] = d.properties.NAME;
            draw(); // re-call the draw function when we set a new hoveredState
        });

    // EXAMPLE 1: going from Lat-Long => x, y
    // for how to position a dot
    const GradCenterCoord = { latitude: 40.7423, longitude: -73.9833 };
    g
        .selectAll("circle")
        .data([GradCenterCoord])
        .join("circle")
        .attr("r", 20)
        .attr("fill", "orange")
        .attr("transform", d => {
            const [x, y] = projection([d.longitude, d.latitude]);
            return `translate(${x}, ${y})`;
        });

    // EXAMPLE 2: going from x, y => lat-long
    // this triggers any movement at all while on the svg
    svg.on("mousemove", (e) => {
        // we can d3.pointer to tell us the exact x and y positions of our cursor
        const [mx, my] = d3.pointer(e);
        // projection can be inverted to return [lat, long] from [x, y] in pixels
        const proj = projection.invert([mx, my]);
        state.hover["lat"] = proj[1];
        state.hover["lon"] = proj[0];
        draw();
    });

    //CALL ZOOM
    svg.call(zoom);

    //DEFINE RESET FUNCTION - (supposed to reset zoom when you click 1x) right now not working
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
    // return an array of [key, value] pairs
    hoverData = Object.entries(state.hover);

    d3.select("#hover-content")
        .selectAll("div.row")
        .data(hoverData)
        .join("div")
        .attr("class", "row")
        .html(
            d =>
                // each d is [key, value] pair
                d[1] // check if value exist
                    ? `${d[0]}: ${d[1]}` // if they do, fill them in
                    : null // otherwise, show nothing
        );
}