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
    selectedJobs: "TOTAL"
};

/* LOAD DATA */
d3.json("../data/census_occ_total_subset.json", d3.autoType).then(raw_data => {
    
    console.log("raw_data", raw_data);
    console.log(raw_data[0].Fem_HealthcareSupport)
    console.log(raw_data[15].M_F_OfficeandAdminSupport)
    state.data = raw_data;
    
    //CREATE DIFFERENT DATA GROUPS
    var maleJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving"]
    
    var femJobs = ["Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    
    var allJobs = ["Male_ManagementBusinessandFinancialOperations", "Male_ProfessionalandRelated", "Male_HealthcareSupport", "Male_ProtectiveService", "Male_FoodPrepandServing", "Male_BuildingandGroundsCleaningandMaintenance", "Male_PersonalCareandService", "Male_SalesandRelated", "Male_OfficeandAdminSupport", "Male_FarmingFishingandForestry", "Male_ConstructionExtractionandMaintenance", "Male_Production", "Male_TranspoandMaterialMoving", "Fem_ManagementBusinessandFinancialOperations", "Fem_ProfessionalandRelated", "Fem_HealthcareSupport", "Fem_ProtectiveService", "Fem_FoodPrepandServing", "Fem_BuildingandGroundsCleaningandMaintenance", "Fem_PersonalCareandService", "Fem_SalesandRelated", "Fem_OfficeandAdminSupport", "Fem_FarmingFishingandForestry", "Fem_ConstructionExtractionandMaintenance", "Fem_Production", "Fem_TranspoandMaterialMoving"]
    
    var colorCode = ["M_F_ManagementBusinessandFinancialOperations", "M_F_ProfessionalandRelated", "M_F_HealthcareSupport", "M_F_ProtectiveService", "M_F_FoodPrepandServing", "M_F_BuildingandGroundsCleaningandMaintenance", "M_F_PersonalCareandService", "M_F_SalesandRelated", "M_F_OfficeandAdminSupport", "M_F_FarmingFishingandForestry", "M_F_ConstructionExtractionandMaintenance", "M_F_Production", "M_F_TranspoandMaterialMoving"]
    
    var allStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "TOTAL"]
    console.log("maleJobs", maleJobs);
    console.log("femJobs", femJobs);
    console.log("allJobs", allJobs);
    console.log("colorCode", colorCode);
    console.log("allStates", allStates);
    
    //IMPORT THE DATA TO THE CORRESPONDING GROUPS
    var dataReady = allJobs.map(function (jobs) {
        return {
            title: jobs,
            details: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; 
            })
        }
    }) 
    var dataReadyMale = maleJobs.map(function (jobs) {
        return {
            title: jobs,
            details: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; 
            })
        }
    }) 
    var dataReadyFem = femJobs.map(function (jobs) {
        return {
            title: jobs,
            details: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: +d[jobs]
                }; 
            })
        }
    }) 
    var dataReadyColor = colorCode.map(function (color) {
        return {
            title: color,
            details: state.data.map(function (d) {
                return {
                    state: d.Statistics, value: d[color]
                }; 
            })
        }
    }) 

    var dataReadyStates = allStates.map(function (states) {
        return {
            name: states,
            details: state.data.map(function (d) {
                return {
                    title: ([dataReady]), value: +d[states]
                }; 
            })
        }
    }) 

    console.log("dataReady", dataReady);
    console.log("dataReadyMale", dataReadyMale);
    console.log("dataReadyFem", dataReadyFem);
    console.log("dataReadyColor", dataReadyColor);
    console.log(dataReady[0].details[2].value)
    console.log("dataReadyStates", dataReadyStates);


    init();
});


/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
    function init(){
    // + CREATE SVG ELEMENT
    svg = d3.select("#container") 
        .append("svg")
        .attr("width", width)
        .attr("height", height)


    //X SCALE
    xScale = d3.scaleLinear()
        .domain(d3.extent(state.data, d => d.dataReadyMale))
        .range([margin.left, width - margin.right])

    //Y SCALE
    yScale = d3.scaleLinear()
        .domain(d3.extent(state.data, d => d.dataReadyFem))
        .range([height - margin.bottom, margin.top])

    const colorScale = d3.scaleOrdinal()
        .domain(["M", "F"])      
        .range(["purple", "orange"])

    // + AXES
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
        
    
    //EVENT LISTENER
    const selectElement = d3.select("#dropdown")
        .on("change", event => {
            console.log('selected', event.target.value);
            state.selectedJobs = event.target.value
            console.log("state", state)
        })
    draw();
}    
    
/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
    // + FILTER DATA BASED ON JOBS
    const filteredData = state.data
        .filter(d => state.selectedJobs === d.TOTAL || state.selectedJobs === d.dataReadyMale || state.selectedJobs === d.dataReadyFem) 
    console.log('filteredData', filteredData)



//X AXIS 
const xAxisGroup = d3.axisBottom(xScale)
    svg.append("g")
        .attr("class", "axis") 
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(xAxis)


//Y AXIS
const yAxisGroup = d3.axisLeft(yScale)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)  
        .call(yAxis)


// add labels - xAxis
xAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Males")
    .attr("fill", "purple")

// add labels - yAxis
yAxisGroup.append("text")
    .attr("class", 'axis-title')
    .attr("x", -40)
    .attr("y", height / 2)
    .attr("writing-mode", "vertical-lr")
    .attr("text-anchor", "middle")
    .text("Females")
    .attr("fill", "orange")




const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.Statistics) 
    .join(
        // + HANDLE ENTER SELECTION
        enter => enter
        .append("circle")
        .attr("cx", d => xScale(d.dataReadyMale))
        .attr("cy", d => yScale(d.dataReadyFem))
        .attr("r", 0)
        .attr("fill", "red") 
        .on('mouseover', function (e, d) {
            d3.select(this)
                .append("title")  
                .text(function (d, i) {
                    return d.Statistics + " - " + "M: " + dataReadyMale[0].values[0].value + ", F: " + dataReadyFem[0].values[0].value;
                }   
                )
        })

        .call(sel => sel
            .transition()
            .attr("r", radius)
            .transition()
            .duration(2000)
            .attr("cs", d => xScale(d.dataReadyMale))
            
        ),

        // + HANDLE UPDATE SELECTION
      update => update,


        // + HANDLE EXIT SELECTION
        exit => exit
        .call(sel => sel  
            .attr("opacity", 1)
            .transition() 
            .duration(3000)
            .delay((d, i) => i * 50) 

            //after transition
            .attr("fill", "purple")
            .remove()  
        )


    );
    
}

