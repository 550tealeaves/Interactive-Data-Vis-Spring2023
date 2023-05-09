// set the dimensions and margins of the graph
const width = 450, //increase width and chart moves to middle
height = 450,
margin = 40;

d3.json("../data/census/states/all/totals.json", d3.autoType)
    .then(data => {
        console.log("data", data)
    })