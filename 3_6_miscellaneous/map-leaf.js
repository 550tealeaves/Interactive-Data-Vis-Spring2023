console.log('loaded');

let map = L.map('map').setView([40.7, -73.7], 5);
//L. - means it comes from the Leaflet library 
//make a map object in the div with the ID map 
//setView - sets the starting lat/long and the zoom level
//use geojson.io - to determine lat/lon and zoom level and insert in the setView area (can start wherever you want it to ) - data up there starts at NYC
//bigger zoom number = more zoomed in

//http://maps.stamen.com/#terrain/12/37.7706/-122.3782
const basemap_urls = {
    terrain: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
}
//adding different basemaps

L.tileLayer(basemap_urls.terrain, { //will show the terrain layer
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//L.tileLayer - comes directly from Leaflet library
//wants a URL from were to get the tiles 


const allStates = axios('/data/usState-jobs.json').then(resp => { //brings in the map data 
    jobTitles = Object.keys(resp.data.features[0].properties) //use this to be able to select all the job titles

    // jobTitles.forEach(function (item) {
    //     const optionObj = document.createElement("option"); //loops through each item in the array and creates an option with the item inside
    //     optionObj.textContent = item;
    //     document.getElementById("selectJob").appendChild(optionObj); //select for the element w/ id selectJob and add the looped item in the array to dropdown
    // }); //This will add all the keys in the dropdown menu

    console.log('jobTitles', jobTitles);
    console.log('response', resp); //see response in console log
    L.geoJSON(resp.data, {
        style: function (feature) {
            // const blueVal = feature.properties.Fem_HealthcareSupport * 60;
            // const redVal = feature.properties.Male_HealthcareSupport * 280;
            // const greenVal = feature.properties.Total_HealthcareSupport * 15;

            return {
                fillColor: getColor(feature),
                fillOpacity: 0.95,
                color: 'black', //colors the borders
                weight: 1
            }
        },

        //Trying to create additional style functions for the other 2 color palettes - not sure how to get them to show
        //     style2: function (feature) {
        //     return {
        //         fillColor: getColorMale(feature),
        //         weight: 2,
        //         opacity: 1,
        //         color: "white",
        //         dashArray: "3",
        //         fillOpacity: 0.7,
        //     };
        // },

        //     style3: function (feature) {
        //         return {
        //             fillColor: getColorTotal(feature),
        //             weight: 2,
        //             opacity: 1,
        //             color: "white",
        //             dashArray: "3",
        //             fillOpacity: 0.7,
        //         };
        //     },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.NAME + ': ' + Math.abs(feature.properties.Fem_HealthcareSupport * 100.0) + '%' + ' <br>')
        }
    }).addTo(map).bringToFront();
}) 


//Adding color - can find colors on https:/ / colorbrewer2.org / #type=sequential & scheme=BuGn & n=3

let jobTitles = [] //create an empty array
let userSelection = 'Fem_HealthcareSupport' //set the field string = to variable
let userSelectionMale = 'Male_HealthcareSupport'
let userSelectionTotal = 'Total_HealthcareSupport'

function getColor(d) {
    console.log('d', d)
    let dataValue = d.properties[userSelection]
    //let dataValue = d.properties['Fem_HealthcareSupport'] //will go into properties (object) and access the field Fem_Health... "d" = feature
    //Create new variable - userSelection to replace string = d.properties[userSelection]
    return dataValue > 0.090 ? '#b10026' :
        dataValue > 0.080 ? '#e31a1c' :
            dataValue > 0.070 ? '#fc4e2a' :
                dataValue > 0.060 ? '#fd8d3c' :
                    dataValue > 0.050 ? '#feb24c' :
                        dataValue > 0.030 ? '#fed976' :
                            dataValue > 0.010 ? '#ffeda0' :
                                '#ffffcc';
} //change the value in lines 27-33 b/c the fields in properties are in decimals - 0-1


function getColorMale(d) {
    console.log('d', d)
    let dataValueMale = d.properties[userSelectionMale]
    //let dataValue = d.properties['Male_HealthcareSupport'] //will go into properties (object) and access the field Fem_Health... "d" = feature
    //Create new variable - userSelectionMale to replace string = d.properties[userSelectionMale]
    return dataValueMale > 0.090 ? '#016450' :
        dataValueMale > 0.080 ? '#02818a' :
            dataValueMale > 0.070 ? '#3690c0' :
                dataValueMale > 0.060 ? '#67a9cf' :
                    dataValueMale > 0.050 ? '#a6bddb' :
                        dataValueMale > 0.030 ? '#d0d1e6' :
                            dataValueMale > 0.010 ? '#ece2f0' :
                                '#fff7fb';
} //change the value in lines 27-33 b/c the fields in properties are in decimals - 0-1

function getColorTotal(d) {
    console.log('d', d)
    let dataValueTotal = d.properties[userSelectionTotal]
    //let dataValue = d.properties['Total_HealthcareSupport'] //will go into properties (object) and access the field Fem_Health... "d" = feature
    //Create new variable - userSelectionTotal to replace string = d.properties[userSelectionTotal]
    return dataValueTotal > 0.090 ? '#6e016b' :
        dataValueTotal > 0.080 ? '#88419d' :
            dataValueTotal > 0.070 ? '#8c6bb1' :
                dataValueTotal > 0.060 ? '#8c96c6' :
                    dataValueTotal > 0.050 ? '#9ebcda' :
                        dataValueTotal > 0.030 ? '#bfd3e6' :
                            dataValueTotal > 0.010 ? '#e0ecf4' :
                                '#f7fcfd';
} //change the value in lines 27-33 b/c the fields in properties are in decimals - 0-1


//Create the dropdown menu by looping through an array
['Female Healthcare Support', 'Male Healthcare Support', 'Total Healthcare Support'].forEach(function (item) {
    const optionObj = document.createElement("option"); //loops through each item in the array and creates an option with the item inside
    optionObj.textContent = item;
    document.getElementById("dropdown").appendChild(optionObj); //select for the element w/ id selectJob and add the looped item in the array to dropdown
});

var e = document.getElementById("selectJob");
var optionObj = e.value;
var text = e.options[e.selectedIndex].text;




//Prof's advice https://gist.github.com/Willjfield/9f9c59b9e5364f059e9c0c5b1186f680
//Looks like I have to do an await.sync for both the usState and the statesPct and then access the features - need to figure out if there is a way to take the coords data from usState and add it ot statesPct or just access it and use it for statesPct

// ...
// L.geoJSON(resp.data, {
//     style: function (feature) {
//         //Filter the non-spatial data to find the one that matches this feature's NAME
//         const featureStateData = statesPct.data.filter(f => f.NAME === feature.properties.NAME);

//         //If it doesn't find a match, something is probably wrong. Just return "gray".
//         if (featureStateData.length === 0) return { color: "gray" }

//         //Otherwise, get a property (eg. TotalEmpStat_InLaborForce) and multiply it to get a usable blue channel value
//         const blueVal = featureStateData[0].TotalEmpStat_InLaborForce * 255;
//         //Return the color using the found value
//         return { color: `rgb(0,0,${blueVal})` }
//     }
// },
//     ...
//         })
//         ...