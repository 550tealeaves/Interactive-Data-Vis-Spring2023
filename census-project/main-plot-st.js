/*Define global constants*/
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


let svg;
let xScale;
let yScale;
let colorScale;
let xAxis;
let yAxis;



/* APPLICATION STATE */
// data initialized as empty array - must load and assign it to state
let state = {
    data: [],
    selectedJobs: "Management, business, finance"
};

/* LOAD DATA */
d3.json("../data/census_occ_subset.json", d3.autoType).then(raw_data => {
    
    console.log("raw_data", raw_data);
    state.data = raw_data;
    var maleJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving"]
    var femJobs = ["Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var allJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving", "Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var colorCode = ["M_F_ManagementBusinessandFinancialOperations", "M_F_ProfessionalandRelated", "M_F_HealthcareSupport", "M_F_ProtectiveService", "M_F_FoodPrepandServing", "M_F_BuildingandGroundsCleaningandMaintenance", "M_F_PersonalCareandService", "M_F_SalesandRelated", "M_F_OfficeandAdminSupport", "M_F_FarmingFishingandForestry", "M_F_ConstructionExtractionandMaintenance", "M_F_Production", "M_F_TranspoandMaterialMoving"]
    console.log("maleJobs", maleJobs);
    console.log("femJobs", femJobs);
    console.log("allJobs", allJobs);
    console.log("colorCode", colorCode);

    var dataReady = allJobs.map(function (jobs) {
        return {
            name: jobs,
            values: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + all corresponding value
            })
        }
    }) //formats the allJobs variable 
    var dataReadyMale = maleJobs.map(function (jobs) {
        return {
            name: jobs,
            values: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + corresponding male value
            })
        }
    }) //formats the maleJobs variable
    var dataReadyFem = femJobs.map(function (jobs) {
        return {
            name: jobs,
            values: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; //returns array of objects that has state + corresponding female value
            })
        }
    }) //formats the femJobs variable
    var dataReadyColor = colorCode.map(function (color) {
        return {
            name: color,
            values: state.data.map(function (d) {
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

    init();
});


/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
    function init(){
        // d3.select("#dropdown")
        //     .selectAll("difOption")
        //     .data(state.data)
        //     .enter()
        //     .append("option")
        //     .text(function(d) {return d;})
        //     .attr("value", d => d)

    //X SCALE
    xScale = d3.scaleLinear()
        .domain(d3.extent(state.data, d => d.dataReadyMale))
        //.domain(d3.extent(data, d => d.Male_ManagementBusinessandFinancialOperations)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([margin.left, width - margin.right])

    //Y SCALE
    yScale = d3.scaleLinear()
        .domain(d3.extent(state.data, d => d.dataReadyFem))
        //.domain(d3.extent(data, d => d.Fem_ManagementBusinessandFinancialOperations)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(d3.extent(state.data, d => d.dataReadyColor)) //maps to the two different values
        .range(["purple", "orange"])

    // + AXES
    //X AXIS - when comment out these two codes, the options show on the bar
    // xAxis = d3.axisBottom(xScale)
        // svg.append("g")
    //     .attr("class", "axis") //assigns axis class
    //     .attr("transform", `translate(0,${height - margin.bottom})`) //moves axes from default position at top to the bottom by 0, (height-margin.bottom)
    //     .call(xAxis)


    // //Y AXIS
    //     yAxis = d3.axisLeft(yScale)
    //     svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", `translate(${margin.left},0)`) //positions yAxis from default - moves it left by margin.left = ticks visible 
    //     .call(yAxis)

    // + UI ELEMENT SETUP
    const selectElement = d3.select("#dropdown") // select dropdown element from HTML
    // add in dropdown options
    selectElement
        .selectAll("option")
        .data([ 
            { key: "M_F_ManagementBusinessandFinancialOperations", label: "Management, business, finance" }, // doesn't exist in data, we're adding this as an extra option
            { key: "M_F_ProfessionalandRelated", label: "Professional and related" },
            { key: "M_F_HealthcareSupport", label: "Healthcare support" },
            {
                key: "M_F_ProtectiveService", label: "Protective Services"
            },
            {
                key: "M_F_FoodPrepandServing", label: "Food Prep and Serving"
            },
            {
                key: "M_F_BuildingandGroundsCleaningandMaintenance", label: "Building & Grounds Cleaning & Maintenance"
            },
            {
                key: "M_F_PersonalCareandService", label: "Personal Care and Service"
            },
            {
                key: "M_F_SalesandRelated", label: "Sales and related"
            },
            {
                key: "M_F_OfficeandAdminSupport", label: "Office & Admin support"
            },
            {
                key: "M_F_FarmingFishingandForestry", label: "Farming, fishing, & forestry"
            },
            {
                key: "M_F_ConstructionExtractionandMaintenance", label: "Construction, extraction, & maintenance"
            }, 
            {
                key: "M_F_Production", label: "Production"
            },
            {
                key: "M_F_TranspoandMaterialMoving", label: "Transportation & material moving"
            }
        ])
        .join("option")
        .attr("value", d => d.key) // set the key to the 'value' -- what we will use to FILTER our data later
        .text(d => d.label); // set the label to text -- easier for the user to read than the key


}