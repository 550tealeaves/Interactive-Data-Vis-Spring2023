/*Define global constants*/
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


/* LOAD DATA */
d3.json("../data/census_occ_subset.json", d3.autoType).then(data => {
    return data = d+data;

});
    console.log("data", data);
    var maleJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving"]
    var femJobs = ["Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var allJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving", "Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var colorCode = ["M_F_ManagementBusinessandFinancialOperations", "M_F_ProfessionalandRelated", "M_F_HealthcareSupport", "M_F_ProtectiveService", "M_F_FoodPrepandServing", "M_F_BuildingandGroundsCleaningandMaintenance", "M_F_PersonalCareandService", "M_F_SalesandRelated", "M_F_OfficeandAdminSupport", "M_F_FarmingFishingandForestry", "M_F_ConstructionExtractionandMaintenance", "M_F_Production", "M_F_TranspoandMaterialMoving"]
    console.log("maleJobs", maleJobs);
    console.log("femJobs", femJobs);
    console.log("allJobs", allJobs);
    console.log("colorCode", colorCode);

    var dataReady = allJobs.map( function(jobs) {
        return {
            name: jobs,
            values: data.map(function(d) {
                return {state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + all corresponding value
            })
        }
    }) //formats the allJobs variable 
    var dataReadyMale = maleJobs.map(function (jobs) {
        return {
            name: jobs,
            values: data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + corresponding male value
            })
        }
    }) //formats the maleJobs variable
    var dataReadyFem = femJobs.map(function (jobs) {
        return {
            name: jobs,
            values: data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + corresponding female value
            })
        }
    }) //formats the femJobs variable
    var dataReadyColor = colorCode.map(function (color) {
        return {
            name: color,
            values: data.map(function (d) {
                return {
                    state: d.Statistics, value: d[color]
                }; //returns array of objects that has state + all corresponding value
            })
        }
    }) //formats the allJobs variable 
    console.log("dataReady", dataReady);
    console.log("dataReadyMale", dataReadyMale);
    console.log("dataReadyFem", dataReadyFem);
    console.log("dataReadyColor", dataReadyColor);


    //ADD DROPDOWN OPTIONS 
    d3.select("#dropdown")
    .selectAll('myOptions')
        .data(["Management, Business, and Financial Operations  Occupations", "Professional and Related Occupations", "Healthcare Support Occupations", "Protective Service Occupations", "Food Preparation and Serving Related Occupations", "Building and Grounds Cleaning and Maintenance  Occupations", "Personal Care and Service Occupations", "Sales and Related Occupations", "Office and Administrative Support Occupations", "Farming, Fishing, and Forestry Occupations", "Construction, Extraction, and Maintenance  Occupations", "Production Occupations", "Transportation and Material Moving Occupations"])
    //.data(allJobs) //all headers from jobs variable shows here
    .join('option')
    .text(d => d)
    .attr("value", d => d)

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataReadyMale, d => d.value)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataReadyFem, d => d.value)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["M", "F"]) //maps to the two different values
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
        .data([data])
        .join("circle")
        .attr("class", "circle")
        .attr("cx", d => xScale(dataReadyMale => d.value)) //alternative below
        .attr("cy", d => yScale(dataReadyFem => d.value)) //alternative below
        .attr("r", radius)
        .attr("fill", d => colorScale(dataReadyColor => d.value)) //will color the circles based on this scale - replaces colorScale([d.Male_ManagementBusinessandFinancialOperations, d.Fem_ManagementBusinessandFinancialOperations ]))
        .on('mouseover', function (e, d) {
            d3.select(this)
                .append("title") //adds tooltip (text) too all "rect" elements on mouseover
                .text(function(d, i) {
                    return d.Statistics + " - " + "M: " + dataReadyMale[0].values[0].value + ", F: " + dataReadyFem[0].values[0].value;
                } //code for tooltip  
        )})



    // //LABEL THE DOTS
    // svg.selectAll("labels")
    //     .data(dataReady)
    //     .join("text")
    //     .text(dataReadyMale => (d.value) + ", " + (dataReadyFem => d.Fem_ManagementBusinessandFinancialOperations)) //labels dots
    //     .attr("x", dataReadyMale => xScale(d.value) - margin.left / 5)
    //     .attr("y", dataReadyFem => yScale(d.value) - margin.left / 9)
    //     .attr("font-size", 10)
    //     .attr("font-weight", "bold")
    //     .attr("fill", "transparent")
    //     .on('mouseover', function () {
    //         d3.select(this)
    //             .attr("fill", "black")
    //     }) // this works when you mouse over - turn red
    //     .on('mouseout', function () {
    //         d3.select(this)
    //             .attr("fill", "transparent")
    //     }) //mouseout function works and the labels turn clear  




    // //LABEL THE SCATTERPLOT
    // svg
    //     .append("text")
    //     .attr("class", "title")
    //     .attr("x", width / 2)
    //     .attr("y", height / 20) //higher the denominator, higher the text moves up pg
    //     .attr("text-anchor", "middle")
    //     .text("Management, Business, and Financial Operations")
    //     .style("font-size", "20px")
    //     .style("font-weight", "bold")
    //     .style("text-decoration", "underline")
    //     .attr("fill", "darkblue")



    // //LABEL THE X-AXIS
    // svg
    //     .append("text")
    //     .attr("class", "axis-label")
    //     .attr("transform", `translate(750,${height - margin.bottom + 50})`)
    //     .attr("fill", "purple")
    //     .style("font-weight", "bold")
    //     .style("font-size", "18px")
    //     .text("Males")

    // //LABEL THE Y-AXIS 
    // svg
    //     .append("text")
    //     .attr("class", "axis-label") //gave it a new class name b/c it seems to move w/ the dot labels
    //     .attr("fill", "orange")
    //     .style("font-weight", "bold")
    //     .style("font-size", "18px")
    //     .attr('transform', (d, i) => {
    //         return 'translate( ' + yScale(i) + ' , ' + 350 + '),' + 'rotate(270)';
    //     }) // higher positive # - more label moves DOWN y-axis 
    //     .attr('dy', '-54.0em') //-40 moves label 40 to the left - (+40 moves to right)
    //     // .attr("transform", `translate(${margin.left - 60},200), ' + 'rotate(45)`)
    //     .text("Females")


