const margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 1050 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#container")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read json data
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json", (data) => {

  // Give the data to this cluster layout:
  const root = d3.hierarchy(data).sum(d => d.value) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .padding(2) // higher #, more space b/w boxes
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style("stroke", "skyblue")
      .attr("stroke-weight", 1)
      .style("fill", "violet");

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", d => d.x0+5)    // +10 to adjust position (more right)
      .attr("y", d => d.y0+20)    // +20 to adjust position (lower)
      .text(d => d.data.name)
      .attr("font-size", "15px")
      .attr("fill", "white");
})