const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 5;


d3.csv("..//data/catsvdogs.csv", d3.autoType).then(data => {
    console.log(data)

    /**SCALEs*/
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.Dog_Owning_Households_1000s))])
        .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Cat_Owning_Households)])
        .range([height - margin.bottom, margin.top])

    /*HTML Elements */
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)


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
        .text(d => d.Dog_Owning_Households_1000s + " , " + d.Cat_Owning_Households) //labels dots
        .attr("x", d => d.Dog_Owning_Households_1000s)
        .attr("y", d => d.Cat_Owning_Households)
        
        
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