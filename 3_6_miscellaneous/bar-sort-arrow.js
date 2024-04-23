//https://gist.github.com/anonymous/bc5a9691a3417b403d4e8ade3297afa3/3a2434c1c2849e476791e581754ec27e055db4d6

//DATA
const data = [
    { key: "Test 1", value: 21 },
    { key: "Test 2", value: 34 },
    { key: "Test 3", value: 85 },
    { key: "Test 4", value: 41 },
    { key: "Test 5", value: 26 },
    { key: "Test 6", value: 46 },
    { key: "Test 7", value: 66 },
    { key: "Test 8", value: 77 },
    { key: "Test 9", value: 85 },
    { key: "Test 10", value: 83 },
    { key: "Test 11", value: 12 },
    { key: "Test 12", value: 22 },
    { key: "Test 13", value: 97 }
];


//SET YOUR DIMENSIONS  
const w = 700;
const h = 500;
const margin = { top: 50, bottom: 100, left: 30, right: 20 };
const width = w - margin.left - margin.right;
const height = h - margin.top - margin.bottom;


//X-SCALE
const x = d3.scaleBand()
    .domain(data.map(d => d.key)) //d=> d.key replaces function (d) {return d.key}
    .range([margin.left, width])
    .padding(0.1);


//Y-SCALE
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]) //d => d.value replaces function (d) {return d.value;}
    .range([height, margin.top])


//Y-AXIS
const yAxis = d3.axisLeft().scale(y)


//CREATE SVG
const svg = d3.select("body").append("svg")
    .attr("id", "chart")
    .attr("width", w)
    .attr("height", h);


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
            .attr("fill", d => {
                return "rgb(" + Math.round(d.value * 2) + ","
                    + Math.round(d.value * 2) + "," + Math.round(d.value * 2) + ")";
            })
    })

    .attr("fill", d => {
        return "rgb(" + Math.round(d.value * 2) + ","
            + Math.round(d.value * 2) + "," + Math.round(d.value * 2) + ")";
    })

    .attr("x", (d, i) => {
        return x(d.key);
    })
    .attr("width", x.bandwidth())
    .attr("y", height)

    .transition("bars")
    .delay((d, i) => {
        return i * 50;
    })
    .duration(1000)

    .attr("y", (d, i) => {
        return y(d.value);
    })
    .attr("height", (d, i) => {
        return height - y(d.value);
    })


svg.selectAll("rect")
    .append("title")
    .text(d => d.key + ": " + d.value) //d=> d.key replaces function(d){return d.key...;}


//LABELS THE VALUE OF THE BARS
svg.selectAll(".val-label")
    .data(data)
    .enter()
    .append("text")
    .classed("val-label", true)

    .attr("x", (d, i) => {
        return x(d.key) + x.bandwidth() / 2;
    }) 
    .attr("y", height)

    .transition("label")
    .delay((d, i) => {
        return i * 50;  // gives it a smoother effect
    })
    .duration(1000)

    .attr("y", (d, i) => {
        return y(d.value) - 4;
    })
    .attr("text-anchor", "middle")
    .text(d => d.value) //(d=>d.value) replaces (function(d) {return d.value});


//LABELS THE BOTTOM BARS ON THE X-AXIS AND ROTATES THEM (TEST 1, TEST 2 ETC)
svg.selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .classed("bar-label", true)

    .attr("transform", (d, i) => {
        return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")"
            + " rotate(45)"
    })

    .attr("text-anchor", "left")
    .text(d => d.key) //(d => d.key) replaces (function(d) {return d.key;});


//ADD FUNCATIONALITY TO "SORT BY KEY" BUTTON - MUST TELL THE BARS, VALUE & BAR LABELS HOW TO MOVE WHEN EVENT HAPPENS
d3.select("#byKey").on("click", function () {
    data.sort((a, b) => {
        return d3.ascending(a.key, b.key)
    })
    x.domain(data.map(d => d.key)) //(d => d.key) replaces (function(d) {return d.key;});
    svg.selectAll(".bar")
        .transition()
        .duration(500) //changes how fast the bars shift
        .attr("x", (d, i) => {
            return x(d.key);
        })

    svg.selectAll(".val-label")
        .transition()
        .duration(500)
        .attr("x", (d, i) => {
            return x(d.key) + x.bandwidth() / 2;
        })

    svg.selectAll(".bar-label")
        .transition()
        .duration(500)
        .attr("transform", (d, i) => {
            return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
        })

})


//ADD FUNCTIONALITY TO "SORT BY VALUE" BUTTON - MUST TELL THE BARS, VALUE & BAR LABELS HOW TO MOVE WHEN EVENT HAPPENS
d3.select("#byValue").on("click", function () {
    data.sort((a, b) => {
        return d3.descending(a.value, b.value)
    })
    x.domain(data.map(d => d.key)) //(d => d.key) replaces (function(d) {return d.key;});
    svg.selectAll(".bar")
        .transition()
        .duration(500)
        .attr("x", (d, i) => {
            return x(d.key);
        })

    svg.selectAll(".val-label")
        .transition()
        .duration(500)
        .attr("x", (d, i) => {
            return x(d.key) + x.bandwidth() / 2;
        })

    svg.selectAll(".bar-label")
        .transition()
        .duration(500)
        .attr("transform", (d, i) => {
            return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
        })
})