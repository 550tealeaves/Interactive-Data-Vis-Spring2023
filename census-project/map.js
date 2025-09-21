/**CONSTANTS AND GLOBALS*/
    let svg, g, projection, geoPath;
    let state = { 
        geojson: [] //use empty array instead of null b/c null not iterable
    }; 
    let selectedJob = null; // dropdown selection

// Create job field mappings
    const profFields = {
        'prof': {
            male: 'Male_ProfessionalandRelated',
            female: 'Fem_ProfessionalandRelated',
            majority: 'M_F_ProfessionalandRelated',
        },
        'manage': {
            male: 'Male_ManagementBusinessandFinancialOperations',
            female: 'Fem_ManagementBusinessandFinancialOperations',
            majority: 'M_F_ManagementBusinessandFinancialOperations',
        },
        'health': {
            male: 'Male_HealthcareSupport',
            female: 'Fem_HealthcareSupport',
            majority: 'M_F_HealthcareSupport',
        },
        'prot': {
            male: 'Male_ProtectiveService',
            female: 'Fem_ProtectiveService',
            majority: 'M_F_ProtectiveService',
        },
        'food': {
            male: 'Male_FoodPrepandServing',
            female: 'Fem_FoodPrepandServing',
            majority: 'M_F_FoodPrepandServing',
        },
        'build': {
            male: 'Male_BuildingandGroundsCleaningandMaintenance',
            female: 'Fem_BuildingandGroundsCleaningandMaintenance',
            majority: 'M_F_BuildingandGroundsCleaningandMaintenance',
        },
        'personal': {
            male: 'Male_PersonalCareandService',
            female: 'Fem_PersonalCareandService',
            majority: 'M_F_PersonalCareandService',
        },
        'sales': {
            male: 'Male_SalesandRelated',
            female: 'Fem_SalesandRelated',
            majority: 'M_F_SalesandRelated',
        },
        'admin': {
            male: 'Male_OfficeandAdminSupport',
            female: 'Fem_OfficeandAdminSupport',
            majority: 'M_F_OfficeandAdminSupport',
        },
        'farm': {
            male: 'Male_FarmingFishingandForestry',
            female: 'Fem_FarmingFishingandForestry',
            majority: 'M_F_FarmingFishingandForestry',
        },
        'construct': {
            male: 'Male_ConstructionExtractionandMaintenance',
            female: 'Fem_ConstructionExtractionandMaintenance',
            majority: 'M_F_ConstructionExtractionandMaintenance',
        },
        'prod': {
            male: 'Male_Production',
            female: 'Fem_Production',
            majority: 'M_F_Production',
        },
        'transp': {
            male: 'Male_TranspoandMaterialMoving',
            female: 'Fem_TranspoandMaterialMoving',
            majority: 'M_F_TranspoandMaterialMoving',
        }
    };

/*** LOAD DATA***/
// Using a Promise.all([]), we can load more than one dataset at a time
    Promise.all([
        d3.json("../data/usState-jobs.json")
    ]).then(([geojson]) => {
        state.geojson = geojson;
        init(); //forces synchronicity
    }); //runs 1x after data finished loading 

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 */
    function init() {
        // Setup base dimensions
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.6;
        // Add zoom
        const zoom = d3.zoom()
            .scaleExtent([1, 8]) //extent to which you can zoom
            .on("zoom", zoomed);

        // Create responsive SVG - REASSIGN SVG - just call svg to refer to global scope
        svg = d3.select("#container")
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .classed("svg-content", true);

        //CREATE G - NEEDED FOR ZOOM
        g = svg.append("g"); //must append g to svg so the zoom function works

        // CREATE PROJECTION - stored object geojson into state b/c need to access it to create projection
        projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);

        // CREATE GEOPATH - map is actually a path
        geoPath = d3.geoPath(projection);

        // Create tooltip that works on hover
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("padding", "6px")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0);

        // DRAW MAP OF THE STATES
        g.selectAll(".state")
            .data(state.geojson.features)
            .join("path")
            .attr("class", "state")
            .attr("d", d => geoPath(d))
            .attr("fill", "lightgray")
            .attr("stroke", "black")
            .on("mouseover", function (event, d) {
            if (!selectedJob) return;

            const fields = profFields[selectedJob];
            const maleVal = d.properties[fields.male];
            const femaleVal = d.properties[fields.female];

            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`
                <strong>${d.properties.NAME}</strong><br/>
                Women: ${(femaleVal * 100).toFixed(1)}%<br/>
                Men: ${(maleVal * 100).toFixed(1)}%
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
            })
            .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
            tooltip.transition().duration(300).style("opacity", 0);
            });

        svg.call(zoom);

        // CREATE DROPDOWN LISTENER THAT UPDATES WHEN YOU SELECT DROPDOWN OPTION
        d3.select("#selectJob").on("change", function () {
            selectedJob = this.value;
            draw();
    });

    // CALL FUNCTION DRAW
    draw();

    // REDRAW MAP ON RESIZE - ADD EVENTLISTENER
    window.addEventListener("resize", resize);
    }

    /**
     * DRAW FUNCTION
     */
    function draw() {
        g.selectAll(".state")
            .transition()
            .duration(500)
            .attr("fill", d => {
            if (!selectedJob) return "lightgray";

            const fields = profFields[selectedJob];
            const maleVal = d.properties[fields.male];
            const femaleVal = d.properties[fields.female];

            if (femaleVal > maleVal) return "orangered"; // if women > men
            if (maleVal > femaleVal) return "darkgreen"; // if men > women
            return "lightblue"; // if tie or missing
            });
    }

    /**
     * ZOOM HANDLER
     */
    function zoomed(event) {
        g.attr("transform", event.transform);
        g.attr("stroke-width", 1 / event.transform.k);
    }

    /**
     * RESIZE HANDLER
     */
    function resize() {
        const newWidth = window.innerWidth * 0.9;
        const newHeight = window.innerHeight * 0.6;

        svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);

        projection.fitSize([newWidth, newHeight], state.geojson);
        geoPath = d3.geoPath(projection);

        g.selectAll(".state").attr("d", d => geoPath(d));
    }
