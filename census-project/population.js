/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;



/* LOAD DATA */
d3.csv('../data/census_states_pcts.csv', d3.autoType)
    .then(data => {
        console.log("data", data) //"data" is name that will be shown in console log - could be anything


        /* HTML ELEMENTS */
        // APPEND SVG - requires width & height
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.TotalEmpStat_Employed)]) //0 - what ever max value of this variable is 
            .range([margin, width - margin]) //starts from 0 to max width - margin


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics)) //domain is all the states
            .range([margin, height - margin]) //flipped this so ordered alphabetically - SVG height starts at top left and goes down
            .paddingInner(.5) //width of bar

        // colorScale
        const colorScale = d3.scaleOrdinal()
            .domain(xScale.domain()) //use xScale domain - color by the emp pop amt
            .range(["#23171b", "#271a28", "#2b1c33", "#2f1e3f", "#32204a", "#362354", "#39255f", "#3b2768", "#3e2a72", "#402c7b", "#422f83", "#44318b", "#453493", "#46369b", "#4839a2", "#493ca8", "#493eaf", "#4a41b5", "#4a44bb", "#4b46c0", "#4b49c5", "#4b4cca", "#4b4ecf", "#4b51d3", "#4a54d7", "#4a56db", "#4959de", "#495ce2", "#485fe5", "#4761e7", "#4664ea", "#4567ec", "#446aee", "#446df0", "#426ff2", "#4172f3", "#4075f5", "#3f78f6", "#3e7af7", "#3d7df7", "#3c80f8", "#3a83f9", "#3985f9", "#3888f9", "#378bf9", "#368df9", "#3590f8", "#3393f8", "#3295f7", "#3198f7", "#309bf6", "#2f9df5", "#2ea0f4", "#2da2f3", "#2ca5f1", "#2ba7f0", "#2aaaef", "#2aaced", "#29afec", "#28b1ea", "#28b4e8", "#27b6e6", "#27b8e5", "#26bbe3", "#26bde1", "#26bfdf", "#25c1dc", "#25c3da", "#25c6d8", "#25c8d6", "#25cad3", "#25ccd1", "#25cecf", "#26d0cc", "#26d2ca", "#26d4c8", "#27d6c5", "#27d8c3", "#28d9c0", "#29dbbe", "#29ddbb", "#2adfb8", "#2be0b6", "#2ce2b3", "#2de3b1", "#2ee5ae", "#30e6ac", "#31e8a9", "#32e9a6", "#34eba4", "#35eca1", "#37ed9f", "#39ef9c", "#3af09a", "#3cf197", "#3ef295", "#40f392", "#42f490", "#44f58d", "#46f68b", "#48f788", "#4af786", "#4df884", "#4ff981", "#51fa7f", "#54fa7d", "#56fb7a", "#59fb78", "#5cfc76", "#5efc74", "#61fd71", "#64fd6f", "#66fd6d", "#69fd6b", "#6cfd69", "#6ffe67", "#72fe65", "#75fe63", "#78fe61", "#7bfe5f", "#7efd5d", "#81fd5c", "#84fd5a", "#87fd58", "#8afc56", "#8dfc55", "#90fb53", "#93fb51", "#96fa50", "#99fa4e", "#9cf94d", "#9ff84b", "#a2f84a", "#a6f748", "#a9f647", "#acf546", "#aff444", "#b2f343", "#b5f242", "#b8f141", "#bbf03f", "#beef3e", "#c1ed3d", "#c3ec3c", "#c6eb3b", "#c9e93a", "#cce839", "#cfe738", "#d1e537", "#d4e336", "#d7e235", "#d9e034", "#dcdf33", "#dedd32", "#e0db32", "#e3d931", "#e5d730", "#e7d52f", "#e9d42f", "#ecd22e", "#eed02d", "#f0ce2c", "#f1cb2c", "#f3c92b", "#f5c72b", "#f7c52a", "#f8c329", "#fac029", "#fbbe28", "#fdbc28", "#feb927", "#ffb727", "#ffb526", "#ffb226", "#ffb025", "#ffad25", "#ffab24", "#ffa824", "#ffa623", "#ffa323", "#ffa022", "#ff9e22", "#ff9b21", "#ff9921", "#ff9621", "#ff9320", "#ff9020", "#ff8e1f", "#ff8b1f", "#ff881e", "#ff851e", "#ff831d", "#ff801d", "#ff7d1d", "#ff7a1c", "#ff781c", "#ff751b", "#ff721b", "#ff6f1a", "#fd6c1a", "#fc6a19", "#fa6719", "#f96418", "#f76118", "#f65f18", "#f45c17", "#f25916", "#f05716", "#ee5415", "#ec5115", "#ea4f14", "#e84c14", "#e64913", "#e44713", "#e24412", "#df4212", "#dd3f11", "#da3d10", "#d83a10", "#d5380f", "#d3360f", "#d0330e", "#ce310d", "#cb2f0d", "#c92d0c", "#c62a0b", "#c3280b", "#c1260a", "#be2409", "#bb2309", "#b92108", "#b61f07", "#b41d07", "#b11b06", "#af1a05", "#ac1805", "#aa1704", "#a81604", "#a51403", "#a31302", "#a11202", "#9f1101", "#9d1000", "#9b0f00", "#9a0e00", "#980e00", "#960d00", "#950c00", "#940c00", "#930c00", "#920c00", "#910b00", "#910c00", "#900c00", "#900c00", "#900c00"])


        /* AXES */
        // xAxis - requires appending "g", class = axis & positioning
        const xAxis = d3.axisBottom(xScale) //xScale appears on bottom using xScale values 
        svg.append("g") //g needed for axis
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`) //moves it to the bottom
            .call(xAxis) //must always call the axis for it to display 

        // yAxis
        const yAxis = d3.axisLeft(yScale) //axis will be on the left using yScale
        svg.append("g") //must have .append("g")
            .attr("class", "axis") //need class axis
            .attr("transform", `translate(${margin},0)`) //move it to the left
            .call(yAxis) //must always call the axis for it to display


        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("class", "title") //4th J bro
            .attr("x", width / 2) //how far it stretches out
            .attr("y", height / 16) //how high is it above the chart
            .attr("text-anchor", "middle") //text in middle
            .text("Total Employed Civilian Population % Ages 16 and Up")
            .style("font-size", "24px")
            .attr("fill", "darkcyan")


        // AXIS LABELS
        svg.selectAll("labels") //select all Labels
            .data(data) //join the data
            .enter()
            .append("text") //.enter().append("text") = .join("text")
            .attr("class", "labels") //class name
            .text(d => d.TotalEmpStat_Employed.toLocaleString(undefined, {
                style: "percent"})) //toLocaleString() will convert #s to easily readable #s (w/ commas) - style percent will convert it - https://observablehq.com/@mbostock/number-formatting
            .attr("x", d => xScale(d.TotalEmpStat_Employed)) //produce the value of total emp civ pop
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1) //positions value by the bar - need the bandwidth()
            .style("font-size", "10px")

        // BARS
        svg.selectAll("rect")
            .data(data) //add the data
            .enter()
            .append("rect") //.enter().append('rect') = .join("rect")
            //.join("rect")
            .attr("class", "bar") //4th J bro is important
            .attr("height", yScale.bandwidth()) //how height the bar is
            .attr("width", d => xScale(d.TotalEmpStat_Employed) - margin) //extends as long as the value is on the scale
            .attr("x", d => margin) //starts at margin
            .attr("y", d => yScale(d.Statistics)) //matches the states
            .attr("fill", d => colorScale(d.TotalEmpStat_Employed)) //assigns color palette to the bar
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScale(d.TotalEmpStat_Employed))
            }) //when mouseover the bars, it will show this color
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade") //this is the transition
                    .delay(100) //how fast the transition happens
                    .attr("fill", "darkgoldenrod")
            }) //when mouse out, it will fad out to this color
            .append("title") //adding the tooltip
            .text(d => (d.TotalEmpStat_Employed.toLocaleString(undefined, {style: "percent"}) + " of " + d.Statistics + " total pop 16+ is employed ")) //tooltip displays this statement - CA employed pop is value (readable value)
            //.text(d => (d.Statistics + " employed population = " + d.TotalEmpStat_Employed.toLocaleString())) //tooltip displays this statement - CA employed pop is value (readable value)



        //Sort by clicking button
        d3.select(".value-sort").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.TotalEmpStat_Employed, b.TotalEmpStat_Employed)
            }) //select the element (button) w/ class .value-sort and when it's clicked, sort the total emp sec values 
            yScale.domain(data.map(function (d) {
                return d.Statistics;
            }));  //need this for the sort to work


            svg.selectAll(".bar") //this originally wasn't selecting anything b/c no class name in .append("rect")
                .transition()
                .duration(700) //how fast the bars will sort descending
                .attr("y", function (d, i) {
                    return yScale(d.Statistics);
                }) //don't add the yScale.bandwidth() b/c then labels & bars don't move together


            svg.selectAll(".labels")
                .transition()
                .duration(700) //how fast labels will move
                .attr("y", function (d, i) {
                    return yScale(d.Statistics) + yScale.bandwidth() / 1;
                }) //helps the labels move in sync w/ the bars 

        })


        //SECOND SVG - MALE POPULATION BY STATE 
        //Requires new variables - svgMale and new div container
        const svgMale = d3.select("#second-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleMale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.MaleEmpStat_Employed)])
            .range([margin, width - margin])


        // yScale
        const yScaleMale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([margin, height - margin])
            .paddingInner(.5)

        // // colorScale
        const colorScaleMale = d3.scaleOrdinal()
            .domain(xScaleMale.domain())
            .range(["#40004b", "#42024d", "#44034f", "#460552", "#480754", "#4b0856", "#4d0a58", "#4f0c5a", "#510d5c", "#530f5f", "#551161", "#571263", "#591465", "#5b1667", "#5d1869", "#5f1a6b", "#611c6d", "#631d70", "#651f72", "#672174", "#692376", "#6b2578", "#6d277a", "#6e297c", "#702b7d", "#722e7f", "#743081", "#753283", "#773485", "#793787", "#7a3989", "#7c3b8a", "#7e3e8c", "#7f408e", "#814390", "#824591", "#844893", "#854a95", "#874d96", "#884f98", "#8a5299", "#8b549b", "#8d579d", "#8e599e", "#905ca0", "#915ea1", "#9361a3", "#9463a4", "#9666a6", "#9768a7", "#996ba9", "#9a6daa", "#9b70ac", "#9d72ad", "#9f74af", "#a077b0", "#a279b2", "#a37bb3", "#a57db5", "#a680b6", "#a882b7", "#a984b9", "#ab86ba", "#ac88bc", "#ae8bbd", "#af8dbe", "#b18fc0", "#b391c1", "#b493c2", "#b695c4", "#b797c5", "#b999c6", "#ba9bc8", "#bc9dc9", "#bd9fca", "#bfa1cb", "#c1a3cd", "#c2a5ce", "#c4a7cf", "#c5a9d0", "#c7abd1", "#c8add2", "#caafd3", "#cbb1d5", "#cdb2d6", "#ceb4d7", "#cfb6d8", "#d1b8d9", "#d2bada", "#d4bcdb", "#d5bddc", "#d6bfdd", "#d8c1de", "#d9c3df", "#dac5e0", "#dbc6e0", "#ddc8e1", "#decae2", "#dfcbe3", "#e0cde4", "#e1cfe5", "#e2d0e6", "#e4d2e6", "#e5d4e7", "#e6d5e8", "#e6d7e9", "#e7d8e9", "#e8daea", "#e9dbeb", "#eaddeb", "#ebdeec", "#ebe0ec", "#ece1ed", "#ede2ed", "#ede3ee", "#eee5ee", "#eee6ef", "#efe7ef", "#efe8ef", "#efe9ef", "#f0eaf0", "#f0ebf0", "#f0ecf0", "#f0edf0", "#f0eeef", "#f0eeef", "#f0efef", "#eff0ef", "#eff0ee", "#eff1ee", "#eef1ed", "#eef2ed", "#edf2ec", "#edf2eb", "#ecf2ea", "#ebf2e9", "#ebf3e8", "#eaf3e7", "#e9f3e6", "#e8f2e5", "#e7f2e4", "#e6f2e3", "#e5f2e1", "#e4f2e0", "#e2f2df", "#e1f1dd", "#e0f1dc", "#def1da", "#ddf0d9", "#dcf0d7", "#daefd6", "#d9efd4", "#d7eed2", "#d6eed1", "#d4edcf", "#d2edcd", "#d1eccb", "#cfebc9", "#cdebc8", "#cbeac6", "#cae9c4", "#c8e9c2", "#c6e8c0", "#c4e7be", "#c2e6bc", "#c0e5ba", "#bee4b8", "#bce4b6", "#bae3b4", "#b8e2b2", "#b6e1b0", "#b3e0ae", "#b1dfac", "#afdeaa", "#addca8", "#aadba6", "#a8daa4", "#a6d9a1", "#a3d89f", "#a1d69d", "#9ed59b", "#9bd498", "#99d296", "#96d194", "#94cf91", "#91ce8f", "#8ecc8d", "#8ccb8b", "#89c988", "#86c886", "#83c684", "#80c481", "#7ec37f", "#7bc17d", "#78bf7a", "#75bd78", "#72bc76", "#70ba74", "#6db871", "#6ab66f", "#67b46d", "#64b26b", "#62b069", "#5fae67", "#5cad65", "#59ab62", "#57a960", "#54a75e", "#51a55d", "#4fa35b", "#4ca159", "#4a9f57", "#479d55", "#459b53", "#429951", "#409650", "#3d944e", "#3b924c", "#39904b", "#368e49", "#348c47", "#328a46", "#308844", "#2e8643", "#2c8441", "#298240", "#28803e", "#267e3d", "#247b3b", "#22793a", "#207739", "#1e7537", "#1d7336", "#1b7135", "#1a6f33", "#186d32", "#176b31", "#156930", "#14672e", "#12652d", "#11632c", "#10612b", "#0f5f2a", "#0d5d28", "#0c5a27", "#0b5826", "#0a5625", "#095424", "#085223", "#065022", "#054e21", "#044c1f", "#034a1e", "#02481d", "#01461c", "#00441b"])


        /* AXES */
        // xAxis
        const xAxisMale = d3.axisBottom(xScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`)
            .call(xAxisMale)

        // yAxis
        const yAxisMale = d3.axisLeft(yScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`)
            .call(yAxisMale)


        //ADD CHART TITLE    
        svgMale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16)
            .attr("text-anchor", "middle")
            .text("Male Employed Civilian Population % Ages 16 and Up")
            .style("font-size", "24px")
            .attr("fill", "darkcyan")

        // AXIS LABELS
        svgMale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.MaleEmpStat_Employed.toLocaleString(undefined, {
                style: "percent"}))
            .attr("x", d => xScaleMale(d.MaleEmpStat_Employed))
            .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 1)
            .attr("class", "labels")
            .style("font-size", "10px")


        // BARS
        svgMale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("class", "bar-two") //4th J - give distinct class
            .attr("height", yScaleMale.bandwidth())
            .attr("width", d => xScaleMale(d.MaleEmpStat_Employed) - margin)
            .attr("x", d => margin)
            .attr("y", d => yScaleMale(d.Statistics))
            .attr("fill", d => colorScaleMale(d.MaleEmpStat_Employed))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScaleMale(d.MaleEmpStat_Employed))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", "darkblue")
            })
            .append("title")
            .text(d => (d.MaleEmpStat_Employed.toLocaleString(undefined, {
                style: "percent"}) + " of " + d.Statistics + " males employed ")) //decimal stateName males employed 


        //Sort by clicking button
        d3.select(".value-sort-male").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.MaleEmpStat_Employed, b.MaleEmpStat_Employed);
            })
            yScaleMale.domain(data.map(d => d.Statistics))

            svgMale.selectAll(".bar-two") //select the bars in the 2nd chart
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScaleMale(d.Statistics);
                })


            svgMale.selectAll(".labels")
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 1;
                })
        })




        //THIRD SVG - FEMALE POPULATION BY STATE
        const svgFemale = d3.select("#third-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleFemale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.FemEmpStat_Employed)])
            .range([margin, width - margin])


        // yScale
        const yScaleFemale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([margin, height - margin])
            .paddingInner(.5)

        // colorScale
        const colorScaleFemale = d3.scaleOrdinal()
            .domain(xScaleFemale.domain())
            .range(["#ff4040", "#ff423d", "#ff453a", "#ff4838", "#fe4b35", "#fe4e33", "#fe5130", "#fd542e", "#fd572b", "#fc5a29", "#fb5d27", "#fa6025", "#f96322", "#f96620", "#f7691e", "#f66c1c", "#f56f1a", "#f47218", "#f37517", "#f17815", "#f07c13", "#ee7f11", "#ed8210", "#eb850e", "#e9880d", "#e88b0c", "#e68e0a", "#e49209", "#e29508", "#e09807", "#de9b06", "#dc9e05", "#d9a104", "#d7a403", "#d5a703", "#d2aa02", "#d0ad02", "#ceb001", "#cbb301", "#c9b600", "#c6b800", "#c3bb00", "#c1be00", "#bec100", "#bbc300", "#b8c600", "#b6c900", "#b3cb01", "#b0ce01", "#add002", "#aad202", "#a7d503", "#a4d703", "#a1d904", "#9edc05", "#9bde06", "#98e007", "#95e208", "#92e409", "#8ee60a", "#8be80c", "#88e90d", "#85eb0e", "#82ed10", "#7fee11", "#7cf013", "#78f115", "#75f317", "#72f418", "#6ff51a", "#6cf61c", "#69f71e", "#66f920", "#63f922", "#60fa25", "#5dfb27", "#5afc29", "#57fd2b", "#54fd2e", "#51fe30", "#4efe33", "#4bfe35", "#48ff38", "#45ff3a", "#42ff3d", "#40ff40", "#3dff42", "#3aff45", "#38ff48", "#35fe4b", "#33fe4e", "#30fe51", "#2efd54", "#2bfd57", "#29fc5a", "#27fb5d", "#25fa60", "#22f963", "#20f966", "#1ef769", "#1cf66c", "#1af56f", "#18f472", "#17f375", "#15f178", "#13f07c", "#11ee7f", "#10ed82", "#0eeb85", "#0de988", "#0ce88b", "#0ae68e", "#09e492", "#08e295", "#07e098", "#06de9b", "#05dc9e", "#04d9a1", "#03d7a4", "#03d5a7", "#02d2aa", "#02d0ad", "#01ceb0", "#01cbb3", "#00c9b6", "#00c6b8", "#00c3bb", "#00c1be", "#00bec1", "#00bbc3", "#00b8c6", "#00b6c9", "#01b3cb", "#01b0ce", "#02add0", "#02aad2", "#03a7d5", "#03a4d7", "#04a1d9", "#059edc", "#069bde", "#0798e0", "#0895e2", "#0992e4", "#0a8ee6", "#0c8be8", "#0d88e9", "#0e85eb", "#1082ed", "#117fee", "#137cf0", "#1578f1", "#1775f3", "#1872f4", "#1a6ff5", "#1c6cf6", "#1e69f7", "#2066f9", "#2263f9", "#2560fa", "#275dfb", "#295afc", "#2b57fd", "#2e54fd", "#3051fe", "#334efe", "#354bfe", "#3848ff", "#3a45ff", "#3d42ff", "#4040ff", "#423dff", "#453aff", "#4838ff", "#4b35fe", "#4e33fe", "#5130fe", "#542efd", "#572bfd", "#5a29fc", "#5d27fb", "#6025fa", "#6322f9", "#6620f9", "#691ef7", "#6c1cf6", "#6f1af5", "#7218f4", "#7517f3", "#7815f1", "#7c13f0", "#7f11ee", "#8210ed", "#850eeb", "#880de9", "#8b0ce8", "#8e0ae6", "#9209e4", "#9508e2", "#9807e0", "#9b06de", "#9e05dc", "#a104d9", "#a403d7", "#a703d5", "#aa02d2", "#ad02d0", "#b001ce", "#b301cb", "#b600c9", "#b800c6", "#bb00c3", "#be00c1", "#c100be", "#c300bb", "#c600b8", "#c900b6", "#cb01b3", "#ce01b0", "#d002ad", "#d202aa", "#d503a7", "#d703a4", "#d904a1", "#dc059e", "#de069b", "#e00798", "#e20895", "#e40992", "#e60a8e", "#e80c8b", "#e90d88", "#eb0e85", "#ed1082", "#ee117f", "#f0137c", "#f11578", "#f31775", "#f41872", "#f51a6f", "#f61c6c", "#f71e69", "#f92066", "#f92263", "#fa2560", "#fb275d", "#fc295a", "#fd2b57", "#fd2e54", "#fe3051", "#fe334e", "#fe354b", "#ff3848", "#ff3a45", "#ff3d42", "#ff4040"])


        /* AXES */
        // xAxis
        const xAxisFemale = d3.axisBottom(xScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`)
            .call(xAxisFemale)

        // yAxis
        const yAxisFemale = d3.axisLeft(yScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},0)`)
            .call(yAxisFemale)


        //ADD CHART TITLE    
        svgFemale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16)
            .attr("text-anchor", "middle")
            .text("Female Employed Civilian Population % Ages 16 and Up")
            .style("font-size", "24px")
            .attr("fill", "darkcyan")

        // AXIS LABELS
        svgFemale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.FemEmpStat_Employed.toLocaleString(undefined, {style: "percent"}))
            .attr("x", d => xScaleFemale(d.FemEmpStat_Employed))
            .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1)
            .attr("class", "labels")
            .style("font-size", "10px")


        // BARS
        svgFemale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("class", "bar-three") //4th J bro - give distinct class name
            .attr("height", yScaleFemale.bandwidth())
            .attr("width", d => xScaleFemale(d.FemEmpStat_Employed) - margin)
            .attr("x", d => margin)
            .attr("y", d => yScaleFemale(d.Statistics))
            .attr("fill", d => colorScaleFemale(d.FemEmpStat_Employed))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScaleFemale(d.FemEmpStat_Employed))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", "darkred")
            })
            .append("title")
            .text(d => (d.FemEmpStat_Employed.toLocaleString(undefined, {style: "percent"}) + " of " + d.Statistics + " females employed "))

        //Sort by clicking button
        d3.select(".value-sort-female").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.FemEmpStat_Employed, b.FemEmpStat_Employed);
            })
            yScaleFemale.domain(data.map(d => d.Statistics))

            svgFemale.selectAll(".bar-three") //target these bars in 3rd chart
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScaleFemale(d.Statistics);
                })


            svgFemale.selectAll(".labels")
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1;
                })
        })

    })