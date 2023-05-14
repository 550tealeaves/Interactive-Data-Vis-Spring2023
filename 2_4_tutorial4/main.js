/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Promise.all([]) - loads multiple datasets at once
 * */
Promise.all([
    d3.json("../data/usState.json"),
    d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {

    // CREATE SVG 
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


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
    const states = svg.selectAll("path.states")
        .data(geojson.features) //use features b/c geojson alone is not iterable array
        .join("path") //join path to elements w/ class states
        .attr("class", 'states') //give joined elements a class "states"
        .attr("stroke", "black")
        .attr("fill", "#c6ffdb")
        .attr("d", path)

    // DRAW POINT FOR CUNY GC
    const gradCenterPoint = { Lat: 40.7423, Long: -73.9833 };
    svg.selectAll("circle.point") //selects all circle elements in DOM w/ class point
        .data([gradCenterPoint]) //use the const gradCenterPoint as data
        .join("circle") //join circle to the selected element
        .attr("class", "circle-point")
        .attr("r", 10)
        .attr("fill", "orange")
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        }) //projection changes the lat/long of gradCenterPoint into x/y coordinates for map

    svg.selectAll("label")
        .data([gradCenterPoint])
        .enter()
        .append("text")
        .attr("class", "label")
        .text("CUNY GC") //labels dot
        .attr("fill", "#d602b9")
        .attr("font-size", 20)
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x + 15}, ${y + 8})` //adding #s to x/y moves translates the label 15 to the right and 7 down
        })


    // DRAW POINT FOR ALL US HEAT EXTREMES
    svg.selectAll("circle.heatextreme") //select all circle elements in DOM w/ class heatextreme
        .data(heat) //use heat extremes dataset
        .join("circle") //join circle to selected elements
        .attr("class", "point")
        .attr("r", 2.5) //decreased r so circles don't overlap
        .attr("fill", "#9f3bc6")
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        }) //projection converts lat/long from the heatextremes dataset into x/y coordinates


    let zoom = d3.zoom()
        .on('zoom', handleZoom);

    function handleZoom(e) {
        d3.select('svg path')
            .attr('transform', e.transform);
    }

    function initZoom() {
        d3.select('svg')
            .call(zoom);
    }

    function updateData() {
        data = [];
        for (let i = 0; i < gradCenterPoint; i++) {
            data.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height
            });
        }
    }

    function update() {
        d3.select('svg path')
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', 3);
    }

    initZoom();
    updateData();
    update();










});