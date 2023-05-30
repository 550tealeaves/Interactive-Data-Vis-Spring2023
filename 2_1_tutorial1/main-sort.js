/* CONSTANTS AND GLOBALS */
const w = 900;
const h = 600;
const margin = { top: 50, bottom: 150, left: 50, right: 20 };
const width = w - margin.left - margin.right;
const height = h - margin.top - margin.bottom;


/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
    .then(data => {
        console.log("data", data)

    //X-SCALE
    const x = d3.scaleBand()
        .domain(data.map(d => d.activity)) //d=> d.activity replaces function (d) {return d.activity}
        .range([margin.left, width])
        .padding(0.1);


    //Y-SCALE
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)]) //d => d.count replaces function (d) {return d.count;}
        .range([height, margin.top])


    //Y-AXIS
    const yAxis = d3.axisLeft().scale(y)


    //CREATE SVG
    const svg = d3.select("body").append("svg")
        .attr("id", "chart")
        .attr("width", width)
        .attr("height", height);


    //APPEND AXES
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);


    //CREATE BAR WITH MOUSEOVER EVENT
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .on("mouseover", function () {
            d3.select(this)
                .attr("fill", "green")
        })
        .on("mouseout", function () {  //WHEN MOUSE NOT ON BAR, IT WILL COLORFADE
            d3.select(this)
                .transition("colorfade")
                .duration(250)
                .attr("fill", "pink")
        })

        .attr("fill", "mediumseagreen")

        .attr("x", function (d, i) {
            return x(d.activity);
        })
        .attr("width", x.bandwidth())
        .attr("y", height)

        .transition("bars")
        .delay(function (d, i) {
            return i * 50;
        })
        .duration(1000)

        .attr("y", function (d, i) {
            return y(d.count);
        })
        .attr("height", function (d, i) {
            return height - y(d.count);
        })


    svg.selectAll("rect")
        .append("title")
        .text(d => d.activity + ": " + d.count) //d=> d.activity replaces function(d){return d.activity...;}


    //LABELS THE VALUE OF THE BARS
    svg.selectAll(".val-label")
        .data(data)
        .enter()
        .append("text")
        .classed("val-label", true)

        .attr("x", function (d, i) {
            return x(d.activity) + x.bandwidth() / 2;
        })
        .attr("y", height)

        .transition("label")
        .delay(function (d, i) {
            return i * 50;  // gives it a smoother effect
        })
        .duration(1000)

        .attr("y", function (d, i) {
            return y(d.count) - 4;
        })
        .attr("text-anchor", "middle")
        .text(d => d.count) //(d=>d.count) replaces (function(d) {return d.count});


    //LABELS THE BOTTOM BARS ON THE X-AXIS AND ROTATES THEM (TEST 1, TEST 2 ETC)
    svg.selectAll(".bar-label")
        .data(data)
        .enter()
        .append("text")
        .classed("bar-label", true)

        .attr("transform", function (d, i) {
            return "translate(" + (x(d.activity) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")"
                + " rotate(45)"
        })

        .attr("text-anchor", "left")
        .text(d => d.activity) //(d => d.activity) replaces (function(d) {return d.activity;});


    //ADD FUNCTIONALITY TO "SORT BY activity" BUTTON - MUST TELL THE BARS, VALUE & BAR LABELS HOW TO MOVE WHEN EVENT HAPPENS
    d3.select("#byKey").on("click", function () {
        data.sort(function (a, b) {
            return d3.ascending(a.activity, b.activity)
        })
        x.domain(data.map(d => d.activity)) //(d => d.activity) replaces (function(d) {return d.activity;});
        svg.selectAll(".bar")
            .transition()
            .duration(500) //changes how fast the bars shift
            .attr("x", function (d, i) {
                return x(d.activity);
            })

        svg.selectAll(".val-label")
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return x(d.activity) + x.bandwidth() / 2;
            })

        svg.selectAll(".bar-label")
            .transition()
            .duration(500)
            .attr("transform", function (d, i) {
                return "translate(" + (x(d.activity) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
            })

    })


    //ADD FUNCTIONALITY TO "SORT BY VALUE" BUTTON - MUST TELL THE BARS, VALUE & BAR LABELS HOW TO MOVE WHEN EVENT HAPPENS
    d3.select("#byValue").on("click", function () {
        data.sort(function (a, b) {
            return d3.descending(a.count, b.count)
        })
        x.domain(data.map(d => d.activity)) //(d => d.activity) replaces (function(d) {return d.activity;});
        svg.selectAll(".bar")
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return x(d.activity);
            })

        svg.selectAll(".val-label")
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return x(d.activity) + x.bandwidth() / 2;
            })

        svg.selectAll(".bar-label")
            .transition()
            .duration(500)
            .attr("transform", function (d, i) {
                return "translate(" + (x(d.activity) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
            })
        

    })})