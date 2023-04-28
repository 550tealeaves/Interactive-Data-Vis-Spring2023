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
    d3.csv("../data/census.csv"), 
    d3.csv("../data/census_transposed.csv", d3.autoType),    
]).then(([data, censustwo]) => {
        console.log("data", data)
        console.log("censustwo", censustwo)

        /* HTML ELEMENTS */
        // APPEND SVG
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.TotalPopulationBySex)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // // colorScale
        // const colorScale = d3.scaleOrdinal()
        //     .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
        //     .range(["red", "lightblue", "green", "pink", "purple"])


        /* AXES */
        // xAxis
        const xAxis = d3.axisBottom(xScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxis)

        // yAxis
        const yAxis = d3.axisLeft(yScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxis)


        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Total State Population")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.TotalPopulationBySex) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.Statistics))
            .attr("fill", "green")

        // AXIS LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.TotalPopulationBySex)
            .attr("x", d => xScale(d.TotalPopulationBySex))
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")


    
        //SECOND SVG - MALE POPULATION BY STATE 

        const svgMale = d3.select("#second-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleMale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.MalePop)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScaleMale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // // colorScale
        // const colorScale = d3.scaleOrdinal()
        //     .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
        //     .range(["red", "lightblue", "green", "pink", "purple"])


        /* AXES */
        // xAxis
        const xAxisMale = d3.axisBottom(xScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxisMale)

        // yAxis
        const yAxisMale = d3.axisLeft(yScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxisMale)


        //ADD CHART TITLE    
        svgMale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Male Population Per State")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svgMale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScaleMale.bandwidth()) //girth of bars 
            .attr("width", d => xScaleMale(d.MalePop) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScaleMale(d.Statistics))
            .attr("fill", "purple")

        // AXIS LABELS
        svgMale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.MalePop)
            .attr("x", d => xScaleMale(d.MalePop))
            .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")

        

        //THIRD SVG - FEMALE POPULATION BY STATE
        const svgFemale = d3.select("#third-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleFemale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.FemalePop)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScaleFemale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // // colorScale
        // const colorScale = d3.scaleOrdinal()
        //     .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
        //     .range(["red", "lightblue", "green", "pink", "purple"])


        /* AXES */
        // xAxis
        const xAxisFemale = d3.axisBottom(xScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxisFemale)

        // yAxis
        const yAxisFemale = d3.axisLeft(yScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxisFemale)


        //ADD CHART TITLE    
        svgFemale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Female Population Per State")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svgFemale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScaleFemale.bandwidth()) //girth of bars 
            .attr("width", d => xScaleFemale(d.FemalePop) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScaleFemale(d.Statistics))
            .attr("fill", "darkred")

        // AXIS LABELS
        svgFemale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.FemalePop)
            .attr("x", d => xScaleFemale(d.FemalePop))
            .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")



        
        //FOURTH SVG - MALE AGE BRACKET POP - STATE - not drawing anything
        
        const svgMaleAge = d3.select("#fourth-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleMaleAge = d3.scaleLinear()
            .domain(data.map(d => (d.M_Under5Years, d.M_5to9Years, d.M_10to14Years, d.M_15to17Years, d.M_18to24Years, d.M_25to34Years, d.M_35to44Years, d.M_45to54Years, d.M_55to64Years, d.M_65to74Years, d.M_75to84Years, d.M_85YearsandOver))) //d3 max = function expecting an array - can pass in an accessor function
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


        BARS
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
            .text(d => data[0].M_Under5Years)
            .attr("x", d => xScaleMaleAge(data[0].M_Under5Years))
            .attr("y", d => yScaleMaleAge(['<5', '5-9', '10-14', '15-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']) + yScaleMaleAge.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")
    })