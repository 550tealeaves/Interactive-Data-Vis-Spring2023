const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.9,
    margin = { top: 20, bottom: 60, left: 60, right: 70 },
    radius = 3;


d3.csv("..//data/catsvdogs.csv", d3.autoType).then(data => {
    console.log(data)

    /**SCALES*/

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.Percentage_of_Dog_Owners))])
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Percentage_of_Cat_Owners)])
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["D", "C"])
        .range(["green", "brown"])


    /*HTML Elements */
    //CREATE SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //X AXIS 
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
        .attr("class", "axis") //assigns axis class
        .attr("transform", `translate(0,${height - margin.bottom})`) //moves axes from default position at top to the bottom by 0, (height-margin.bottom)
        .call(xAxis)

    //Y AXIS
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`) //positions yAxis from default - moves it left by margin.left = ticks visible 
        .call(yAxis)



    const dot = svg
        .selectAll("circle")
        .data(data, d => d.Location)
        .join("circle")
        .attr("cx", d => xScale(d.Percentage_of_Dog_Owners)) //alternative below
        .attr("cy", d => yScale(d.Percentage_of_Cat_Owners)) //alternative below
        .attr("r", radius)
        .attr("fill", d => colorScale(d.Dogs_or_Cats))

    svg.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.Percentage_of_Dog_Owners + ", " + d.Percentage_of_Cat_Owners) //labels dots
        .attr("x", d => xScale(d.Percentage_of_Dog_Owners))
        .attr("y", d => yScale(d.Percentage_of_Cat_Owners))
        .attr("font-size", 11)

    svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 25) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text("Percentage Dog vs Cat Ownership By State")
        .style("font-size", "18px")
        .style("text-decoration", "underline")
        .attr("fill", "darkblue")


    //ALTERNATIVE WAY TO WRITE .attr("cx")
    // .attr("cx", function(d) {
    //     return d.Dog_Owning_Households_1000s;
    // })


    //ALTERNATIVE WAY TO WRITE .attr("cy")
    // .attr("cy", function(d) {
    //     return d.Cat_Owning_Households;
    // })

    //ALTERNATIVE WAY TO FIND THE AREA FOR CIRCLE SIZES
    //.attr("r", d=> Math.sqrt(height - radius)) - this makes the circles very big














})