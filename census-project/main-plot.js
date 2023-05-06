/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


Promise.all([
    d3.csv("../data/census_categories_pct.csv"),
    d3.csv("../data/census_states_pct.csv", d3.autoType),
]).then(([catPct, data]) => {
    console.log("catPct", catPct)
    console.log("statesPct", data)

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Male_ManagementBusinessandFinancialOperations))
        //.domain([d3.min(data.map(d => d.Male_ManagementBusinessandFinancialOperations)), d3.max(data.map(d => d.Male_ManagementBusinessandFinancialOperations))]) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Fem_ManagementBusinessandFinancialOperations))
        //.domain([d3.min(data.map(d => d.Fem_ManagementBusinessandFinancialOperations)), d3.max(data, d => d.Fem_ManagementBusinessandFinancialOperations)]) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain([0, d3.max(data.map(d => [d.Male_ManagementBusinessandFinancialOperations, d.Fem_ManagementBusinessandFinancialOperations]))]) //maps to the two different values
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
        .attr("class", "axis") //assigns axis class
        .attr("transform", `translate(0,${height - margin.bottom})`) //moves axes from default position at top to the bottom by 0, (height-margin.bottom)
        .call(xAxis)


    //Y AXIS
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`) //positions yAxis from default - moves it left by margin.left = ticks visible 
        .call(yAxis)


    //CREATE SCATTERPLOT
    const dot = svg
        .selectAll("circle")
        .data(data, d => d.Statistics)
        .join("circle")
        .attr("class", "circle")
        .attr("cx", d => xScale(d.Male_ManagementBusinessandFinancialOperations)) //alternative below
        .attr("cy", d => yScale(d.Fem_ManagementBusinessandFinancialOperations)) //alternative below
        .attr("r", radius)
        .attr("fill", d => colorScale([d.Male_ManagementBusinessandFinancialOperations, d.Fem_ManagementBusinessandFinancialOperations])) //will color the circles based on this scale - replaces colorScale([d.Male_ManagementBusinessandFinancialOperations, d.Fem_ManagementBusinessandFinancialOperations ]))
        .on('mouseover', function (e, d) {
            console.log(e, d);
            
            //d3.select(this)
               d3.select("#dot-labels") //adds dot labels when you over (text) too all "circle" elements on mouseover
                .text(d.Statistics + " - " + "M: " + d.Male_ManagementBusinessandFinancialOperations + ", F: " + d.Fem_ManagementBusinessandFinancialOperations) //code for labels  
                .attr("x", xScale(d.Male_ManagementBusinessandFinancialOperations) - margin.left / 7)
                .attr("y", yScale(d.Fem_ManagementBusinessandFinancialOperations))
                
            }) //mouseover takes 2 arguments (e = event, d = data)
        

        // .on('mouseout', function () {
        //     d3.select(this)
        //         .transition("colorfade")
        //         .delay(100)
        //         .attr("fill", "purple") //bars will turn color when mouse leaves
        // })
        // .text(d => (d.Statistics + " male population is " + d.MalePop.toLocaleString()))
        
        
        //d => (d.Statistics + " population is " + d.TotalPopulationBySex.toLocaleString())  replaces (function(d) { return (d.Statistics + " population is " + d.TotalPopulationBySex.toLocaleString()) })

    //LABEL THE DOTS
    //.enter.append() = .join()

//for tooltips, select text and id

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
        .attr("y", height / 20) //higher the denominator, higher the text moves up pg
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
        .attr("class", "axis-label") //gave it a new class name b/c it seems to move w/ the dot labels
        .attr("fill", "orange")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .attr('transform', (d, i) => {
            return 'translate( ' + yScale(i) + ' , ' + 350 + '),' + 'rotate(270)';
        }) // higher positve # - more label moves DOWN y-axis 
        .attr('y', -970) //-40 moves label 40 to the left - (+40 moves to right)
        // .attr("transform", `translate(${margin.left - 60},200), ' + 'rotate(45)`)
        .text("Females")


});