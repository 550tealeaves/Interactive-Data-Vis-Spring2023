// set the dimensions and margins of the graph
var width = 450
height = 450
margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'container'
var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
// Dummy data contains the name of the data and the amount
var data = { A: 9, B: 20, C: 30, D: 8, E: 12 }

// set the color scale
var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
    .value(d => d.value)
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
    .selectAll("circle")
    .data(data_ready)
    .enter()
    .append("path")
    .attr('d', arcGenerator)
    .attr('fill', d => color(d.data.key))
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
svg
    .selectAll("circle")
    .data(data_ready)
    .enter()
    .append("text")
    .text(d => { return "Slice " + d.data.key }) //will say slice + data values
    .attr("transform", d => { return "translate(" + arcGenerator.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .style("font-size", 16)
    .style("font-weight", 500)
    .attr("fill", "red");