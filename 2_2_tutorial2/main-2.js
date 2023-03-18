const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 5;


d3.csv("..//data/catsvdogs.csv", d3.autoType).then(data => {
    console.log(data)

    /**SCALES*/

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.Dog_Owning_Households_1000s))])
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Cat_Owning_Households)])
        .range([height - margin.bottom, margin.top])

    
    
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
        .attr("cx", d => d.Dog_Owning_Households_1000s) //alternative below
        .attr("cy", d => d.Cat_Owning_Households) //alternative below
        .attr("r", radius)
        .attr("fill", "purple")
        .attr("stroke", "blue")
        
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.Dog_Owning_Households_1000s + ", " + d.Cat_Owning_Households) //labels dots
        .attr("x", d => d.Dog_Owning_Households_1000s)
        .attr("y", d => d.Cat_Owning_Households)
        .attr("font-size", 14)
        
        
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