const dataset = [ 5, 10, 15, 20, 25];

d3.select("#container")
.selectAll("p")
.data(dataset)
.enter()
.append("p")
.text(d => "I can count up to " + d) //same as .text(function(d) {return "I can count up to " + d;}) - inserts string and dataset paragraphs
