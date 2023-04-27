const width = window.innerWidth * 0.9;
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 60, right: 40 };

// let svg;
// let xScale;
// let yScale;
// let colorScale;

/* LOAD DATA */
d3.csv('../data/2021_5yr_estimates_income_sex_clean.csv', d3.autoType)
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
            .domain([0, d3.max(data, d => d.Employed)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // colorScale
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
            .text("Census")
            .style("font-size", "26px")
            .style("text-decoration", "underline")
            .attr("fill", "darkred")


        // BARS
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.Employed) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.Statistics))
            .attr("fill", "blue")

        // AXIS LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.Employed)
            .attr("x", d => xScale(d.Employed))
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 2) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")

    })