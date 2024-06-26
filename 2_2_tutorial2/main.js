const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
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

    const colorScale = d3.scaleOrdinal()
        .domain(["D", "C"]) //"d" & "c" = values in column Dogs_or_Cats
        .range(["brown", "turquoise"])



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

    //trying to wrap the dot-labels - not working - https://observablehq.com/@jtrim-ons/svg-text-wrapping
        function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }   

    //CREATE SCATTERPLOT
    const dot = svg
        .selectAll("dot")
        .data(data, d => d.Location)
        .join(
            enter => enter.append("circle")
                .attr("r", 0)
                .call(selection => selection
                    .transition()
                    .duration(1100) //slows the transition
                    .delay((d, i) => i * 40) //higher # = slower transition
                    .attr("r", radius),
                    update => update,
                    exit => exit.remove()
                ) //transition allows the dots to grow from radius 0 to their radius value
        )
        .attr("class", "dot")
        .attr("cx", d => xScale(d.Dog_Owning_Households_1000s)) 
        .attr("cy", d => yScale(d.Cat_Owning_Households)) 
        .attr("fill", d => colorScale(d.Dogs_or_Cats)) //will color the circles based on this scale
        .on('mouseover', function (e, d) {
            console.log(e, d);
            //d3.select(this)
            d3.select("#dot-labels")
                .text(d.State + ": " + d.Dog_Owning_Households_1000s + ", " + d.Cat_Owning_Households) //labels dots
                .attr("x", xScale(d.Dog_Owning_Households_1000s) - margin.left / 6)
                .attr("y", yScale(d.Cat_Owning_Households) + (margin.top + 8) - (margin.right + 1)) //the margin.right + 1 helped move the label to right position
                
        })

        
    //LABEL THE DOTS
    svg
        .append("text")
        .attr("id", "dot-labels")
        .attr("font-size", 11)
        .attr("font-weight", "bold")
        .call(wrap, width)
        
    
    //LABEL THE SCATTERPLOT
    svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 20) //higher the denominator, higher the text moves up pg
        .attr("text-anchor", "middle")
        .text("Dog vs Cat Ownership By State")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .attr("fill", "darkviolet")

    //LABEL THE X-AXIS
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(400,${height - margin.bottom + 50})`)
        .attr("fill", "brown")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .text("Dog owning households (per 1,000)")

    //LABEL THE Y-AXIS 
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("fill", "turquoise")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .attr("transform", `translate(15, ${height - margin.bottom - 110})` + 'rotate (270)')
        .text("Cat owning households (per 1,000)")


})