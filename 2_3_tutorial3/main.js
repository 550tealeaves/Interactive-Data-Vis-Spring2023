/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = { top: 20, left: 120, bottom: 60, right: 20 };



// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let yAxis;
let xAxisGroup;
let yAxisGroup;

/* APPLICATION STATE */
let state = {
    data: [],
    selection: "All", // + YOUR FILTER SELECTION
};




/* LOAD DATA */


d3.csv("../data/World_Indicators.csv", d => {  //parse the csv
    return {
        year: new Date(+d.Year, 0, 1), //way to convert the year (string) into a date 
        gdp: +d.gdp, //will convert gdp (written as string) into # - +d = converts it
        country: d.Country //had to return country 
    }
}).then(data => {
    console.log('loaded data :>> ', data);
    state.data = data;
    init();
});


    function init() {
        //X scale
        const xScale = d3.scaleTime() //using time scale
            .domain(d3.extent(state.data, d => d.year)) //d3.extent looks w/in data & finds min/max years
            .range([margin.left, width - margin.right])

        //Y scale
        const yScale = d3.scaleLinear()
            .domain(d3.extent(state.data, d => d.gdp)) //d3.extent looks w/in data & finds min/max gdp
            .range([height - margin.bottom, margin.top])

            
        // CREATE SVG ELEMENT
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        // BUILD AND CALL AXES
        // X Axis
        const xAxis = d3.axisBottom(xScale)
        // svg.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", `translate(0,${height - margin.bottom})`)
        //     .call(xAxis)
        

        // Y Axis
        yAxis = d3.axisLeft(yScale) //shows the vertical axis
        //svg.append("g")
            // .attr("class", "axis")
            // .attr("transform", `translate(${margin.left},0)`)
            // .call(yAxis)

        // + UI ELEMENT SETUP
        const selectElement = d3.select("#dropdown")

        // add in dropdown options from the unique values in the data
        selectElement.selectAll("option")
            .data([
                // manually add the first value
                "Select a country",
                // add in all the unique values from the dataset
                ...new Set(state.data.map(d => d.country))])
            .join("option")
            .attr("attr", d => d)
            .text(d => d)

        // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
        selectElement.on("change", event => {
            state.selection = event.target.value
            console.log('state has been updated to: ', state)
            draw(); // re-draw the graph based on this new selection
        });


        //CALL AXES
        xAxisGroup = svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(${0}, ${height - margin.bottom})`)
            .call(xAxis)

        xAxisGroup.append("text")
            .attr("class", 'xLabel')
            .attr("transform", `translate(${width / 2}, ${35})`)
            .text("Year")

        yAxisGroup = svg.append("g")
            .attr("class", "yAxis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis)

        yAxisGroup.append("text")
            .attr("class", 'yLabel')
            .attr("transform", `translate(${-45}, ${height / 2})`)
            .attr("writing-mode", 'vertical-rl')
            .text("GDP")

        draw();

    }


    /* DRAW FUNCTION */
    // we call this every time there is an update to the data/state
    function draw() {

    //FILTER DATA
    const filteredData = state.data.filter(d => d.country === state.selection) // shows data for Germany 
        console.log('filtered', filteredData)


    // //GROUP DATA
    const groupedData = d3.groups(state.data, d => d.country) //want to group data by country - d3.groups takes an accessor function
    console.log('grouped', groupedData)

    // + UPDATE SCALE(S), if needed
    yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.gdp)])
    // + UPDATE AXIS/AXES, if needed
    yAxisGroup
        .transition()
        .duration(1000)
        .call(yAxis.scale(yScale))// need to update the scale


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
        .y1(d => yScale(d.gdp)) //topline set to gdp

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
        .attr("x", width / 1.9)
        .attr("y", height / 20) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text(`${filteredData[0].country} GDP`) //interpolates so that name updates to match country change
        .attr("font-family", "Cursive")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .attr("fill", "red")


    //LABEL THE X-AXIS
    svg
        .append("text")
        .attr("class", "axis")
        .attr("transform", `translate(450,${height - margin.bottom + 50})`)
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .text("Years")

    //LABEL THE Y-AXIS 
    svg
        .append("text")
        .attr("class", "axis")
        .attr("transform", `translate(15, ${height - margin.bottom - 200})` + 'rotate (270)')
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .text("GDP")



    }

    // SCALES


// });