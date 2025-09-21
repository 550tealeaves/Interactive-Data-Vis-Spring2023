/* population.js — full updated file */

/* CONSTANTS AND GLOBALS */
const width = 900;
const height = 1050;
const margin = 100; // left margin for labels / bar start

/* LOAD DATA */
d3.csv('../data/census_states_pcts.csv', d3.autoType).then(data => {
  // --- Ensure default alphabetical order by state (Statistics) ---
  data.sort((a, b) => String(a.Statistics).localeCompare(String(b.Statistics)));

  // --- SCALES: total / male / female charts ---
  const xMaxTotal = d3.max(data, d => d.TotalEmpStat_Employed);
  const xMaxMale = d3.max(data, d => d.MaleEmpStat_Employed);
  const xMaxFemale = d3.max(data, d => d.FemEmpStat_Employed);

  const xScale = d3.scaleLinear()
    .domain([0, xMaxTotal]).nice()
    .range([margin, width - margin]);

  const xScaleMale = d3.scaleLinear()
    .domain([0, xMaxMale]).nice()
    .range([margin, width - margin]);

  const xScaleFemale = d3.scaleLinear()
    .domain([0, xMaxFemale]).nice()
    .range([margin, width - margin]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Statistics))
    .range([margin, height - margin])
    .paddingInner(0.5);

  const yScaleMale = d3.scaleBand()
    .domain(data.map(d => d.Statistics))
    .range([margin, height - margin])
    .paddingInner(0.5);

  const yScaleFemale = d3.scaleBand()
    .domain(data.map(d => d.Statistics))
    .range([margin, height - margin])
    .paddingInner(0.5);

  // Simple sequential color scales (compact & readable)
  const colorTotal = d3.scaleSequential(d3.interpolatePlasma).domain([0, xMaxTotal]);
  const colorMale = d3.scaleSequential(d3.interpolateViridis).domain([0, xMaxMale]);
  const colorFemale = d3.scaleSequential(d3.interpolateWarm).domain([0, xMaxFemale]);

  /* SVG CONTAINERS */
  const svg = d3.select("#container")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "auto");

  const svgMale = d3.select("#second-container")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "auto");;

  const svgFemale = d3.select("#third-container")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "auto");

  /* X AXES */
  svg.append("g")
    .attr("class", "x axis total-axis")
    .attr("transform", `translate(0,${height - margin})`)
    .call(d3.axisBottom(xScale).tickFormat(d => Math.round(d * 100) + "%"));

  svgMale.append("g")
    .attr("class", "x axis male-axis")
    .attr("transform", `translate(0,${height - margin})`)
    .call(d3.axisBottom(xScaleMale).tickFormat(d => Math.round(d * 100) + "%"));

  svgFemale.append("g")
    .attr("class", "x axis female-axis")
    .attr("transform", `translate(0,${height - margin})`)
    .call(d3.axisBottom(xScaleFemale).tickFormat(d => Math.round(d * 100) + "%"));

  /* TITLES */
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", height / 16)
    .attr("text-anchor", "middle")
    .text("Total Employed Civilian Population % Ages 16 and Up")
    .style("font-size", "24px")
    .attr("fill", "mediumslateblue");

  svgMale.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", height / 16)
    .attr("text-anchor", "middle")
    .text("Male Employed Civilian Population % Ages 16 and Up")
    .style("font-size", "24px")
    .attr("fill", "mediumslateblue");

  svgFemale.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", height / 16)
    .attr("text-anchor", "middle")
    .text("Female Employed Civilian Population % Ages 16 and Up")
    .style("font-size", "24px")
    .attr("fill", "mediumslateblue");

  /* BARS — INITIAL RENDER (alphabetical) */

  // Total bars
  svg.selectAll(".bar-total")
    .data(data, d => d.Statistics)
    .enter()
    .append("rect")
    .attr("class", "bar-total")
    .attr("x", d => margin)
    .attr("y", d => yScale(d.Statistics))
    .attr("height", yScale.bandwidth())
    .attr("width", d => xScale(d.TotalEmpStat_Employed) - margin)
    .attr("fill", d => colorTotal(d.TotalEmpStat_Employed))
    .append("title")
    .text(d => `${(d.TotalEmpStat_Employed * 100).toFixed(1)}% of ${d.Statistics} (total)`);

  // Total value labels
  svg.selectAll(".label-total")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "label-total")
    .attr("x", d => xScale(d.TotalEmpStat_Employed) + 6)
    .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 2 + 4)
    .text(d => (d.TotalEmpStat_Employed.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })))
    .style("font-size", "10px");

  // Total state labels (left)
  svg.selectAll(".state-label-total")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "state-label-total")
    .attr("x", margin - 10)
    .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "11px")
    .text(d => d.Statistics);

  // Male bars
  svgMale.selectAll(".bar-male")
    .data(data, d => d.Statistics)
    .enter()
    .append("rect")
    .attr("class", "bar-male")
    .attr("x", d => margin)
    .attr("y", d => yScaleMale(d.Statistics))
    .attr("height", yScaleMale.bandwidth())
    .attr("width", d => xScaleMale(d.MaleEmpStat_Employed) - margin)
    .attr("fill", d => colorMale(d.MaleEmpStat_Employed))
    .append("title")
    .text(d => `${(d.MaleEmpStat_Employed * 100).toFixed(1)}% of ${d.Statistics} (male)`);

  // Male value labels
  svgMale.selectAll(".label-male")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "label-male")
    .attr("x", d => xScaleMale(d.MaleEmpStat_Employed) + 6)
    .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 2 + 4)
    .text(d => (d.MaleEmpStat_Employed.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })))
    .style("font-size", "10px");

  // Male state labels
  svgMale.selectAll(".state-label-male")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "state-label-male")
    .attr("x", margin - 10)
    .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "11px")
    .text(d => d.Statistics);

  // Female bars
  svgFemale.selectAll(".bar-female")
    .data(data, d => d.Statistics)
    .enter()
    .append("rect")
    .attr("class", "bar-female")
    .attr("x", d => margin)
    .attr("y", d => yScaleFemale(d.Statistics))
    .attr("height", yScaleFemale.bandwidth())
    .attr("width", d => xScaleFemale(d.FemEmpStat_Employed) - margin)
    .attr("fill", d => colorFemale(d.FemEmpStat_Employed))
    .append("title")
    .text(d => `${(d.FemEmpStat_Employed * 100).toFixed(1)}% of ${d.Statistics} (female)`);

  // Female value labels
  svgFemale.selectAll(".label-female")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "label-female")
    .attr("x", d => xScaleFemale(d.FemEmpStat_Employed) + 6)
    .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 2 + 4)
    .text(d => (d.FemEmpStat_Employed.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })))
    .style("font-size", "10px");

  // Female state labels
  svgFemale.selectAll(".state-label-female")
    .data(data, d => d.Statistics)
    .enter()
    .append("text")
    .attr("class", "state-label-female")
    .attr("x", margin - 10)
    .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "11px")
    .text(d => d.Statistics);

  /* CREATE / INSERT SORT BUTTON (if missing) */
  if (d3.select("#sortBtn").empty()) {
    d3.select("body")
      .insert("div", "#container")
      .attr("id", "sort-controls")
      .style("text-align", "center")
      .style("margin", "10px 0")
      .append("button")
      .attr("id", "sortBtn")
      .attr("class", "btn btn-primary")
      .text("Sort: Descending");
  } else {
    // set button initial text if it exists
    d3.select("#sortBtn").text("Sort: Descending");
  }

  /* SORT TOGGLE HANDLER: toggles descending/ascending for all 3 charts
     default view remains alphabetical; clicking changes to descending first */
  let sortDescending = true; // first click -> descending

  d3.select("#sortBtn").on("click", function () {
    // compute orders separately (each chart sorted by its own metric)
    const orderTotal = data.slice().sort((a, b) =>
      sortDescending ? d3.descending(a.TotalEmpStat_Employed, b.TotalEmpStat_Employed) :
                       d3.ascending(a.TotalEmpStat_Employed, b.TotalEmpStat_Employed)
    ).map(d => d.Statistics);

    const orderMale = data.slice().sort((a, b) =>
      sortDescending ? d3.descending(a.MaleEmpStat_Employed, b.MaleEmpStat_Employed) :
                       d3.ascending(a.MaleEmpStat_Employed, b.MaleEmpStat_Employed)
    ).map(d => d.Statistics);

    const orderFemale = data.slice().sort((a, b) =>
      sortDescending ? d3.descending(a.FemEmpStat_Employed, b.FemEmpStat_Employed) :
                       d3.ascending(a.FemEmpStat_Employed, b.FemEmpStat_Employed)
    ).map(d => d.Statistics);

    // update domains
    yScale.domain(orderTotal);
    yScaleMale.domain(orderMale);
    yScaleFemale.domain(orderFemale);

    // move total bars + labels + state labels
    svg.selectAll(".bar-total")
      .transition().duration(700)
      .attr("y", d => yScale(d.Statistics));

    svg.selectAll(".label-total")
      .transition().duration(700)
      .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 2 + 4)
      .attr("x", d => xScale(d.TotalEmpStat_Employed) + 6);

    svg.selectAll(".state-label-total")
      .transition().duration(700)
      .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 2 + 4);

    // move male chart items
    svgMale.selectAll(".bar-male")
      .transition().duration(700)
      .attr("y", d => yScaleMale(d.Statistics));

    svgMale.selectAll(".label-male")
      .transition().duration(700)
      .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 2 + 4)
      .attr("x", d => xScaleMale(d.MaleEmpStat_Employed) + 6);

    svgMale.selectAll(".state-label-male")
      .transition().duration(700)
      .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 2 + 4);

    // move female chart items
    svgFemale.selectAll(".bar-female")
      .transition().duration(700)
      .attr("y", d => yScaleFemale(d.Statistics));

    svgFemale.selectAll(".label-female")
      .transition().duration(700)
      .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 2 + 4)
      .attr("x", d => xScaleFemale(d.FemEmpStat_Employed) + 6);

    svgFemale.selectAll(".state-label-female")
      .transition().duration(700)
      .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 2 + 4);

    // Toggle for next click and update button text
    sortDescending = !sortDescending;
    d3.select("#sortBtn").text(sortDescending ? "Sort: Descending" : "Sort: Ascending");
  });

}); // end d3.csv().then
