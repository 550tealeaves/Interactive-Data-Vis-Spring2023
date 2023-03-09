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