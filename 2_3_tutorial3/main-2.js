const data = [
    { x: 0, y: 10, },
    { x: 1, y: 15, },
    { x: 2, y: 35, },
    { x: 3, y: 20, },
];

const margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 575 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.x; })])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.y; })])
    .range([height, 0]);

const xAxis = d3.axis()
    .scale(x)
    .orient("bottom");

const yAxis = d3.axis()
    .scale(y)
    .orient("left");

const area = d3.area()
    .x(function (d) { return x(d.x); })
    .y0(height)
    .y1(function (d) { return y(d.y); });

const svg = d3.select("#container")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
    .data(data)
    .attr("class", "area")
    .attr("d", area);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);






// const data = [
//     { x: 0, y: 10, },
//     { x: 1, y: 15, },
//     { x: 2, y: 35, },
//     { x: 3, y: 20, },
// ];

// const margin = { top: 20, right: 20, bottom: 30, left: 50 },
//     width = 575 - margin.left - margin.right,
//     height = 350 - margin.top - margin.bottom;

// const svg = d3.select("#container")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// const area = d3.area()
//     .x(function (d) { return x(d.x); })
//     .y0(height)
//     .y1(function (d) { return y(d.y); });

// svg.append("path")
//     .data(data)
//     .attr("class", "area")
//     .attr("d", area);

// const x = d3.scaleLinear()
//     .domain([0, d3.max(data, function (d) { return d.x; })])
//     .range([0, width]);

// const y = d3.scaleLinear()
//     .domain([0, d3.max(data, function (d) { return d.y; })])
//     .range([height, 0]);

// const xAxis = d3.axisBottom(x)
// svg.append("g")    
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

// const yAxis = d3.axisLeft(y)
// svg.append("g")    
//     .attr("class", "y axis")
//     .call(yAxis);




// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);