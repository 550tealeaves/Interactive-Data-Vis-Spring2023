//SET DIMENSIONS
var width = 960,
    height = 1060;

//FORMAT
var format = d3.format(",d");

//ADD COLOR SCALE
var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(c => { c = d3.rgb(c); c.opacity = 0.8; return c; }));

var stratify = d3.stratify()
    .parentId(d => { return d.id.substring(0, d.id.lastIndexOf(".")); });

//CREATE TREEMAP
var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

//LOAD THE DATA
d3.csv("../data/flare.csv", type, function (error, data) {
    if (error) throw error;

    var root = stratify(data)
        .sum(d => d.value)
        .sort((a, b) => { return b.height - a.height || b.value - a.value; });

    treemap(root);

    d3.select("body")
        .selectAll(".node")
        .data(root.leaves())
        .enter().append("div")
        .attr("class", "node")
        .attr("title", d => d.id + "\n" + format(d.value))
        .style("left", d => d.x0 + "px")
        .style("top", d => d.y0 + "px")
        .style("width", d => d.x1 - d.x0 + "px")
        .style("height", d => d.y1 - d.y0 + "px")
        .style("background", d => { while (d.depth > 1) d = d.parent; return color(d.id); })
        .append("div")
        .attr("class", "node-label")
        .text(d => d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n"))
        .append("div")
        .attr("class", "node-value")
        .text(d => format(d.value));
});

function type(d) {
    d.value = +d.value;
    return d;
}