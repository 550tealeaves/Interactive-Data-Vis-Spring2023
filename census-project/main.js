/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1000;
margin = 100;


/* LOAD DATA */
d3.csv('../data/census.csv', d3.autoType)
    .then(data => {
        console.log("data", data)


        /* HTML ELEMENTS */
        // APPEND SVG
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.FemES_Unemployed)]) //d3 max = function expecting an array - can pass in an accessor function
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
            .text("Female Unemployed Rate")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.FemES_Unemployed) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.Statistics))
            .attr("fill", "darkred")

        // AXIS LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.FemES_Unemployed)
            .attr("x", d => xScale(d.FemES_Unemployed))
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")




        //Remember height (#0) starts from the top but we want to start from the bottom - so have to start from the top and move down
        //Remember width starts at left which is where we want it to

        //ORIGINAL CODE FOR VERTICAL BARS

        // // xscale - categorical, activity
        // const xScale = d3.scaleBand()
        //     .domain(data.map(d => d.activity))
        //     .range([0, width]) // visual variable
        //     .paddingInner(.2)

        // // yscale - linear, count
        // const yScale = d3.scaleLinear()
        //     .domain([0, d3.max(data, d => d.count)])
        //     .range([height, 0])

        // svg.selectAll("rect")
        // .data(data)
        // .join("rect")
        // .attr("width", xScale.bandwidth()) //bandwidth() - constant # that d3 calculates - resizes based on svg size (we scale svg to screen size) - constant for every element - //width must correspond to the data
        // .attr("height", d=> height - yScale(d.count))
        // .attr("x", d=>xScale(d.activity))
        // .attr("y", d=> yScale(d.count))

    })