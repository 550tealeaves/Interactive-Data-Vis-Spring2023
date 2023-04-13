// set the dimensions and margins of the graph
var width = 850 //changed width from orig 450 - moves chart to middle
height = 450
margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). 
//I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'container'
var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = { a: 19, b: 80, c: 30, d: 7, e: 12 }

// set the color scale
var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#ff4949", "#38ff84", "#ff8ceb", "#ffe900", "#6fbcad"])

// Compute the position of each group on the pie:
var pie = d3.pie()
    .value(function (d) { return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
    .selectAll("circle")
    .data(data_ready)
    .enter()
    .append("path")
    .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
    )
    .attr("fill", function (d) { return (color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)