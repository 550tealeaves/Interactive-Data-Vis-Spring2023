/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;

let svg;
let xScale;
let yScale;
let yAxis;

let state = {
    data: [],
};

/* LOAD DATA */
d3.csv('../data/census_transposed.csv', d3.autoType).then(data => {
    console.log("data", data)


    //FOURTH SVG - MALE AGE BRACKET POP - STATE - not drawing anything

    const svgMaleAge = d3.select("#fourth-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)



    /* SCALES */
    // xScale
    const xScaleMaleAge = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Statistics)]) //d3 max = function expecting an array - can pass in an accessor function
        .range([margin, width - margin])



    // yScale
    const yScaleMaleAge = d3.scaleBand()
        .domain(['<5', '5-9', '10-14', '15-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'])
        .range([height - margin, margin])
        .paddingInner(.5)


    // // colorScale
    // const colorScale = d3.scaleOrdinal()
    //     .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
    //     .range(["red", "lightblue", "green", "pink", "purple"])


    /* AXES */
    // xAxis
    const xAxisMaleAge = d3.axisBottom(xScaleMaleAge)
    svgMaleAge.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
        .call(xAxisMaleAge)

    // yAxis
    const yAxisMaleAge = d3.axisLeft(yScaleMaleAge)
    svgMaleAge.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
        .call(yAxisMaleAge)


    //ADD CHART TITLE    
    svgMaleAge
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 16) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text("Male Age Pop By State")
        .style("font-size", "24px")
        .style("text-decoration", "underline")
        .attr("fill", "darkcyan")


    //BARS
    svgMaleAge.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("height", yScaleMaleAge.bandwidth()) //girth of bars 
        .attr("width", d => xScaleMaleAge - margin) //=> shorthand for function - must return a value
        .attr("x", d => margin) //bars will start at the margin
        .attr("y", d => yScaleMaleAge(['<5', '5-9', '10-14', '15-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']))
        .attr("fill", "darkred")

    // AXIS LABELS
    svgMaleAge.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.Statistics)
        .attr("x", d => xScaleMaleAge(d.Statistics))
        .attr("y", d => yScaleMaleAge(['<5', '5-9', '10-14', '15-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']) + yScaleMaleAge.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
        .attr("class", "labels")
        .style("font-size", "10px")


})