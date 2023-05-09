/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


    
Promise.all([
    d3.csv("../data/census_occ_cat_subset.csv"),
    d3.csv("../data/census_occ_pct.csv", d3.autoType),
]).then(([catPct, data]) => {
    console.log("catPct", catPct)
    console.log("statesPct", data)
    console.log("maleCat", catPct.slice(1, 13));
    console.log("maleState", data.columns.slice(1, 13));
    var allGroup = ["Alabama", "Alaska"]
    console.log("allGroup", allGroup);

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Male_ManagementBusinessandFinancialOperations))
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Fem_ManagementBusinessandFinancialOperations))
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["M", "F"]) 
        .range(["purple", "orange"])



    /*HTML Elements */
    //CREATE SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //X AXIS 
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
        .attr("class", "axis") 
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(xAxis)


    //Y AXIS
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`) 
        .call(yAxis)


    //CREATE SCATTERPLOT
    const dot = svg
        .selectAll("circle")
        .data(data, d => d.Statistics)
        .join("circle")
        .attr("class", "circle")
        .attr("cx", d => xScale(d.Male_ManagementBusinessandFinancialOperations))
        .attr("cy", d => yScale(d.Fem_ManagementBusinessandFinancialOperations))
        .attr("r", radius)
        .attr("fill", d => colorScale(d.M_F_ManagementBusinessandFinancialOperations)) 
        .on('mouseover', function (e, d) {
            console.log(e, d);
            
            //d3.select(this)
               d3.select("#dot-labels") 
                .text(d.Statistics + " - " + "M: " + d.Male_ManagementBusinessandFinancialOperations + ", F: " + d.Fem_ManagementBusinessandFinancialOperations)   
                .attr("x", xScale(d.Male_ManagementBusinessandFinancialOperations) - margin.left / 7)
                .attr("y", yScale(d.Fem_ManagementBusinessandFinancialOperations))
                
            }) 

    svg
        .append("text")
        .attr("font-size", 12)
        .attr("fill", "red")
        .attr("id", "dot-labels")
        // .on('mouseover', function() {
        //     d3.select(this)
        //         .attr("fill", "red")        
        
        
        
        //     }) // this works when you mouse over - turn red
        // .on('mouseout', function() {
        //     d3.select(this)
        //     .transition("colorfade")
        //     .attr("fill", "transparent")
        // }) //mouseout function works and the labels turn clear  

        //PROBLEM - the graph starts off with dots - want to see them blank and mouseover to reveal label and mouseout to hide them


    //LABEL THE SCATTERPLOT
    svg
        .append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", height / 20) 
        .attr("text-anchor", "middle")
        .text("Management, Business, and Financial Operations")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .attr("fill", "darkblue")

    //LABEL THE X-AXIS
    svg
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(750,${height - margin.bottom + 50})`)
        .attr("fill", "purple")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .text("Males")

    //LABEL THE Y-AXIS 
    svg //use margin to arrange y-axis - Mia
        .append("text")
        .attr("class", "axis-label")
        .attr("fill", "orange")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .attr('transform', (d, i) => {
            return 'translate( ' + yScale(i) + ' , ' + 350 + '),' + 'rotate(270)';
        })  
        .attr('y', -970) 
        .text("Females")


    //CREATE A LEGEND
    //https://stackoverflow.com/questions/55219862/updating-stacked-bar-chart-d3-with-multiple-datasets
    legend.append("rect")
        .attr("x", width - 10) 
        .attr("width", 15)
        .attr("height", 15) 
        .attr("fill", d => colorScale.range())

    //LABEL THE LEGEND
    legend.append("text")
        .attr("x", width - 13)
        .attr("y", 7) 
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d)

});