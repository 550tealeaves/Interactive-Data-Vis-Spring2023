//https://gist.github.com/anonymous/bc5a9691a3417b403d4e8ade3297afa3/3a2434c1c2849e476791e581754ec27e055db4d6

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

const w = 700;
const h = 500;
const margin = { top: 50, bottom: 100, left: 30, right: 20};
const width = w - margin.left - margin.right;
const height = h - margin.top - margin.bottom;

const x = d3.scaleBand()
    .domain(data.map(function (d) {
        return d.key;
    })) //d=> d.key replaces function (d) {return d.key}
    .range([margin.left, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.value;
    })])
    .range([height, margin.top])

const yAxis = d3.axisLeft().scale(y)


const svg = d3.select("body").append("svg")
    .attr("id", "chart")
    .attr("width", w)
    .attr("height", h);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);


svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .on("mouseover", function () {
        d3.select(this)
            .attr("fill", "red")
    })
    .on("mouseout", function () {
        d3.select(this)
            .transition("colorfade")
            .duration(250)
            .attr("fill", function (d) {
                return "rgb(" + Math.round(d.value * 2) + ","
                    + Math.round(d.value * 2) + "," + Math.round(d.value * 2) + ")";
            })
    })

    .attr("fill", function (d) {
        return "rgb(" + Math.round(d.value * 2) + ","
            + Math.round(d.value * 2) + "," + Math.round(d.value * 2) + ")";
    })

    .attr("x", function (d, i) {
        return x(d.key);
    })
    .attr("width", x.bandwidth())
    .attr("y", height)

    .transition("bars")
    .delay(function (d, i) {
        return i * 50;
    })
    .duration(1000)

    .attr("y", function (d, i) {
        return y(d.value);
    })
    .attr("height", function (d, i) {
        return height - y(d.value);
    })


svg.selectAll("rect")
    .append("title")
    .text(function (d) {
        return d.key + ": " + d.value;
    })



svg.selectAll(".val-label")
    .data(data)
    .enter()
    .append("text")
    .classed("val-label", true)

    .attr("x", function (d, i) {
        return x(d.key) + x.bandwidth() / 2;
    })
    .attr("y", height)

    .transition("label")
    .delay(function (d, i) {
        return i * 50;  // gives it a smoother effect
    })
    .duration(1000)

    .attr("y", function (d, i) {
        return y(d.value) - 4;
    })
    .attr("text-anchor", "middle")
    .text(function (d) { return d.value });

svg.selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .classed("bar-label", true)

    .attr("transform", function (d, i) {
        return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")"
            + " rotate(45)"
    })

    .attr("text-anchor", "left")
    .text(function (d) { return d.key })

d3.select("#byKey").on("click", function () {
    data.sort(function (a, b) {
        return d3.ascending(a.key, b.key)
    })
    x.domain(data.map(function (d) {
        return d.key;
    }));
    svg.selectAll(".bar")
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return x(d.key);
        })

    svg.selectAll(".val-label")
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return x(d.key) + x.bandwidth() / 2;
        })

    svg.selectAll(".bar-label")
        .transition()
        .duration(500)
        .attr("transform", function (d, i) {
            return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
        })

})

d3.select("#byValue").on("click", function () {
    data.sort(function (a, b) {
        return d3.ascending(a.value, b.value)
    })
    data.sort(function (b, a) {
        return d3.ascending(b.value, a.value)
    })
    x.domain(data.map(function (d) {
        return d.key;
    }));
    svg.selectAll(".bar")
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return x(d.key);
        })

    svg.selectAll(".val-label")
        .transition()
        .duration(500)
        .attr("x", function (d, i) {
            return x(d.key) + x.bandwidth() / 2;
        })

    svg.selectAll(".bar-label")
        .transition()
        .duration(500)
        .attr("transform", function (d, i) {
            return "translate(" + (x(d.key) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")" + " rotate(45)"
        })
})