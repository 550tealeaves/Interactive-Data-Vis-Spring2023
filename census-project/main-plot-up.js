/*Define global constants*/
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.8,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 6;


/* LOAD DATA */
d3.csv("../data/census_occ_pct.csv", d3.autoType).then(data => {
    console.log("data", data);
    console.log(data.columns.slice(1, 13));
    var maleJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving"]
    var femJobs = ["Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var allJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving", "Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    var colorCode = ["M_F_ManagementBusinessandFinancialOperations", "M_F_ProfessionalandRelated", "M_F_HealthcareSupport", "M_F_ProtectiveService", "M_F_FoodPrepandServing", "M_F_BuildingandGroundsCleaningandMaintenance", "M_F_PersonalCareandService", "M_F_SalesandRelated", "M_F_OfficeandAdminSupport", "M_F_FarmingFishingandForestry", "M_F_ConstructionExtractionandMaintenance", "M_F_Production", "M_F_TranspoandMaterialMoving"]
    console.log("maleJobs", maleJobs);
    console.log("femJobs", femJobs);
    console.log("allJobs", allJobs);
    console.log("colorCode", colorCode);

    //add options to dropdown
    d3.select("#dropdown")
    .selectAll('myOptions')
        .data(["Management, Business, and Financial Operations  Occupations", "Professional and Related Occupations", "Healthcare Support Occupations", "Protective Service Occupations", "Food Preparation and Serving Related Occupations", "Building and Grounds Cleaning and Maintenance  Occupations", "Personal Care and Service Occupations", "Sales and Related Occupations", "Office and Administrative Support Occupations", "Farming, Fishing, and Forestry Occupations", "Construction, Extraction, and Maintenance  Occupations", "Production Occupations", "Transportation and Material Moving Occupations"])
    //.data(allJobs) //all headers from jobs shows here
    .join('option')
    .text(d => d)
    .attr("value", d => d)

    //X SCALE
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Male_ManagementBusinessandFinancialOperations)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([margin.left, width - margin.right])

    //Y SCALE
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Fem_ManagementBusinessandFinancialOperations)) //restricting axis to the min/max of the data (to increase the spread of the plots)
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["M", "F"]) //maps to the two different values
        .range(["purple", "orange"])

    
});