/* Constants and globals */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = {top: 20, left: 60, bottom: 60, right: 20},
    radius = 5;


/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType) //json parser uploads json file and store it as variable data
    .then(data => {
        console.log(data)
})

/*DEFINE SCALES*/
//X SCALE
const xScale = d3.scaleLinear() //scale is linear
.domain([0, 1]) //scales must have domain/range - domain is percentage 
.range([margin.left, width - margin.right]) //range is (60, (width-20))

//Y SCALE
const yScale = d3.scaleLinear()
.domain([0, 100]) //score from 0-100
.range([height - margin.bottom, margin.top]) //SVG always start at top left corner - 0 at margin-bottom, and 100 at margin-top  ((height - 60, 20))


/*HTML ELEMENTS*/
//append SVG
const svg = d3.select("#container") //select for elements w/ ID container
.append("svg") //append the element SVG to all that was selected before
.attr("width", width) //give attribute width and pass width variable that was defined at top 
.attr("height", height) //give attribute height and pass height variable that was defined at top
.style("background-color", "aquamarine") //background color = style NOT attribute


//append circles
