const dataset = [5, 10, 15, 20, 25];

d3.select("#container")
.selectAll("p")
.data(dataset)
.enter()
.append("p")
.text(d => "I can count up to " + d) //same as .text(function(d) {return "I can count up to " + d;}) - inserts string and dataset paragraphs
.style("color", d => {  //the d => could be replaced w/ function(d)
    if (d > 15) {
        return "red";
    } else {
        return "blue"
    }
    })  //if the dataset values > 15, then turn them red. If not turn them blue


d3.select("#container")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        const barHeight = d * 5; //scale up by factor of 5
        return barHeight + "px";
    })
    

var datasetNew = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];

d3.select("body")
    .selectAll("div")
    .data(datasetNew)
    .enter()
    .append("div")
    .attr("class", "bar") //4th J bro
    .style("height", function (d) {
        var barHeight = d * 5;
        return barHeight + "px";
    });
