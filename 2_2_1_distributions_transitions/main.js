/* Constants and globals */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = {top: 20, left: 60, bottom: 60, right: 20},
    radius = 5;


/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType) //json parser uploads json file and store it as variable data
    .then(data => {
        console.log(data)


/*DEFINE SCALES*/
//X SCALE
const xScale = d3.scaleLinear() //scale is linear
.domain([0, 1]) //scales must have domain/range - domain is percentage 
.range([margin.left, width - margin.right]) //range is (60, (width-20))

//Y SCALE
const yScale = d3.scaleLinear()
.domain([0, 100]) //score from 0-100
.range([height - margin.bottom, margin.top]) //SVG always start at top left corner - 0 at margin-bottom, and 100 at margin-top  ((height - 60, 20))

/*create color scale*/
const colorScale = d3.scaleOrdinal() //doing ordinal scale b/c discrete values 
.domain(["R", "D"]) //domain value are either Repub or Dem
.range(["red", "blue"]) //elements w/ party R map to red; elements w/ party D map to blue


/*HTML ELEMENTS*/
//append SVG
const svg = d3.select("#container") //select for elements w/ ID container
.append("svg") //append the element SVG to all that was selected before
.attr("width", width) //give attribute width and pass width variable that was defined at top 
.attr("height", height) //give attribute height and pass height variable that was defined at top
.style("background-color", "palegoldenrod") //background color = style NOT attribute


//append circles
const dots = svg.selectAll(".dot") //1st J bro - select all elements w/ class dot
.data(data) //2nd J bro - add the data (don't have key function to pass in this ex)
.join(
    enter => enter.append("circle") //append circle element to entering data items
    .attr("r", 0) //radius size of new data entering in BEFORE transition
    .call(selection => 
        selection
            .transition() //call function to return selection
            .duration(1000) //further defines transition
            .delay((d, i) => i * 20) //delay based on index (position in array) - circles grow at diff rates based on position
            .attr("r", radius)), //Add attribute radius and pass in the constant radius defined at the top 
    update => update, //no change - returning selection 
    exit => exit.remove()
) 

.attr("class", "dot") //w/o this there would be circles displayed that didn't have class dot
.attr("cx", d => xScale(d.ideologyScore2020)) //cx = positioning xScale & passing property ideologyScore2020
.attr("cy", d => yScale(d.envScore2020)) //cy = positioning yScale & passing property, envScore2020
.attr("fill", d => colorScale(d.Party)) //add the colorScale created above as attribute in making circles visible

});
