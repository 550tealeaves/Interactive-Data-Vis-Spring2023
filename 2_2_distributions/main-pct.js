//https://stackoverflow.com/questions/41549713/d3-js-i-want-to-change-the-data-value-to-a-percentage


const data = [20, 45, 245, 134, 267, 111, 54, 333, 23];

const w = 500, h = 200, padding = 20;
const svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

const xScale = d3.scaleLinear()
    .range([padding, (w - padding)])
    .domain([0, d3.max(data)]);

const rects = svg.selectAll(".rects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", xScale(0))
    .attr("y", (d, i) => i * 20)
    .attr("height", 14)
    .attr("width", d => xScale(d) - padding)
    .attr("fill", "#E67E22");

const xAxis = d3.axisBottom(xScale)
    .tickFormat(d => Math.round(d * 100 / d3.max(data)) + "%"); //converts the results into percentage

const gX = svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);