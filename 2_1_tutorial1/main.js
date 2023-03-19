/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .3;
const height = 400;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
    .then(data => {
        console.log("data", data)


        /* HTML ELEMENTS */
        // APPEND SVG
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Squirrel Activities")
            .style("font-size", "28px")
            .style("text-decoration", "underline")
            .attr("fill", "red")

        /* SCALES */
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d=> d.count)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([0, width])
        


        const yScale = d3.scaleBand()
            .domain(data.map(d => d.activity))
            .range([height, 0])
            .paddingInner(.2)


        // const xAxis = d3.axisBottom(xScale)
        // svg.append("g")
        //     .attr("class", "axis")
        //     //.attr("transform", `translate(0,${height})`)
        //     .call(xAxis)

        // const yAxis = d3.axisLeft(yScale)
        // svg.append("g")
        //     .attr("class", "axis")
        //     //.attr("transform", `translate(${margin.left},0)`)
        //     .call(yAxis)


            
        // bars
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScale.bandwidth()) //didn't write a function 
            .attr("width", d => xScale(d.count)) //=> shorthand for function - must return a value
            // .attr("x", d => xScale(d.count)) //this tells it to move over the # of the count and shift over the # of the count
            .attr("y", d => yScale(d.activity))
            .attr("fill", "transparent")
            .attr("stroke", "green")


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