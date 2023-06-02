/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 1050;
margin = 100;



/* LOAD DATA */
d3.csv('../data/census_four.csv', d3.autoType)
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
            .domain([0, d3.max(data, d => d.TotalEmpSec_EmployedCivilianPop16YearsandOver)])
            .range([margin, width - margin])


        // yScale
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.Statistics))
            .range([margin, height - margin])
            .paddingInner(.5)

        // colorScale
        const colorScale = d3.scaleOrdinal()
            .domain(xScale.domain())
            .range(["#23171b", "#271a28", "#2b1c33", "#2f1e3f", "#32204a", "#362354", "#39255f", "#3b2768", "#3e2a72", "#402c7b", "#422f83", "#44318b", "#453493", "#46369b", "#4839a2", "#493ca8", "#493eaf", "#4a41b5", "#4a44bb", "#4b46c0", "#4b49c5", "#4b4cca", "#4b4ecf", "#4b51d3", "#4a54d7", "#4a56db", "#4959de", "#495ce2", "#485fe5", "#4761e7", "#4664ea", "#4567ec", "#446aee", "#446df0", "#426ff2", "#4172f3", "#4075f5", "#3f78f6", "#3e7af7", "#3d7df7", "#3c80f8", "#3a83f9", "#3985f9", "#3888f9", "#378bf9", "#368df9", "#3590f8", "#3393f8", "#3295f7", "#3198f7", "#309bf6", "#2f9df5", "#2ea0f4", "#2da2f3", "#2ca5f1", "#2ba7f0", "#2aaaef", "#2aaced", "#29afec", "#28b1ea", "#28b4e8", "#27b6e6", "#27b8e5", "#26bbe3", "#26bde1", "#26bfdf", "#25c1dc", "#25c3da", "#25c6d8", "#25c8d6", "#25cad3", "#25ccd1", "#25cecf", "#26d0cc", "#26d2ca", "#26d4c8", "#27d6c5", "#27d8c3", "#28d9c0", "#29dbbe", "#29ddbb", "#2adfb8", "#2be0b6", "#2ce2b3", "#2de3b1", "#2ee5ae", "#30e6ac", "#31e8a9", "#32e9a6", "#34eba4", "#35eca1", "#37ed9f", "#39ef9c", "#3af09a", "#3cf197", "#3ef295", "#40f392", "#42f490", "#44f58d", "#46f68b", "#48f788", "#4af786", "#4df884", "#4ff981", "#51fa7f", "#54fa7d", "#56fb7a", "#59fb78", "#5cfc76", "#5efc74", "#61fd71", "#64fd6f", "#66fd6d", "#69fd6b", "#6cfd69", "#6ffe67", "#72fe65", "#75fe63", "#78fe61", "#7bfe5f", "#7efd5d", "#81fd5c", "#84fd5a", "#87fd58", "#8afc56", "#8dfc55", "#90fb53", "#93fb51", "#96fa50", "#99fa4e", "#9cf94d", "#9ff84b", "#a2f84a", "#a6f748", "#a9f647", "#acf546", "#aff444", "#b2f343", "#b5f242", "#b8f141", "#bbf03f", "#beef3e", "#c1ed3d", "#c3ec3c", "#c6eb3b", "#c9e93a", "#cce839", "#cfe738", "#d1e537", "#d4e336", "#d7e235", "#d9e034", "#dcdf33", "#dedd32", "#e0db32", "#e3d931", "#e5d730", "#e7d52f", "#e9d42f", "#ecd22e", "#eed02d", "#f0ce2c", "#f1cb2c", "#f3c92b", "#f5c72b", "#f7c52a", "#f8c329", "#fac029", "#fbbe28", "#fdbc28", "#feb927", "#ffb727", "#ffb526", "#ffb226", "#ffb025", "#ffad25", "#ffab24", "#ffa824", "#ffa623", "#ffa323", "#ffa022", "#ff9e22", "#ff9b21", "#ff9921", "#ff9621", "#ff9320", "#ff9020", "#ff8e1f", "#ff8b1f", "#ff881e", "#ff851e", "#ff831d", "#ff801d", "#ff7d1d", "#ff7a1c", "#ff781c", "#ff751b", "#ff721b", "#ff6f1a", "#fd6c1a", "#fc6a19", "#fa6719", "#f96418", "#f76118", "#f65f18", "#f45c17", "#f25916", "#f05716", "#ee5415", "#ec5115", "#ea4f14", "#e84c14", "#e64913", "#e44713", "#e24412", "#df4212", "#dd3f11", "#da3d10", "#d83a10", "#d5380f", "#d3360f", "#d0330e", "#ce310d", "#cb2f0d", "#c92d0c", "#c62a0b", "#c3280b", "#c1260a", "#be2409", "#bb2309", "#b92108", "#b61f07", "#b41d07", "#b11b06", "#af1a05", "#ac1805", "#aa1704", "#a81604", "#a51403", "#a31302", "#a11202", "#9f1101", "#9d1000", "#9b0f00", "#9a0e00", "#980e00", "#960d00", "#950c00", "#940c00", "#930c00", "#920c00", "#910b00", "#910c00", "#900c00", "#900c00", "#900c00"])

        const colorScaleTwo = d3.scaleOrdinal()
            .domain(xScale.domain())
            .range(["#543005","#563105","#583305","#5b3406","#5d3506","#5f3606","#613806","#633906","#663a07","#683c07","#6a3d07","#6c3e08","#6e4008","#704108","#734309","#754409","#774509","#79470a","#7b480a","#7d4a0b","#804b0b","#824d0c","#844e0d","#86500d","#88510e","#8a530f","#8c540f","#8e5610","#905811","#925912","#955b13","#975d14","#995e15","#9b6016","#9d6217","#9f6419","#a1651a","#a3671b","#a5691d","#a66b1e","#a86d20","#aa6f21","#ac7123","#ae7325","#b07526","#b27728","#b3792a","#b57b2c","#b77d2e","#b97f30","#ba8232","#bc8435","#bd8637","#bf8839","#c18b3c","#c28d3e","#c48f41","#c59243","#c79446","#c89648","#c9994b","#cb9b4e","#cc9d51","#cda054","#cfa256","#d0a459","#d1a75c","#d3a95f","#d4ab62","#d5ad65","#d6b068","#d7b26b","#d8b46e","#dab671","#dbb874","#dcba77","#ddbc7a","#debf7d","#dfc080","#e0c283","#e1c486","#e2c688","#e3c88b","#e4ca8e","#e5cb91","#e6cd94","#e7cf96","#e8d099","#e9d29c","#ead49f","#ead5a1","#ebd6a4","#ecd8a7","#edd9a9","#eddbac","#eedcae","#efddb1","#efdeb4","#f0e0b6","#f1e1b8","#f1e2bb","#f2e3bd","#f2e4c0","#f2e5c2","#f3e6c4","#f3e7c7","#f3e8c9","#f4e8cb","#f4e9cd","#f4eacf","#f4ebd1","#f4ebd3","#f4ecd5","#f4edd7","#f4edd9","#f4eedb","#f4eedc","#f4efde","#f3efdf","#f3efe1","#f3f0e2","#f2f0e4","#f2f0e5","#f1f0e6","#f0f1e7","#f0f1e8","#eff1e9","#eef1ea","#edf1ea","#ecf1eb","#ebf1eb","#eaf1ec","#e9f1ec","#e7f1ec","#e6f0ec","#e5f0ec","#e3f0ec","#e2f0ec","#e0efec","#dfefec","#ddefeb","#dbeeeb","#d9eeea","#d8edea","#d6ede9","#d4ece9","#d2ece8","#d0ebe7","#ceebe6","#cceae5","#cae9e5","#c7e9e4","#c5e8e3","#c3e7e2","#c1e6e1","#bee5e0","#bce5de","#b9e4dd","#b7e3dc","#b4e2db","#b2e1da","#afe0d9","#addfd7","#aaded6","#a8ddd5","#a5dbd3","#a2dad2","#a0d9d1","#9dd8cf","#9ad7ce","#97d5cc","#95d4cb","#92d3c9","#8fd1c8","#8cd0c6","#89cec4","#86cdc3","#84cbc1","#81cac0","#7ec8be","#7bc6bc","#78c5ba","#75c3b9","#72c1b7","#70bfb5","#6dbeb3","#6abcb1","#67bab0","#64b8ae","#61b6ac","#5eb4aa","#5cb2a8","#59b0a6","#56aea4","#53aca3","#50aaa1","#4ea89f","#4ba69d","#48a49b","#46a299","#43a097","#409e95","#3e9c93","#3b9a91","#39988f","#36968d","#34948b","#329289","#2f9087","#2d8e85","#2b8c84","#288a82","#268880","#24867e","#22847c","#20827a","#1e8078","#1c7e76","#1a7c74","#187a72","#177970","#15776e","#13756d","#12736b","#107169","#0f6f67","#0e6d65","#0c6c63","#0b6a61","#0a685f","#09665e","#08655c","#07635a","#066158","#065f56","#055e54","#045c52","#045a51","#03584f","#03574d","#02554b","#025349","#025248","#015046","#014e44","#014d42","#014b40","#01493e","#00483d","#00463b","#004439","#004337","#004135","#003f34","#003e32","#003c30"])

        /* AXES */
        // xAxis
        const xAxis = d3.axisBottom(xScale)
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`)
            .call(xAxis)

         //REMOVE THE Y-AXIS SO IT DOES NOT INTERFERE WITH THE SORTING
        // yAxis
        // const yAxis = d3.axisLeft(yScale)
        // svg.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", `translate(${margin},0)`)
        //     .call(yAxis)


        //ADD CHART TITLE    
        svg
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16)
            .attr("text-anchor", "middle")
            .text("Total Employed Civilian Population 16 and Up")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")


        // BAR LABELS
        svg.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(d => d.TotalEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString())
            .attr("x", d => xScale(d.TotalEmpSec_EmployedCivilianPop16YearsandOver) + 5)
            .attr("y", d => yScale(d.Statistics) + yScale.bandwidth() / 1)
            .style("font-size", "10px")

        // BARS
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            //.join("rect")
            .attr("class", "bar")
            .attr("height", yScale.bandwidth())
            .attr("width", d => xScale(d.TotalEmpSec_EmployedCivilianPop16YearsandOver) - margin)
            .attr("x", d => margin)
            .attr("y", d => yScale(d.Statistics))
            .attr("fill", d => colorScale(d.TotalEmpSec_EmployedCivilianPop16YearsandOver))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScale(d.TotalEmpSec_EmployedCivilianPop16YearsandOver))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", d => colorScaleTwo(d.TotalEmpSec_EmployedCivilianPop16YearsandOver))
            })
            .append("title")
            .text(d => (d.Statistics + " population is " + d.TotalEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString()))

        //LABELS THE STATES ON THE LEFT BARS ON THE Y-AXIS
        svg.selectAll(".state-label")
            .data(data)
            .enter()
            .append("text")
            .classed("state-label", true)
            .attr("font-size", "11px")
            .attr("transform", function (d, i) {
                return "translate(" + (height - margin - 950) + "," + (yScale(d.Statistics) + yScale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels - need the -950 to move bars from right to left
            })
            .text(d => d.Statistics) 


        //Sort by clicking button
        d3.select(".value-sort").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.TotalEmpSec_EmployedCivilianPop16YearsandOver, b.TotalEmpSec_EmployedCivilianPop16YearsandOver)
            })
            yScale.domain(data.map(d => d.Statistics))

            svg.selectAll(".bar")
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScale(d.Statistics);
                })

            //MOVES THE BAR LABELS 
            svg.selectAll(".labels")
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScale(d.Statistics) + yScale.bandwidth() / 1;
                })

            //MOVES THE AXIS LABELS (STATES)
            svg.selectAll(".state-label")
                .transition()
                .duration(700)
                .attr("font-size", "11px")
                .attr("transform", function (d, i) {
                return "translate(" + (height - margin - 950) + "," + (yScale(d.Statistics) + yScale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels 
            }) //have to use the same .attr("transform", function) as the original bar label code for the bars to move 

        })


        //SECOND SVG - MALE POPULATION BY STATE 
        const svgMale = d3.select("#second-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleMale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.MaleEmpSec_EmployedCivilianPop16YearsandOver)])
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

        const colorScaleMaleTwo = d3.scaleOrdinal()
            .domain(xScaleMale.domain())
            
            .range(["#2483b9","#2282b9","#2181b8","#1f80b8","#1e7fb7","#1c7eb7","#1b7eb6","#1a7db5","#197cb5","#177bb4","#167ab4","#1579b3","#1478b2","#1377b1","#1276b1","#1175b0","#1074af","#0f74af","#0e73ae","#0d72ad","#0c71ac","#0c70ab","#0b6fab","#0a6faa","#0a6ea9","#096da8","#096ca7","#086ba6","#086ba5","#076aa4","#0769a3","#0768a2","#0667a1","#0667a0","#06669f","#06659e","#05649d","#05649c","#05639b","#056299","#056198","#056097","#046096","#045f95","#045e93","#045d92","#045c91","#045c90","#045b8e","#045a8d","#04598c","#04588a","#045789","#045687","#045586","#045585","#045483","#045382","#035280","#03517f","#03507d","#034f7c","#034e7a","#034d79","#034c77","#034b75","#034a74","#034972","#034871","#03476f","#03466d","#03456c","#03446a","#034369","#034267","#024165","#023f64","#023e62","#023d60","#023c5f","#023b5d","#023a5b","#02395a","#023858"])
            //.range(["#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"]) //used fewer colors for the range b/c color schemes automatically start at the lightest color


        /* AXES */
        // xAxis
        const xAxisMale = d3.axisBottom(xScaleMale)
        svgMale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`)
            .call(xAxisMale)

        //REMOVE THE Y-AXIS SO IT DOES NOT INTERFERE WITH THE SORTING
        // // yAxis
        // const yAxisMale = d3.axisLeft(yScaleMale)
        // svgMale.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", `translate(${margin},0)`)
        //     .call(yAxisMale)


        //ADD CHART TITLE    
        svgMale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16)
            .attr("text-anchor", "middle")
            .text("Male Employed Civilian Population Ages 16 and Up")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")

        // BAR LABELS
        svgMale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.MaleEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString())
            .attr("x", d => xScaleMale(d.MaleEmpSec_EmployedCivilianPop16YearsandOver) + 3)
            .attr("y", d => yScaleMale(d.Statistics) + yScaleMale.bandwidth() / 1)
            .attr("class", "labels")
            .style("font-size", "10px")


        // BARS
        svgMale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("class", "bar-two")
            .attr("height", yScaleMale.bandwidth())
            .attr("width", d => xScaleMale(d.MaleEmpSec_EmployedCivilianPop16YearsandOver) - margin)
            .attr("x", d => margin)
            .attr("y", d => yScaleMale(d.Statistics))
            .attr("fill", d => colorScaleMale(d.MaleEmpSec_EmployedCivilianPop16YearsandOver))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScaleMale(d.MaleEmpSec_EmployedCivilianPop16YearsandOver))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", d => colorScaleMaleTwo(d.MaleEmpSec_EmployedCivilianPop16YearsandOver))
            })
            .append("title")
            .text(d => (d.Statistics + " male population is " + d.MaleEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString()))


        //LABELS THE STATES ON THE LEFT BARS ON THE Y-AXIS
        svgMale.selectAll(".state-label")
            .data(data)
            .enter()
            .append("text")
            .classed("state-label", true)
            .attr("font-size", "11px")
            .attr("transform", function (d, i) {
                return "translate(" + (height - margin - 950) + "," + (yScaleMale(d.Statistics) + yScaleMale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels - need the -950 to move bars from right to left
            })
            .text(d => d.Statistics) 

        //Sort by clicking button
        d3.select(".value-sort-male").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.MaleEmpSec_EmployedCivilianPop16YearsandOver, b.MaleEmpSec_EmployedCivilianPop16YearsandOver);
            })
            yScaleMale.domain(data.map(d => d.Statistics))

            svgMale.selectAll(".bar-two")
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

            //MOVES THE AXIS LABELS (STATES)
            svgMale.selectAll(".state-label")
                .transition()
                .duration(700)
                .attr("font-size", "11px")
                .attr("transform", function (d, i) {
                    return "translate(" + (height - margin - 950) + "," + (yScaleMale(d.Statistics) + yScaleMale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels 
                }) //have to use the same .attr("transform", function) as the original bar label code for the bars to move 
        })




        //THIRD SVG - FEMALE POPULATION BY STATE
        const svgFemale = d3.select("#third-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



        /* SCALES */
        // xScale
        const xScaleFemale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.FemEmpSec_EmployedCivilianPop16YearsandOver)])
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

        const colorScaleFemaleTwo = d3.scaleOrdinal()
            .domain(xScaleFemale.domain())
            .range(["#9e0142","#a00343","#a20643","#a40844","#a70b44","#a90d45","#ab0f45","#ad1245","#af1446","#b11646","#b31947","#b51b47","#b71d48","#ba2048","#bc2248","#be2449","#c02749","#c12949","#c32b4a","#c52d4a","#c7304a","#c9324a","#cb344b","#cd364b","#ce384b","#d03b4b","#d23d4b","#d33f4b","#d5414b","#d7434b","#d8454b","#da474a","#db494a","#dd4b4a","#de4d4a","#df4f4a","#e1514a","#e2534a","#e35549","#e45749","#e65949","#e75b49","#e85d49","#e95f49","#ea6149","#eb6349","#ec6549","#ed6749","#ee6a49","#ef6c49","#f06e4a","#f0704a","#f1724a","#f2744b","#f3774b","#f3794c","#f47b4d","#f47e4d","#f5804e","#f6824f","#f68550","#f78750","#f78951","#f88c52","#f88e53","#f89154","#f99356","#f99557","#f99858","#fa9a59","#fa9c5a","#fa9f5c","#fba15d","#fba35e","#fba660","#fba861","#fcaa62","#fcad64","#fcaf65","#fcb167","#fcb368","#fcb56a","#fdb86b","#fdba6d","#fdbc6e","#fdbe70","#fdc071","#fdc273","#fdc474","#fdc676","#fdc878","#fdca79","#fecc7b","#fecd7d","#fecf7e","#fed180","#fed382","#fed584","#fed685","#fed887","#feda89","#fedb8b","#fedd8d","#fede8f","#fee090","#fee192","#fee394","#fee496","#fee698","#fee79a","#fee89b","#feea9d","#feeb9f","#feeca1","#feeda2","#feefa4","#fef0a5","#fef1a7","#fef2a8","#fdf3a9","#fdf3aa","#fdf4ab","#fdf5ac","#fcf6ad","#fcf6ae","#fcf7af","#fbf7af","#fbf8b0","#faf8b0","#faf9b0","#f9f9b0","#f9f9b0","#f8f9b0","#f7faaf","#f7faaf","#f6faae","#f5faae","#f4f9ad","#f3f9ac","#f2f9ac","#f2f9ab","#f0f9aa","#eff8a9","#eef8a8","#edf8a7","#ecf7a7","#ebf7a6","#e9f6a5","#e8f6a4","#e7f5a3","#e5f5a2","#e4f4a2","#e2f3a1","#e0f3a1","#dff2a0","#ddf1a0","#dbf19f","#d9f09f","#d7ef9f","#d6ee9f","#d4ee9f","#d2ed9e","#d0ec9e","#cdeb9f","#cbea9f","#c9e99f","#c7e89f","#c5e89f","#c3e79f","#c0e6a0","#bee5a0","#bce4a0","#b9e3a0","#b7e2a1","#b4e1a1","#b2e0a1","#b0dfa1","#addea2","#abdda2","#a8dca2","#a6dba3","#a3daa3","#a0d9a3","#9ed8a3","#9bd7a3","#99d6a4","#96d5a4","#94d4a4","#91d3a4","#8ed1a4","#8cd0a4","#89cfa5","#87cea5","#84cda5","#82cba5","#7fcaa6","#7dc9a6","#7ac7a6","#77c6a6","#75c5a7","#73c3a7","#70c2a8","#6ec0a8","#6bbea8","#69bda9","#66bba9","#64b9aa","#62b8aa","#60b6ab","#5db4ac","#5bb2ac","#59b0ad","#57aeae","#55acae","#53aaaf","#51a8af","#50a6b0","#4ea4b1","#4ca2b1","#4ba0b2","#499db2","#489bb3","#4799b3","#4697b3","#4595b4","#4492b4","#4390b4","#438eb4","#428cb5","#4289b5","#4287b4","#4285b4","#4283b4","#4280b4","#437eb3","#437cb3","#447ab3","#4577b2","#4575b1","#4673b1","#4771b0","#486eaf","#4a6caf","#4b6aae","#4c68ad","#4e65ac","#4f63ab","#5161aa","#525fa9","#545ca8","#555aa7","#5758a6","#5956a5","#5b53a4","#5c51a3","#5e4fa2"])


        /* AXES */
        // xAxis
        const xAxisFemale = d3.axisBottom(xScaleFemale)
        svgFemale.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height - margin})`)
            .call(xAxisFemale)

        //REMOVE Y-AXIS SO IT DOES NOT INTERFERE WITH THE SORTING 
        // // yAxis
        // const yAxisFemale = d3.axisLeft(yScaleFemale)
        // svgFemale.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", `translate(${margin},0)`)
        //     .call(yAxisFemale)


        //ADD CHART TITLE    
        svgFemale
            .append("text")
            .attr("class", "title")
            .attr("x", width / 2)
            .attr("y", height / 16)
            .attr("text-anchor", "middle")
            .text("Female Employed Civilian Population Ages 16 and Up")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .attr("fill", "darkcyan")

        // BAR LABELS
        svgFemale.selectAll("labels")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.FemEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString())
            .attr("x", d => xScaleFemale(d.FemEmpSec_EmployedCivilianPop16YearsandOver) + 5)
            .attr("y", d => yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1)
            .attr("class", "labels")
            .style("font-size", "10px")


        // BARS
        svgFemale.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("class", "bar-three")
            .attr("height", yScaleFemale.bandwidth())
            .attr("width", d => xScaleFemale(d.FemEmpSec_EmployedCivilianPop16YearsandOver) - margin)
            .attr("x", d => margin)
            .attr("y", d => yScaleFemale(d.Statistics))
            .attr("fill", d => colorScaleFemale(d.FemEmpSec_EmployedCivilianPop16YearsandOver))
            .on('mouseover', function () {
                d3.select(this)
                    .attr("fill", d => colorScaleFemale(d.FemEmpSec_EmployedCivilianPop16YearsandOver))
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition("colorfade")
                    .delay(100)
                    .attr("fill", d => colorScaleFemaleTwo(d.FemEmpSec_EmployedCivilianPop16YearsandOver))
                    //.attr("fill", "darkred")
            })
            .append("title")
            .text(d => (d.Statistics + " female population is " + d.FemEmpSec_EmployedCivilianPop16YearsandOver.toLocaleString()))

        //LABELS THE STATES ON THE LEFT BARS ON THE Y-AXIS
        svgFemale.selectAll(".state-label")
            .data(data)
            .enter()
            .append("text")
            .classed("state-label", true)
            .attr("font-size", "11px")
            .attr("transform", function (d, i) {
                return "translate(" + (height - margin - 950) + "," + (yScaleFemale(d.Statistics) + yScaleFemale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels - need the -950 to move bars from right to left
            })
            .text(d => d.Statistics) 


        //Sort by clicking button
        d3.select(".value-sort-female").on("click", function () {
            data.sort(function (a, b) {
                return d3.descending(a.FemEmpSec_EmployedCivilianPop16YearsandOver, b.FemEmpSec_EmployedCivilianPop16YearsandOver);
            })
            yScaleFemale.domain(data.map(d => d.Statistics))

            svgFemale.selectAll(".bar-three")
                .transition()
                .duration(700) //changes how fast the bars shift
                .attr("y", function (d, i) {
                    return yScaleFemale(d.Statistics);
                })


            svgFemale.selectAll(".labels") //select class labels to move
                .transition()
                .duration(700)
                .attr("y", function (d, i) {
                    return yScaleFemale(d.Statistics) + yScaleFemale.bandwidth() / 1;
                })

            //MOVES THE AXIS LABELS (STATES)
            svgFemale.selectAll(".state-label")
                .transition()
                .duration(700)
                .attr("font-size", "11px")
                .attr("transform", function (d, i) {
                    return "translate(" + (height - margin - 950) + "," + (yScaleFemale(d.Statistics) + yScaleFemale.bandwidth()) + ")" //had to flip the order of yScale + yScale.bandwidth & (height-margin) to move the labels 
                }) //have to use the same .attr("transform", function) as the original bar label code for the bars to move 
        })

    })