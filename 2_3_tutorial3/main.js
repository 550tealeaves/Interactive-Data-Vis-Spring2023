/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = { top: 20, left: 60, bottom: 60, right: 20 };

/* LOAD DATA */
d3.csv("../data/HollywoodsMostProfitableStories.csv", d => {  //parse the csv
    return {
        year: new Date(+d.Year, 0, 1), //way to convert the year (string) into a date 
        gross: +d.Worldwide_Gross //will convert Worldwide_gross (written as string) into # - +d = converts it
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
        .domain(d3.extent(data, d => d.gross)) //d3.extent looks w/in data & finds min/max pop
        .range([height - margin.bottom, margin.top])

    
    // CREATE SVG ELEMENT
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // BUILD AND CALL AXES
    // X Axis
    // const xAxis = d3.axisBotton(xScale)
    //     svg.append("g")
    //         .attr("class", "axis")
    //         .attr("transform", `translate(0,${height + margin.bottom})`)
    //         .call(xAxis)

    // Y Axis
    const yAxis = d3.axisLeft(yScale) //shows the vertical axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left},0)`) //moves the vert axis 60px, 0
            .call(yAxis)



    //FILTER DATA
    const filteredData = data.filter(d => d.Genre === "Comedy") // only show comedy Genre 
    console.log('filtered', filteredData) //shows 119 data pts


    // LINE GENERATOR FUNCTION
    const lineGen = d3.line() //line generator function
        .x(d => xScale(d.year)) //define x accessor - pass through data, take year & pass it to xScale
        .y(d => yScale(d.gross)) //define y accessor - pass through data, take pop & pass it to yScale


    //GROUP DATA
    const groupedData = d3.groups(data, d => d.Genre) //want to group data by country - 1 line/country - d3.groups takes an accessor function
    console.log('grouped', groupedData)


    // DRAW LINE
    const line = svg.selectAll(".line")
    .data([filteredData])
    .join("path")
    .attr("class", "line")
    .attr("d", d => lineGen(d))
    .attr("stroke", "darkblue")
    .attr("fill", "none")


    // AREA GENERATOR FUNCTION
    const area = d3.area() //area function requires x (accessor), .y0(baseline), .y1(topline)
        .x(d => xScale(d.year)) //set to the year scale
        .y0(d => yScale.range()[0]) //baseline set to range
        .y1(d => yScale(d.gross)) //topline set to population
    
    // APPEND PATH ELEMENT TO AREA
    svg.append("path")
        .data([filteredData])
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "red")


});