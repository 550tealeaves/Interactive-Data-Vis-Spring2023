/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = { top: 20, left: 100, bottom: 60, right: 20 };


/* LOAD DATA */


d3.csv("../data/World_Indicators.csv", d => {  //parse the csv
    return {
        year: new Date(+d.Year, 0, 1), //way to convert the year (string) into a date 
        gdp: +d.gdp, //will convert gdp (written as string) into # - +d = converts it
        country: d.Country //had to return country 
    }
}).then(data => {
    console.log('data :>> ', data);

    // SCALES

    //X scale
    const xScale = d3.scaleTime() //using time scale
        .domain(d3.extent(data, d => d.year)) //d3.extent looks w/in data & finds min/max years
        .range([margin.left, width - margin.right])

    //Y scale
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.gdp)) //d3.extent looks w/in data & finds min/max gdp
        .range([height - margin.bottom, margin.top])


    // CREATE SVG ELEMENT
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // BUILD AND CALL AXES
    // X Axis
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)

    // Y Axis
    const yAxis = d3.axisLeft(yScale) //shows the vertical axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis)



    //FILTER DATA
    const filteredData = data.filter(d => d.country === "Germany") // shows data for Germany 
    console.log('filtered', filteredData)


    //GROUP DATA
    const groupedData = d3.groups(data, d => d.country) //want to group data by country - d3.groups takes an accessor function
    console.log('grouped', groupedData)



    // LINE GENERATOR FUNCTION
    const lineGen = d3.line() //line generator function
        .x(d => xScale(d.year)) //define x accessor - pass through data, take year & pass it to xScale
        .y(d => yScale(d.gdp)) //define y accessor - pass through data, take gross & pass it to yScale


    // DRAW LINE
    const line = svg.selectAll(".line")
        .data([filteredData])
        .join("path")
        .attr("class", "line")
        .attr("d", d => lineGen(d))
        .attr("stroke", "black")
        .attr("fill", "none")


    // AREA GENERATOR FUNCTION
    const area = d3.area() //area function requires x (accessor), .y0(baseline), .y1(topline)
        .x(d => xScale(d.year)) //set to the year scale
        .y0(d => yScale.range()[0]) //baseline set to range
        .y1(d => yScale(d.gdp)) //topline set to population

    // APPEND PATH ELEMENT TO AREA
    svg.append("path")
        .data([filteredData])
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "gold")


    // ADD CHART TITLE
    svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 20) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text(`${filteredData[0].country} GDP`) //interpolates so that name updates to match country change
        .attr("font-family", "Cursive")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .attr("fill", "red")

});