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


const allStates = axios('../data/usState.json').then(resp => { //brings in the map data 
    console.log('response', resp); //see response in console log

    L.geoJSON(resp.data, { //access the response.data and style it 
        style: {
            opacity: 0.85, //higher the number the more opaque it is
            color: "magenta",
            weight: 2 //higher the number, thicker the lines are 
        }
    }).addTo(map).bringToBack(); //brought the map to the front so it sits on top

}) //map shows up 

//trying to get the state percentages to show
const statesPct = axios('../data/census_states_pct.json').then(states => {
    console.log('states', states);

    //L.geoJSON(states.data[0].NAME) produces invalid GEOJSON error
    L.geoJSON(states.data, {
        style: {
            radius: 3,
            opacity: 0.95,
            color: "yellow",
            weight: 4
        }
    }).addTo(map).bringToFront();

})

const statesGeojson = axios('../data/census_states_pct.geojson').then(statesGeo => {
    console.log('statesGeo', statesGeo);

    //Trying to join statesGeojson file with usState.json based on NAME property & not working
    //L.geoJSON(statesGeo.data) has no error
    //But trying to access the data.features[0].properties.NAME & get error
    L.geoJSON(statesGeo.data, {
        style: {
            radius: 5,
            opacity: 0.95,
            color: "green",
            weight: 5
        }
    }).addTo(map).bringToFront();
})

//trying to get the occupation percentages to show but something isn't working - no console log errors
const categoriesPct = axios('../data/census_cat_pct_nototals.json').then(catPct => {
    console.log('categories', catPct);

    // L.geoJSON(catPct.data[0].MalePop, {
    //     style: { 
    //         radius: 6, 
    //         opacity: 0.95, 
    //         color: "green", 
    //         weight: 5 
    //     }
    // }).addTo(map).bringToFront(); 

})

const catPctTwo = axios('../data/census_cat_pct.geojson').then(catEdited => {
    console.log('short', catEdited);
})


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