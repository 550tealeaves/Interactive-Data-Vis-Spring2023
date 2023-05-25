/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 5;



Promise.all([
    d3.csv("../data/census_occ_cat_subset.csv"),
    d3.csv("../data/census_occ_pct.csv", d3.autoType),
]).then(([catPct, data]) => {
    console.log("catPct", catPct)
    console.log("statesPct", data)
    console.log("maleCat", catPct.slice(1, 13));
    console.log("maleState", data.columns.slice(1, 13));
    var allGroup = ["Alabama", "Alaska"]
    console.log("allGroup", allGroup);

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Male_ManagementBusinessandFinancialOperations))
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Fem_ManagementBusinessandFinancialOperations))
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["M", "F"])
        .range(["purple", "orange"])



    /*HTML Elements */
    //CREATE SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //X AXIS 
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)


    //Y AXIS
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis)


    //CREATE SCATTERPLOT
    const dot = svg
        .selectAll("dot")
        .data(data, d => d.Statistics)
        .join(
            enter => enter.append("circle")
                .attr("r", 0)
                .call(selection => selection
                    .transition()
                    .duration(800)
                    .delay((d, i) => i * 20)
                    .attr("r", radius),
                    update => update,
                    exit => exit.remove()
                ) //transition allows the dots to grow from radius 0 to their radius value
        )
        .attr("class", "dot")
        .attr("cx", d => xScale(d.Male_ManagementBusinessandFinancialOperations))
        .attr("cy", d => yScale(d.Fem_ManagementBusinessandFinancialOperations))
        .attr("fill", d => colorScale(d.M_F_ManagementBusinessandFinancialOperations))
        .on('mouseover', function (e, d) {
            console.log(e, d);

            d3.select("#dot-labels")
                .text(d.Statistics + " - " + "M: " + d.Male_ManagementBusinessandFinancialOperations + ", F: " + d.Fem_ManagementBusinessandFinancialOperations)
                .attr("x", xScale(d.Male_ManagementBusinessandFinancialOperations) - margin.left / 7)
                .attr("y", yScale(d.Fem_ManagementBusinessandFinancialOperations))
        })



    svg
        .append("text")
        .attr("font-size", 13)
        .attr("fill", "forestgreen")
        .attr("font-weight", "bold")
        .attr("id", "dot-labels")


    //LABEL THE SCATTERPLOT
    svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 20)
        .attr("text-anchor", "middle")
        .text("Management, Business, and Financial Operations")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .attr("fill", "darkblue")

    //LABEL THE X-AXIS
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(550,${height - margin.bottom + 50})`)
        .attr("fill", "purple")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .text("Males")

    //LABEL THE Y-AXIS 
    svg //use margin to arrange y-axis - Mia
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(25, ${height - margin.bottom - 200})` + 'rotate (270)')
        .attr("fill", "orange")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .text("Females")
    // .attr('transform', (d, i) => {
    //     return 'translate( ' + yScale(i) + ' , ' + 350 + '),' + 'rotate(270)';
    // })  
    // .attr('y', -970) 

    //CREATE A LEGEND
    //https://stackoverflow.com/questions/35243433/styling-a-legend-in-d3

    const legend = svg.selectAll("#legend")
        .data(colorScale.domain())
        .enter()
        .append("g") //have to connect the legend to the axes
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    //To flip the color order, add .slice().reverse() to the .data = .data(colorScale.domain().slice().reverse())     

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale) //this adds the purple/orange to the boxes
    // .attr("id", function (d, i) {
    //     return "id" + d.replace(/\s/g, '');
    // }) //unsure what it does


    //CREATE THE LEGEND TEXT
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d)


});