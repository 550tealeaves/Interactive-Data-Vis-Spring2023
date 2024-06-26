/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 50;
//   radius = ;

/* LOAD DATA */
d3.csv("../data/squirrelActivities.csv", d3.autoType)
  .then(data => {
    console.log(data)

    // APPEND SVG
    const svg = d3.select("#container").append("svg")
      .attr("width", width)
      .attr("height", height)

    /* SCALES */
    const xScale = d3.scaleBand()
      // min max of data
      // map over data and return only the count, 
      // so domain is no longer an object, its an array of counts
      // this probably wont work - why?
      .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
      // .domain(d3.extent(data.map(d => d.activities))) // extent returns an array
      // domain requires an array
      // .range([0, width]) // entire width of svg
      .range([margin, width - margin]) // adjust to include margin
      .padding(0.1)

    const yScale = d3.scaleLinear()
      // .domain(d3.extent(data.map(d => d.count))) // how ever many activites there are
      .domain([0, Math.max(...data.map(d => d.count))]) // d3 also has a max function
      // .range([height, 0])
      .range([height - margin, margin])
    
      const colorScale = d3.scaleOrdinal()
        .domain(xScale.domain())
        .range(["#bb3ded", "#26bce1", "#95fb51", "#ff821d", "#900c00"])

    /* HTML ELEMENTS */

    // APPEND RECTANGLES
    svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      // make them visible
      // appropriately creating one joined data element per datum

      // 4 attributes to make them show up
      // what are they? x, y, height, width

      // what to pass into x scale to get its appropriate position
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      // randomly positioned, not sized yet
      // .attr("width", 100)
      // .attr("height", 100)

      // SCALE
      .attr("height", d => (height - margin) - yScale(d.count))
      .attr("fill", d => colorScale(d.activity))
      // when working with bar charts, you want the min to be zero. otherwise the lowest number will not show up

      // WIDTH
      // we can use the xScale to calculate the width too
      // to fit different screens (responsive)
      .attr("width", xScale.bandwidth())

    /* AXES */
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg
      .append("g")
      .style("transform", `translate(0px, ${height - margin}px)`) // translate axis to bottom
      .call(xAxis)// off screen now
    svg
      .append("g")
      .style("transform", `translate(${margin}px, 0px)`) // translate axis to bottom
      .call(yAxis)

  });
