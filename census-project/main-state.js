/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;



/* LOAD DATA */
d3.csv('../data/census_states_pct.csv', d3.autoType)
    .then(data => {
        console.log("data", data)

        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.Male_ConstructionExtractionandMaintenance)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // colorScale
        const colorScale = d3.scaleOrdinal()
            .domain(xScale.domain()) //same as putting the [0,d3.max(data, d => d.TotalPopBySex)]
            .range(["#6e40aa", "#7140ab", "#743fac", "#773fad", "#7a3fae", "#7d3faf", "#803eb0", "#833eb0", "#873eb1", "#8a3eb2", "#8d3eb2", "#903db2", "#943db3", "#973db3", "#9a3db3", "#9d3db3", "#a13db3", "#a43db3", "#a73cb3", "#aa3cb2", "#ae3cb2", "#b13cb2", "#b43cb1", "#b73cb0", "#ba3cb0", "#be3caf", "#c13dae", "#c43dad", "#c73dac", "#ca3dab", "#cd3daa", "#d03ea9", "#d33ea7", "#d53ea6", "#d83fa4", "#db3fa3", "#de3fa1", "#e040a0", "#e3409e", "#e5419c", "#e8429a", "#ea4298", "#ed4396", "#ef4494", "#f14592", "#f34590", "#f5468e", "#f7478c", "#f9488a", "#fb4987", "#fd4a85", "#fe4b83", "#ff4d80", "#ff4e7e", "#ff4f7b", "#ff5079", "#ff5276", "#ff5374", "#ff5572", "#ff566f", "#ff586d", "#ff596a", "#ff5b68", "#ff5d65", "#ff5e63", "#ff6060", "#ff625e", "#ff645b", "#ff6659", "#ff6857", "#ff6a54", "#ff6c52", "#ff6e50", "#ff704e", "#ff724c", "#ff744a", "#ff7648", "#ff7946", "#ff7b44", "#ff7d42", "#ff8040", "#ff823e", "#ff843d", "#ff873b", "#ff893a", "#ff8c38", "#ff8e37", "#fe9136", "#fd9334", "#fb9633", "#f99832", "#f89b32", "#f69d31", "#f4a030", "#f2a32f", "#f0a52f", "#eea82f", "#ecaa2e", "#eaad2e", "#e8b02e", "#e6b22e", "#e4b52e", "#e2b72f", "#e0ba2f", "#debc30", "#dbbf30", "#d9c131", "#d7c432", "#d5c633", "#d3c934", "#d1cb35", "#cece36", "#ccd038", "#cad239", "#c8d53b", "#c6d73c", "#c4d93e", "#c2db40", "#c0dd42", "#bee044", "#bce247", "#bae449", "#b8e64b", "#b6e84e", "#b5ea51", "#b3eb53", "#b1ed56", "#b0ef59", "#adf05a", "#aaf159", "#a6f159", "#a2f258", "#9ef258", "#9af357", "#96f357", "#93f457", "#8ff457", "#8bf457", "#87f557", "#83f557", "#80f558", "#7cf658", "#78f659", "#74f65a", "#71f65b", "#6df65c", "#6af75d", "#66f75e", "#63f75f", "#5ff761", "#5cf662", "#59f664", "#55f665", "#52f667", "#4ff669", "#4cf56a", "#49f56c", "#46f46e", "#43f470", "#41f373", "#3ef375", "#3bf277", "#39f279", "#37f17c", "#34f07e", "#32ef80", "#30ee83", "#2eed85", "#2cec88", "#2aeb8a", "#28ea8d", "#27e98f", "#25e892", "#24e795", "#22e597", "#21e49a", "#20e29d", "#1fe19f", "#1edfa2", "#1ddea4", "#1cdca7", "#1bdbaa", "#1bd9ac", "#1ad7af", "#1ad5b1", "#1ad4b4", "#19d2b6", "#19d0b8", "#19cebb", "#19ccbd", "#19cabf", "#1ac8c1", "#1ac6c4", "#1ac4c6", "#1bc2c8", "#1bbfca", "#1cbdcc", "#1dbbcd", "#1db9cf", "#1eb6d1", "#1fb4d2", "#20b2d4", "#21afd5", "#22add7", "#23abd8", "#25a8d9", "#26a6db", "#27a4dc", "#29a1dd", "#2a9fdd", "#2b9cde", "#2d9adf", "#2e98e0", "#3095e0", "#3293e1", "#3390e1", "#358ee1", "#378ce1", "#3889e1", "#3a87e1", "#3c84e1", "#3d82e1", "#3f80e1", "#417de0", "#437be0", "#4479df", "#4676df", "#4874de", "#4a72dd", "#4b70dc", "#4d6ddb", "#4f6bda", "#5169d9", "#5267d7", "#5465d6", "#5663d5", "#5761d3", "#595fd1", "#5a5dd0", "#5c5bce", "#5d59cc", "#5f57ca", "#6055c8", "#6153c6", "#6351c4", "#6450c2", "#654ec0", "#664cbe", "#674abb", "#6849b9", "#6a47b7", "#6a46b4", "#6b44b2", "#6c43af", "#6d41ad", "#6e40aa"])


        /* AXES */
        // xAxis
        const xAxis = d3.axisBottom(xScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxis)

        // yAxis
        const yAxis = d3.axisLeft(yScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxis)


        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Males in construction extraction and maintenance")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // AXIS LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(d => d.Male_ConstructionExtractionandMaintenance)//returns formatted string - if # then adds commas
            .attr("x", d => xScale(d.Male_ConstructionExtractionandMaintenance))
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .style("font-size", "10px")

        // BARS
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            //.join("rect")
            .attr("class", "bar")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.Male_ConstructionExtractionandMaintenance) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.Statistics))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScale(d.Male_ConstructionExtractionandMaintenance))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", "darkgoldenrod") //bars will turn color when mouse leaves
            })
            .append("title") //adds tooltip (text) too all "rect" elements on mouseover
            .text(d => (d.Statistics + ": " + d.Male_ConstructionExtractionandMaintenance))
        //d => (d.Statistics + " population is " + d.Male_ConstructionExtractionandMaintenance.toLocaleString())  replaces (function(d) { return (d.Statistics + " population is " + d.TotalPopulationBySex.toLocaleString()) })

        d3.select(".value-sort").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(b.Male_ConstructionExtractionandMaintenance, a.Male_ConstructionExtractionandMaintenance);
            })
            yScale.domain(data.map(d => d.Statistics)) //(d => d.Statistics) replaces (function(d) {return d.Statistics;});

            svg.selectAll(".bar")
                .transition()
                .duration(700) //changes how fast the bars shift
                .attr("y", function (d, i) {
                    return yScale(d.Statistics);
                }) //will move the bars


            svg.selectAll(".labels") //select class labels to move
                .transition()
                .duration(500)
                .attr("y", function (d, i) {
                    return yScale(d.Statistics) + yScale.bandwidth() / 1;
                }) //will move the labels
        })

        d3.select(".state-sort").on("click", function () {
            data.sort(function (a, b) {
                return d3.ascending(a.Statistics, b.Statistics)
            })

            yScale.domain(data.map(d => d.Statistics))

            svg.selectAll(".bar")
                .transition()
                .duration(700)
                .attr("transform", function (d, i) {
                    return "translate (" + (yScale(d.Statistics) + yScale.bandwidth() / 2 - 8) + "," + (height + 20) + ")"
                })

            svg.selectAll(".labels")
                .transition()
                .duration(700)
                .attr("transform", function (d, i) {
                    return "translate (" + (yScale(d.Statistics));
                })
        })




    })