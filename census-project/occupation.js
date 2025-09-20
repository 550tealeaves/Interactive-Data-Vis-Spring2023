/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.9,
    margin = { top: 20, bottom: 60, left: 60, right: 40 },
    radius = 5;



Promise.all([
    d3.csv("../data/census_occ_cat_subset.csv"),
    d3.csv("../data/census_occ_pct.csv", d3.autoType),
]).then(([catPct, data]) => {

    console.log("keyNames", Object.keys(data[0])); //extracts all the key names used for mapping

    // ⬅️  ADD THE CLEANUP RIGHT HERE, before you create scales or access columns
    data.forEach(d => {
        Object.keys(d).forEach(k => {
            const cleanKey = k.trim().replace(/^"|"$/g, ""); // remove spaces and surrounding quotes
            if (cleanKey !== k) {
                d[cleanKey] = d[k];
                delete d[k];
            }
        });
    });

    console.log("columns after cleanup", Object.keys(data[0]));


    console.log("catPct", catPct)
    console.log("statesPct", data)
    console.log("maleCat", catPct.slice(1, 13)); //groups all the male occupation categories percentages
    console.log("maleState", data.columns.slice(1, 13)); //groups all the male occup category labels (not the data)

    
    var allGroup = ["Alabama", "Alaska"]
    console.log("allGroup", allGroup); //only shows what's in the var allGroup above

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

    
    // === ⬇️ INSERT LEGEND CODE HERE, just after svg & colorScale ===
    const legendOffset = { x: margin.left + 20, y: margin.top + 20   };

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendOffset.x}, ${legendOffset.y})`);

    const legendItem = legend.selectAll(".legend-item")
        .data(colorScale.domain())
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 26})`); //higher the i*# is the more spaced out the rectangles are
        //higher the # after the translate - the boxes move to the right, lower the # move to left

    legendItem.append("rect")
        .attr("width", 25)
        .attr("height", 20)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", colorScale);

    legendItem.append("text")
        .attr("x", 8) //higher # the more to the right the M&F move
        .attr("y", 10) //higher # the further dow the M&F move
        .attr("dy", "2px") //higher the # the further down the M&F move 
        .style("font-size", "14px")
        .style("alignment-baseline", "middle") //alignment of text in relation to square
        .style("fill", "white") //color of text
        .attr("font-weight", "bold")
        .text(d => d);

    //Add tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("padding", "6px 8px")
        .style("border", "1px solid #62ac3aff")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);


    // X axis
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => Math.round(d * 100) + "%");

    svg.append("g")
        .attr("class", "x axis")     // 👈 add "x axis"
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    // Y axis
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => Math.round(d * 100) + "%");

    svg.append("g")
        .attr("class", "y axis")     // 👈 add "y axis"
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);


    //CREATE SCATTERPLOT
    const dot = svg
        .selectAll("dot")
        .data(data, d => d.State)
        .join(
            enter => enter.append("circle")
                .attr("r", 0)
                .call(selection => selection
                    .transition()
                    .duration(600)
                    .delay((d, i) => i * 120)
                    .attr("r", radius),
                    update => update,
                    exit => exit.remove()
                ) //transition allows the dots to grow from radius 0 to their radius value
        )
        .attr("class", "dot")
        .attr("cx", d => xScale(d.Male_ManagementBusinessandFinancialOperations))
        .attr("cy", d => yScale(d.Fem_ManagementBusinessandFinancialOperations))
        .attr("fill", d => colorScale(d.M_F_ManagementBusinessandFinancialOperations))
        .on('mouseover', function (e, d) {
            console.log(e, d);

            d3.select("#dot-labels")
                .text(d.State + " - " + "M: " + d.Male_ManagementBusinessandFinancialOperations.toLocaleString(undefined, {
                    style: "percent", minimumFractionDigits: 1
                }) + ", F: " + d.Fem_ManagementBusinessandFinancialOperations.toLocaleString(undefined, {
                    style: "percent", minimumFractionDigits: 1
                })) //minimumFractionDigits: 1 adds the tenth place (w/o it, just a whole %)
                .attr("x", xScale(d.Male_ManagementBusinessandFinancialOperations) - (margin.left / 7) - (margin.left + 3))
                .attr("y", yScale(d.Fem_ManagementBusinessandFinancialOperations) + (margin.top + 8) - (margin.right + 1))
        })


    // this is the original tooltip - removed b/c of other tooltip created
    // svg
    //     .append("text")
    //     .attr("font-size", 13)
    //     .attr("fill", "limegreen")
    //     .attr("font-weight", "bold")
    //     .attr("id", "dot-labels")
        


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
        .attr("transform", `translate(550,${height - margin.bottom + 50})`)
        .attr("fill", "purple")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .text("Males")

    //LABEL THE Y-AXIS 
    svg //use margin to arrange y-axis - Mia
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(25, ${height - margin.bottom - 200})` + 'rotate (270)')
        .attr("fill", "orange")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .text("Females")
    

    // after you draw the initial chart, add:

    // 1️⃣ Define a lookup from dropdown value -> CSV columns
    const columns = {
    mbfoo: {
        male: "Male_ManagementBusinessandFinancialOperations",
        fem: "Fem_ManagementBusinessandFinancialOperations",
        mf: "M_F_ManagementBusinessandFinancialOperations",
        title: "Management, Business & Finance"
    },
    pro: {
        male: "Male_ProfessionalandRelated",
        fem: "Fem_ProfessionalandRelated",
        mf: "M_F_ProfessionalandRelated",
        title: "Professional and Related"
    },
    hso: {
        male: "Male_HealthcareSupport",
        fem: "Fem_HealthcareSupport",
        mf: "M_F_HealthcareSupport",
        title: "Healthcare support"
    },
    protect: {
        male: "Male_ProtectiveService",
        fem: "Fem_ProtectiveService",
        mf: "M_F_ProtectiveService",
        title: "Protective service"
    },
    fps: {
        male: "Male_FoodPrepandServing",
        fem: "Fem_FoodPrepandServing",
        mf: "M_F_FoodPrepandServing",
        title: "Food prep & service"
    },
    bgcmo: {
        male: "Male_BuildingandGroundsCleaningandMaintenance",
        fem: "Fem_BuildingandGroundsCleaningandMaintenance",
        mf: "M_F_BuildingandGroundsCleaningandMaintenance",
        title: "Building, grounds cleaning & maintenance"
    },
    pcso: {
        male: "Male_PersonalCareandService",
        fem: "Fem_PersonalCareandService",
        mf: "M_F_PersonalCareandService",
        title: "Personal care & service"
    },
    sro: {
        male: "Male_SalesandRelated",
        fem: "Fem_SalesandRelated",
        mf: "M_F_SalesandRelated",
        title: "Sales and related"
    },
    oaso: {
        male: "Male_OfficeandAdminSupport",
        fem: "Fem_OfficeandAdminSupport",
        mf: "M_F_OfficeandAdminSupport",
        title: "Office & administrative support"
    },
    fffo: {
        male: "Male_FarmingFishingandForestry",
        fem: "Fem_FarmingFishingandForestry",
        mf: "M_F_FarmingFishingandForestry",
        title: "Farming, fishing & forestry"
    },
    cemo: {
        male: "Male_ConstructionExtractionandMaintenance",
        fem: "Fem_ConstructionExtractionandMaintenance",
        mf: "M_F_ConstructionExtractionandMaintenance",
        title: "Construction, extraction, maintenance"
    },
    prod: {
        male: "Male_Production",
        fem: "Fem_Production",
        mf: "M_F_Production",
        title: "Production"
    },
    tmmo: {
        male: "Male_TranspoandMaterialMoving",
        fem: "Fem_TranspoandMaterialMoving",
        mf: "M_F_TranspoandMaterialMoving",
        title: "Transportation & material moving"
    }
    // ... add the rest of your 13 categories here
    };

    // 2️⃣ Wrap your drawing code into a function
    function updateScatter(catKey) {
    const cfg = columns[catKey];

    // update scales
    xScale
        .domain(d3.extent(data, d => d[cfg.male]));
    yScale
        .domain(d3.extent(data, d => d[cfg.fem]));


    svg.select(".x.axis")
        .transition().duration(600)
        .call(d3.axisBottom(xScale).tickFormat(d => Math.round(d * 100) + "%"));

    svg.select(".y.axis")
        .transition().duration(600)
        .call(d3.axisLeft(yScale).tickFormat(d => Math.round(d * 100) + "%"));


    //Update points
    svg.selectAll("circle.dot")
        .data(data, d => d.State)
        .join("circle")
        .attr("class", "dot")
        .on("mouseover", (e, d) => {
            tooltip.style("opacity", 1)
                .html(
                `<strong>${d.State}</strong><br>
                Males: ${(d[cfg.male] * 100).toFixed(1)}%<br>
                Females: ${(d[cfg.fem] * 100).toFixed(1)}%`
                );
        })
        .on("mousemove", (e) => {
            tooltip
                .style("left", e.pageX + 15 + "px")
                .style("top", e.pageY - 28 + "px");
        })
        .on("mouseleave", () => tooltip.style("opacity", 0))
        .transition().duration(600)
        .attr("cx", d => xScale(d[cfg.male]))
        .attr("cy", d => yScale(d[cfg.fem]))
        .attr("fill", d => colorScale(d[cfg.mf]));

        



    // update title
    svg.select(".title").text(cfg.title);
    }

    // 3️⃣ Listen for changes on the dropdown
    d3.select("#dropdown")
        .on("change", function () {
            const selected = d3.select(this)
                .property("value");
        updateScatter(selected);
    });



});