const width = 450,
height = 550,
margin = 30;


d3.json("../data/census_states_all_totals.json", d3.autoType)
.then(data => {
    console.log('data', data)


    const radius = Math.min(width, height) / 2 - margin

    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height /2 + ")");

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#ff4949", "#38ff84", "#ff8ceb", "#ffe900", "#6fbcad"])

    const pie = d3.pie()
        .value(d => ([d.TotalEmpSec_PrivateNonProfit, d.TotalEmpSec_PrivateSector, d.TotalEmpSec_PublicSector, d.TotalEmpSec_SelfEmployed, d.TotalEmpSec_UnpaidFamilyWorkers])) //replaces ({function (d) {return(d.value})}})
    //const data_ready = pie(d3.entries(data))



    svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("path")
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr("fill", "red") //replaces function (d) {return (color(d.data.key))}
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)



})