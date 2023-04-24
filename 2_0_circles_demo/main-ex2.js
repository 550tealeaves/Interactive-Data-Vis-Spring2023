var dataset = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];

d3.select("body")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar") //4th J bro
    .style("height", function(d) {
        var barHeight = d *5;
        return barHeight + "px";
    });