// set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the Data
d3.csv('../data/census.csv', d3.autoType)
    .then(data => {
        console.log("data", data)

        // append the svg object to the body of the page
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.FemUR_Employed))])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(d => d.Statistics))
        .padding(.5)
    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.Statistics))
        .attr("width", d => x(d.FemUR_Employed))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")

})