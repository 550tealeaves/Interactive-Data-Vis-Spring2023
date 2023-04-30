/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;

let svg;
let xScale;
let yScale;
let yAxis;

let state = {
    data: [],
};


/* LOAD DATA */
d3.csv('../data/census.csv', d3.autoType)
    .then(data => {
        console.log("data", data)


        /* HTML ELEMENTS */
        // APPEND SVG
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.TotalPopulationBySex)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // colorScale
        const colorScale = d3.scaleOrdinal()
            .domain(xScale.domain()) //same as putting the [0,d3.max(data, d => d.TotalPopBySex)]
            .range(["#6e40aa","#7140ab","#743fac","#773fad","#7a3fae","#7d3faf","#803eb0","#833eb0","#873eb1","#8a3eb2","#8d3eb2","#903db2","#943db3","#973db3","#9a3db3","#9d3db3","#a13db3","#a43db3","#a73cb3","#aa3cb2","#ae3cb2","#b13cb2","#b43cb1","#b73cb0","#ba3cb0","#be3caf","#c13dae","#c43dad","#c73dac","#ca3dab","#cd3daa","#d03ea9","#d33ea7","#d53ea6","#d83fa4","#db3fa3","#de3fa1","#e040a0","#e3409e","#e5419c","#e8429a","#ea4298","#ed4396","#ef4494","#f14592","#f34590","#f5468e","#f7478c","#f9488a","#fb4987","#fd4a85","#fe4b83","#ff4d80","#ff4e7e","#ff4f7b","#ff5079","#ff5276","#ff5374","#ff5572","#ff566f","#ff586d","#ff596a","#ff5b68","#ff5d65","#ff5e63","#ff6060","#ff625e","#ff645b","#ff6659","#ff6857","#ff6a54","#ff6c52","#ff6e50","#ff704e","#ff724c","#ff744a","#ff7648","#ff7946","#ff7b44","#ff7d42","#ff8040","#ff823e","#ff843d","#ff873b","#ff893a","#ff8c38","#ff8e37","#fe9136","#fd9334","#fb9633","#f99832","#f89b32","#f69d31","#f4a030","#f2a32f","#f0a52f","#eea82f","#ecaa2e","#eaad2e","#e8b02e","#e6b22e","#e4b52e","#e2b72f","#e0ba2f","#debc30","#dbbf30","#d9c131","#d7c432","#d5c633","#d3c934","#d1cb35","#cece36","#ccd038","#cad239","#c8d53b","#c6d73c","#c4d93e","#c2db40","#c0dd42","#bee044","#bce247","#bae449","#b8e64b","#b6e84e","#b5ea51","#b3eb53","#b1ed56","#b0ef59","#adf05a","#aaf159","#a6f159","#a2f258","#9ef258","#9af357","#96f357","#93f457","#8ff457","#8bf457","#87f557","#83f557","#80f558","#7cf658","#78f659","#74f65a","#71f65b","#6df65c","#6af75d","#66f75e","#63f75f","#5ff761","#5cf662","#59f664","#55f665","#52f667","#4ff669","#4cf56a","#49f56c","#46f46e","#43f470","#41f373","#3ef375","#3bf277","#39f279","#37f17c","#34f07e","#32ef80","#30ee83","#2eed85","#2cec88","#2aeb8a","#28ea8d","#27e98f","#25e892","#24e795","#22e597","#21e49a","#20e29d","#1fe19f","#1edfa2","#1ddea4","#1cdca7","#1bdbaa","#1bd9ac","#1ad7af","#1ad5b1","#1ad4b4","#19d2b6","#19d0b8","#19cebb","#19ccbd","#19cabf","#1ac8c1","#1ac6c4","#1ac4c6","#1bc2c8","#1bbfca","#1cbdcc","#1dbbcd","#1db9cf","#1eb6d1","#1fb4d2","#20b2d4","#21afd5","#22add7","#23abd8","#25a8d9","#26a6db","#27a4dc","#29a1dd","#2a9fdd","#2b9cde","#2d9adf","#2e98e0","#3095e0","#3293e1","#3390e1","#358ee1","#378ce1","#3889e1","#3a87e1","#3c84e1","#3d82e1","#3f80e1","#417de0","#437be0","#4479df","#4676df","#4874de","#4a72dd","#4b70dc","#4d6ddb","#4f6bda","#5169d9","#5267d7","#5465d6","#5663d5","#5761d3","#595fd1","#5a5dd0","#5c5bce","#5d59cc","#5f57ca","#6055c8","#6153c6","#6351c4","#6450c2","#654ec0","#664cbe","#674abb","#6849b9","#6a47b7","#6a46b4","#6b44b2","#6c43af","#6d41ad","#6e40aa"])


        /* AXES */
        // xAxis
        const xAxis = d3.axisBottom(xScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxis)

        // yAxis
        const yAxis = d3.axisLeft(yScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxis)


        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Total State Population")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("height", yScale.bandwidth()) //girth of bars 
            .attr("width", d => xScale(d.TotalPopulationBySex) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScale(d.Statistics))
            .on('mouseover', function(){
                d3.select(this)
                    .attr("fill", d => colorScale(d.TotalPopulationBySex))
            })
            .on("mouseout", function () {  //WHEN MOUSE NOT ON BAR, IT WILL COLORFADE
                d3.select(this)
                    .transition("colorfade")
                    .duration(150)
                    .attr("fill", function (d) {
                        return "rgb(" + Math.round(d.value * 2) + ","
                            + Math.round(d.value * 2) + "," + Math.round(d.value * 2) + ")";
                    })
            })
            //.attr("fill", d => colorScale(d.TotalPopulationBySex))

        // AXIS LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.TotalPopulationBySex.toLocaleString())//returns formatted string - if # then adds commas
            .attr("x", d => xScale(d.TotalPopulationBySex))
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")

        d3.select("#byValue").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.TotalPopulationBySex, b.TotalPopulationBySex)
            })
            x.domain(data.map(d => d.Statistics)) //(d => d.Statistics) replaces (function(d) {return d.Statistics;});
            svg.selectAll(".bar")
                .transition()
                .duration(500)
                .attr("x", function (d, i) {
                    return x(d.Statistics);
                })

            svg.selectAll("labels")
                .transition()
                .duration(500)
                .attr("x", function (d, i) {
                    return x(d.Statistics) + x.bandwidth() / 2;
                })

            svg.selectAll("bars")
                .transition()
                .duration(500)
                .attr("transform", function (d, i) {
                    return "translate(" + (x(d.Statistics) + x.bandwidth() / 2 - 8) + "," + (height + 15) + ")"
                })
        })

    
        //SECOND SVG - MALE POPULATION BY STATE 

        const svgMale = d3.select("#second-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleMale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.MalePop)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScaleMale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // // colorScale
        const colorScaleMale = d3.scaleOrdinal()
            .domain(xScaleMale.domain()) //use xScaleMale domain 
            .range(["#40004b","#42024d","#44034f","#460552","#480754","#4b0856","#4d0a58","#4f0c5a","#510d5c","#530f5f","#551161","#571263","#591465","#5b1667","#5d1869","#5f1a6b","#611c6d","#631d70","#651f72","#672174","#692376","#6b2578","#6d277a","#6e297c","#702b7d","#722e7f","#743081","#753283","#773485","#793787","#7a3989","#7c3b8a","#7e3e8c","#7f408e","#814390","#824591","#844893","#854a95","#874d96","#884f98","#8a5299","#8b549b","#8d579d","#8e599e","#905ca0","#915ea1","#9361a3","#9463a4","#9666a6","#9768a7","#996ba9","#9a6daa","#9b70ac","#9d72ad","#9f74af","#a077b0","#a279b2","#a37bb3","#a57db5","#a680b6","#a882b7","#a984b9","#ab86ba","#ac88bc","#ae8bbd","#af8dbe","#b18fc0","#b391c1","#b493c2","#b695c4","#b797c5","#b999c6","#ba9bc8","#bc9dc9","#bd9fca","#bfa1cb","#c1a3cd","#c2a5ce","#c4a7cf","#c5a9d0","#c7abd1","#c8add2","#caafd3","#cbb1d5","#cdb2d6","#ceb4d7","#cfb6d8","#d1b8d9","#d2bada","#d4bcdb","#d5bddc","#d6bfdd","#d8c1de","#d9c3df","#dac5e0","#dbc6e0","#ddc8e1","#decae2","#dfcbe3","#e0cde4","#e1cfe5","#e2d0e6","#e4d2e6","#e5d4e7","#e6d5e8","#e6d7e9","#e7d8e9","#e8daea","#e9dbeb","#eaddeb","#ebdeec","#ebe0ec","#ece1ed","#ede2ed","#ede3ee","#eee5ee","#eee6ef","#efe7ef","#efe8ef","#efe9ef","#f0eaf0","#f0ebf0","#f0ecf0","#f0edf0","#f0eeef","#f0eeef","#f0efef","#eff0ef","#eff0ee","#eff1ee","#eef1ed","#eef2ed","#edf2ec","#edf2eb","#ecf2ea","#ebf2e9","#ebf3e8","#eaf3e7","#e9f3e6","#e8f2e5","#e7f2e4","#e6f2e3","#e5f2e1","#e4f2e0","#e2f2df","#e1f1dd","#e0f1dc","#def1da","#ddf0d9","#dcf0d7","#daefd6","#d9efd4","#d7eed2","#d6eed1","#d4edcf","#d2edcd","#d1eccb","#cfebc9","#cdebc8","#cbeac6","#cae9c4","#c8e9c2","#c6e8c0","#c4e7be","#c2e6bc","#c0e5ba","#bee4b8","#bce4b6","#bae3b4","#b8e2b2","#b6e1b0","#b3e0ae","#b1dfac","#afdeaa","#addca8","#aadba6","#a8daa4","#a6d9a1","#a3d89f","#a1d69d","#9ed59b","#9bd498","#99d296","#96d194","#94cf91","#91ce8f","#8ecc8d","#8ccb8b","#89c988","#86c886","#83c684","#80c481","#7ec37f","#7bc17d","#78bf7a","#75bd78","#72bc76","#70ba74","#6db871","#6ab66f","#67b46d","#64b26b","#62b069","#5fae67","#5cad65","#59ab62","#57a960","#54a75e","#51a55d","#4fa35b","#4ca159","#4a9f57","#479d55","#459b53","#429951","#409650","#3d944e","#3b924c","#39904b","#368e49","#348c47","#328a46","#308844","#2e8643","#2c8441","#298240","#28803e","#267e3d","#247b3b","#22793a","#207739","#1e7537","#1d7336","#1b7135","#1a6f33","#186d32","#176b31","#156930","#14672e","#12652d","#11632c","#10612b","#0f5f2a","#0d5d28","#0c5a27","#0b5826","#0a5625","#095424","#085223","#065022","#054e21","#044c1f","#034a1e","#02481d","#01461c","#00441b"])


        /* AXES */
        // xAxis
        const xAxisMale = d3.axisBottom(xScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxisMale)

        // yAxis
        const yAxisMale = d3.axisLeft(yScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxisMale)


        //ADD CHART TITLE    
        svgMale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Male Population Per State")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svgMale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScaleMale.bandwidth()) //girth of bars 
            .attr("width", d => xScaleMale(d.MalePop) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScaleMale(d.Statistics))
            .attr("fill", d => colorScaleMale(d.MalePop))

        // AXIS LABELS
        svgMale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.MalePop.toLocaleString())
            .attr("x", d => xScaleMale(d.MalePop))
            .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")

        

        //THIRD SVG - FEMALE POPULATION BY STATE
        const svgFemale = d3.select("#third-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleFemale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.FemalePop)]) //d3 max = function expecting an array - can pass in an accessor function
            .range([margin, width - margin])


        // yScale
        const yScaleFemale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([height - margin, margin])
            .paddingInner(.5)

        // colorScale
        const colorScaleFemale = d3.scaleOrdinal()
            .domain(xScaleFemale.domain())
            .range(["#ff4040","#ff423d","#ff453a","#ff4838","#fe4b35","#fe4e33","#fe5130","#fd542e","#fd572b","#fc5a29","#fb5d27","#fa6025","#f96322","#f96620","#f7691e","#f66c1c","#f56f1a","#f47218","#f37517","#f17815","#f07c13","#ee7f11","#ed8210","#eb850e","#e9880d","#e88b0c","#e68e0a","#e49209","#e29508","#e09807","#de9b06","#dc9e05","#d9a104","#d7a403","#d5a703","#d2aa02","#d0ad02","#ceb001","#cbb301","#c9b600","#c6b800","#c3bb00","#c1be00","#bec100","#bbc300","#b8c600","#b6c900","#b3cb01","#b0ce01","#add002","#aad202","#a7d503","#a4d703","#a1d904","#9edc05","#9bde06","#98e007","#95e208","#92e409","#8ee60a","#8be80c","#88e90d","#85eb0e","#82ed10","#7fee11","#7cf013","#78f115","#75f317","#72f418","#6ff51a","#6cf61c","#69f71e","#66f920","#63f922","#60fa25","#5dfb27","#5afc29","#57fd2b","#54fd2e","#51fe30","#4efe33","#4bfe35","#48ff38","#45ff3a","#42ff3d","#40ff40","#3dff42","#3aff45","#38ff48","#35fe4b","#33fe4e","#30fe51","#2efd54","#2bfd57","#29fc5a","#27fb5d","#25fa60","#22f963","#20f966","#1ef769","#1cf66c","#1af56f","#18f472","#17f375","#15f178","#13f07c","#11ee7f","#10ed82","#0eeb85","#0de988","#0ce88b","#0ae68e","#09e492","#08e295","#07e098","#06de9b","#05dc9e","#04d9a1","#03d7a4","#03d5a7","#02d2aa","#02d0ad","#01ceb0","#01cbb3","#00c9b6","#00c6b8","#00c3bb","#00c1be","#00bec1","#00bbc3","#00b8c6","#00b6c9","#01b3cb","#01b0ce","#02add0","#02aad2","#03a7d5","#03a4d7","#04a1d9","#059edc","#069bde","#0798e0","#0895e2","#0992e4","#0a8ee6","#0c8be8","#0d88e9","#0e85eb","#1082ed","#117fee","#137cf0","#1578f1","#1775f3","#1872f4","#1a6ff5","#1c6cf6","#1e69f7","#2066f9","#2263f9","#2560fa","#275dfb","#295afc","#2b57fd","#2e54fd","#3051fe","#334efe","#354bfe","#3848ff","#3a45ff","#3d42ff","#4040ff","#423dff","#453aff","#4838ff","#4b35fe","#4e33fe","#5130fe","#542efd","#572bfd","#5a29fc","#5d27fb","#6025fa","#6322f9","#6620f9","#691ef7","#6c1cf6","#6f1af5","#7218f4","#7517f3","#7815f1","#7c13f0","#7f11ee","#8210ed","#850eeb","#880de9","#8b0ce8","#8e0ae6","#9209e4","#9508e2","#9807e0","#9b06de","#9e05dc","#a104d9","#a403d7","#a703d5","#aa02d2","#ad02d0","#b001ce","#b301cb","#b600c9","#b800c6","#bb00c3","#be00c1","#c100be","#c300bb","#c600b8","#c900b6","#cb01b3","#ce01b0","#d002ad","#d202aa","#d503a7","#d703a4","#d904a1","#dc059e","#de069b","#e00798","#e20895","#e40992","#e60a8e","#e80c8b","#e90d88","#eb0e85","#ed1082","#ee117f","#f0137c","#f11578","#f31775","#f41872","#f51a6f","#f61c6c","#f71e69","#f92066","#f92263","#fa2560","#fb275d","#fc295a","#fd2b57","#fd2e54","#fe3051","#fe334e","#fe354b","#ff3848","#ff3a45","#ff3d42","#ff4040"])


        /* AXES */
        // xAxis
        const xAxisFemale = d3.axisBottom(xScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //works - xAxis shows at bottom
            .call(xAxisFemale)

        // yAxis
        const yAxisFemale = d3.axisLeft(yScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`) //moves the yAxis over 60px, 0 
            .call(yAxisFemale)


        //ADD CHART TITLE    
        svgFemale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16) //higher the denominator, higher the text moves up pg
            .attr("text-anchor", "middle")
            .text("Female Population Per State")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BARS
        svgFemale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("height", yScaleFemale.bandwidth()) //girth of bars 
            .attr("width", d => xScaleFemale(d.FemalePop) - margin) //=> shorthand for function - must return a value
            .attr("x", d => margin) //bars will start at the margin
            .attr("y", d => yScaleFemale(d.Statistics))
            .attr("fill", d => colorScaleFemale(d.FemalePop))

        // AXIS LABELS
        svgFemale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.FemalePop.toLocaleString())
            .attr("x", d => xScaleFemale(d.FemalePop))
            .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1) //dividing by 2 puts the count the middle of the bar
            .attr("class", "labels")
            .style("font-size", "10px")    
        
    })