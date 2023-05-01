/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;

let svg;
let xScale;
let yScale;
let yAxis;

// let state = {
//     data: [],
// };

/* LOAD DATA */
Promise.all([
    d3.csv("../data/census_age_male.csv"),
    d3.csv("../data/census_age_female.csv", d3.autoType),
]).then(([male, female]) => {
    console.log('male', male)
    console.log('female', female)

    //FOURTH SVG - MALE AGE BRACKET POP - STATE - not drawing anything

    const svgMaleAge = d3.select("#fourth-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)



    /* SCALES */
    // xScale
    const xScaleMaleAge = d3.scaleLinear()
        .domain([0, d3.max(male, d => d.value)]) //d3 max = function expecting an array - can pass in an accessor function
        .range([margin, width - margin])



    // yScale
    const yScaleMaleAge = d3.scaleBand()
        .domain(male.map(d => d.age))
        .range([height - margin, margin])
        .paddingInner(.5)


    // // colorScaleMaleAge
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
        .data(male)
        .join("rect")
        .attr("height", yScaleMaleAge.bandwidth()) //girth of bars 
        .attr("width", d => xScaleMaleAge(d.value) - margin) //=> shorthand for function - must return a value
        .attr("x", d => margin) //bars will start at the margin
        .attr("y", d => yScaleMaleAge(d => d.age))
        .attr("fill", "darkred")

    // AXIS LABELS
    svgMaleAge.selectAll("labels")
        .data(male)
        .enter()
        .append("text")
        .text(d => d.value.toLocaleString())
        .attr("x", d => xScaleMaleAge(d.value))
        .attr("y", d => yScaleMaleAge(d.age) + yScaleMaleAge.bandwidth() / 1.5) //dividing by 2 puts the count the middle of the bar
        .attr("class", "labels")
        .style("font-size", "10px")






    //FIFTH SVG - FEMALE AGE BRACKET POP - STATE - not drawing anything

    const svgFemaleAge = d3.select("#fifth-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)



    /* SCALES */
    // xScale
    const xScaleFemaleAge = d3.scaleLinear()
        .domain([0, d3.max(female, d => d.value)]) //d3 max = function expecting an array - can pass in an accessor function
        .range([margin, width - margin])



    // yScale
    const yScaleFemaleAge = d3.scaleBand()
        .domain(female.map(d => d.age))
        .range([height - margin, margin])
        .paddingInner(.5)


    // // colorScaleMaleAge
    // const colorScale = d3.scaleOrdinal()
    //     .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
    //     .range(["red", "lightblue", "green", "pink", "purple"])


    /* AXES */
    // xAxis
    const xAxisFemaleAge = d3.axisBottom(xScaleFemaleAge)
    svgFemaleAge.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
        .call(xAxisFemaleAge)

    // yAxis
    const yAxisFemaleAge = d3.axisLeft(yScaleFemaleAge)
    svgFemaleAge.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
        .call(yAxisFemaleAge)


    //ADD CHART TITLE    
    svgFemaleAge
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 16) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text("Female Age Pop By State")
        .style("font-size", "24px")
        .style("text-decoration", "underline")
        .attr("fill", "darkcyan")


    //BARS
    svgFemaleAge.selectAll("rect")
        .data(female)
        .join("rect")
        .attr("height", yScaleFemaleAge.bandwidth()) //girth of bars 
        .attr("width", d => xScaleFemaleAge(d.value) - margin) //=> shorthand for function - must return a value
        .attr("x", d => margin) //bars will start at the margin
        .attr("y", d => yScaleFemaleAge(d => d.age))
        .attr("fill", "darkred")

    // AXIS LABELS
    svgFemaleAge.selectAll("labels")
        .data(female)
        .enter()
        .append("text")
        .text(d => d.value.toLocaleString())
        .attr("x", d => xScaleFemaleAge(d.value))
        .attr("y", d => yScaleFemaleAge(d.age) + yScaleFemaleAge.bandwidth() / 1.5) //dividing by 2 puts the count the middle of the bar
        .attr("class", "labels")
        .style("font-size", "10px")

});