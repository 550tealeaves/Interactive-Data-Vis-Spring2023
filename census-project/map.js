console.log('loaded');

let map = L.map('map').setView([46.0, -97.5], 3.4);
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



const allStates = axios("../data/usState-jobs.json").then(resp => { //brings in the map data 
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
            return {
                fillColor: getColorMFBus(feature),
                //fillColor: getColorMFSales(feature),
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
            layer.bindPopup(feature.properties.STUSPS + ': ' + '<b>' + 'F:' + '' + Math.round(feature.properties.Fem_ManagementBusinessandFinancialOperations * 100) + '%' + ' ' + ' ' + 'M:' + '' + Math.round(feature.properties.Male_ManagementBusinessandFinancialOperations * 100.0) + '%') + '</b>'
            // layer.bindPopup(feature.properties.STUSPS + ': ' + '<b>' + 'F:' + '' + Math.round(feature.properties.Fem_SalesandRelated * 100) + '%' + ' ' + ' ' + 'M:' + '' + Math.round(feature.properties.Male_SalesandRelated * 100.0) + '%') + '</b>'
        } //will show state initials (stusps) F: ##% M: ##% on popup
    }).addTo(map).bringToFront();
})


//Adding color - can find colors on https:/ / colorbrewer2.org / #type=sequential & scheme=BuGn & n=3

let jobTitles = [] //create an empty array
let userSelection = 'Fem_ManagementBusinessandFinancialOperations' //set the field string = to variable
let userSelectionMale = 'Male_ManagementBusinessandFinancialOperations'
let userSelectionTotal = 'Total_ManagementBusinessandFinancialOperations'
let userSelectionMFBus = 'M_F_ManagementBusinessandFinancialOperations'
let userSelectionMFProf = 'M_F_ProfessionalandRelated'
let userSelectionMFHealth = 'M_F_HealthcareSupport'
let userSelectionMFProt = 'M_F_ProtectiveService'
let userSelectionMFFood = 'M_F_FoodPrepandServing'
let userSelectionMFBuild = 'M_F_BuildingandGroundsCleaningandMaintenance'
let userSelectionMFPers = 'M_F_PersonalCareandService'
let userSelectionMFSales = 'M_F_SalesandRelated'
let userSelectionMFOffice = 'M_F_OfficeandAdminSupport'
let userSelectionMFFarm = 'M_F_FarmingFishingandForestry'
let userSelectionMFCon = 'M_F_ConstructionExtractionandMaintenance'
let userSelectionMFProd = 'M_F_Production'
let userSelectionMFTransp = 'M_F_TranspoandMaterialMoving'



function getColor(d) {
    console.log('d', d)
    let dataValue = d.properties[userSelection]
    //let dataValue = d.properties['Fem_HealthcareSupport'] //will go into properties (object) and access the field Fem_Health... "d" = feature
    //Create new variable - userSelection to replace string = d.properties[userSelection]
    return dataValue > 0.396 ? '#67000d' :
        dataValue > 0.352 ? '#a50f15' :
            dataValue > 0.308 ? '#cb181d' :
                dataValue > 0.264 ? '#ef3b2c' :
                    dataValue > 0.22 ? '#fb6a4a' :
                        dataValue > 0.176 ? '#fc9272' :
                            dataValue > 0.132 ? '#fcbba1' :
                                dataValue > 0.08 ? '#fee0d2' :
                                    dataValue > 0.044 ? '#fff5f0' :
                                        '#ffffcc';
} //change the value in dataValue > value ? b/c the fields in properties are in decimals - 0-1


function getColorMale(d) {
    let dataValue = d.properties[userSelectionMale]
    return dataValue > 0.396 ? '#800026' :
        dataValue > 0.352 ? '#bd0026' :
            dataValue > 0.308 ? '#e31a1c' :
                dataValue > 0.264 ? '#fc4e2a' :
                    dataValue > 0.22 ? '#fd8d3c' :
                        dataValue > 0.176 ? '#feb24c' :
                            dataValue > 0.132 ? '#fed976' :
                                dataValue > 0.08 ? '#ffeda0' :
                                    dataValue > 0.044 ? '#ffffcc' :
                                        '#ffffff';
} 

function getColorTotal(d) {
    let dataValue = d.properties[userSelectionTotal]
    return dataValue > 0.396 ? '#081d58' :
        dataValue > 0.352 ? '#253494' :
            dataValue > 0.308 ? '#225ea8' :
                dataValue > 0.264 ? '#1d91c0' :
                    dataValue > 0.22 ? '#41b6c4' :
                        dataValue > 0.176 ? '#7fcdbb' :
                            dataValue > 0.132 ? '#c7e9b4' :
                                dataValue > 0.08 ? '#edf8b1' :
                                    dataValue > 0.044 ? '#ffffd9' :
                                        '#ffffff';
} 


function getColorMFBus(d) {
    let dataValue = d.properties[userSelectionMFBus]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFProf(d) {
    let dataValue = d.properties[userSelectionMFProf]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFHealth(d) {
    let dataValue = d.properties[userSelectionMFHealth]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFProt(d) {
    let dataValue = d.properties[userSelectionMFProt]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFFood(d) {
    let dataValue = d.properties[userSelectionMFFood]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFBuild(d) {
    let dataValue = d.properties[userSelectionMFBuild]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFPers(d) {
    let dataValue = d.properties[userSelectionMFPers]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFSales(d) {
    let dataValue = d.properties[userSelectionMFSales]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFOffice(d) {
    let dataValue = d.properties[userSelectionMFOffice]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


function getColorMFFarm(d) {
    let dataValue = d.properties[userSelectionMFFarm]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFCon(d) {
    let dataValue = d.properties[userSelectionMFCon]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFProd(d) {
    let dataValue = d.properties[userSelectionMFProd]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}

function getColorMFTransp(d) {
    let dataValue = d.properties[userSelectionMFTransp]
    return dataValue == 'F' ? '#fdae6b' :
        dataValue == 'M' ? '#542788' :
            '#ffffff';

}


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Occupation Stats</h4>' + (props ?
        '<b>' + props.NAME + '</b><br />' + props.userSelectionTotal + ' people / mi<sup>2</sup>' : 'Hover over a state');
};

info.addTo(map);







//Create the dropdown menu by looping through an array
['Management, Business, & Financial Operations', 'Professional & Related', 'Healthcare Support', 'Protective Service', 'Food Prep & Serving', 'Building & Grounds Cleaning & Maintenance', 'Personal Care & Service', 'Sales & Related', 'Office & Admin Support', 'Farming, Fishing, & Forestry', 'Construction, Extraction, & Maintenance', 'Production', 'Transportation & Moving'].forEach(function (item) {
    const optionObj = document.createElement("option"); //loops through each item in the array and creates an option with the item inside
    optionObj.textContent = item;
    document.getElementById("dropdown").appendChild(optionObj); //select for the element w/ id selectJob and add the looped item in the array to dropdown
});

// var e = document.getElementById("selectJob");
// var optionObj = e.value;
// var text = e.options[e.selectedIndex].text;
