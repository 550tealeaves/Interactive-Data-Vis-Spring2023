/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7;
const height = 400;
margin = 60;


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



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.activity))
            .range([height - margin, margin])
            .paddingInner(.5)

        // colorScale
        const colorScale = d3.scaleOrdinal()
            .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
            .range(["crimson", "skyblue", "green", "pink", "purple"])


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
            .text("Squirrel Activities")
            .style("font-size", "28px")
            .attr("font-weight", "bold")
            .attr("fill", "palevioletred")


        // BARS
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.count) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.activity))
            .attr("fill", d => colorScale(d.activity))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", "yellow")
            }) //when mouseover the bars, it will show this color
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade") //this is the transition
                    .delay(500) //how fast the transition happens
                    .attr("fill", d => colorScale(d.activity))
            }) //when mouse out, it will fade back to the colorScale range
            .append("title") //adding the tooltip
            .text(d => (d.count + " squirrels are " + d.activity)) //tooltip displays this statement - # count of squirrels are "activity"


        // BAR LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.count)
            .attr("x", d => xScale(d.count) + 10) //spaced out the labels from the bar
            .attr("y", d => yScale(d.activity) + yScale.bandwidth() / 2) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .attr("fill", "deeppink")





        //Remember height (#0) starts from the top but we want to start from the bottom - so have to start from the top and move down
        //Remember width starts at left which is where we want it to

        //ORIGINAL CODE FOR VERTICAL BARS

        // // xScale - categorical, activity
        // const xScale = d3.scaleBand()
        //     .domain(data.map(d => d.activity))
        //     .range([0, width]) // visual variable
        //     .paddingInner(.2)

        // // yScale - linear, count
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