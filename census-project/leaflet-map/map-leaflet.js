//Problem is the userSelection defaults to 0 so when it's multiplied by something else - result is still 0

// CREATE BASE MAP LAYERS
let map = L.map('map', {
    minZoom: 3,   // prevent zooming out too far
    maxZoom: 10   // optional, prevent zooming in too far
}).setView([46.0, -97.5], 4);


//http://maps.stamen.com/#terrain/12/37.7706/-122.3782
const basemap_urls = {
    terrain: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
}
//Add different basemaps

L.tileLayer(basemap_urls.terrain, { //will show the terrain layer
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// needs a URL from where to get the tiles 

var geojson;

// Call the data
const allStates = axios('../../data/usState-jobs.json').then(resp => { //brings in the map data 
    console.log('response', resp);
    jobTitles = Object.keys(resp.data.features[0].properties) //use this to be able to select all the job titles (field names)

    jobValues = Object.values(resp.data.features[0].properties) //use this to see all the (numerical/string) values from the key.value pairs
    console.log('jobValues', jobValues);

    // Create an object that routes to the fields of each category for males, females, and majority
    const profFields = {
        'prof': {
            'male': 'Male_ProfessionalandRelated',
            'female': 'Fem_ProfessionalandRelated',
            'majority': 'M_F_ProfessionalandRelated',
        },
        'manage': {
            'male': 'Male_ManagementBusinessandFinancialOperations',
            'female': 'Fem_ManagementBusinessandFinancialOperations',
            'majority': 'M_F_ManagementBusinessandFinancialOperations',
        },
        'health': {
            'male': 'Male_HealthcareSupport',
            'female': 'Fem_HealthcareSupport',
            'majority': 'M_F_HealthcareSupport',
        },
        'prot': {
            'male': 'Male_ProtectiveService',
            'female': 'Fem_ProtectiveService',
            'majority': 'M_F_ProtectiveService',
        },
        'food': {
            'male': 'Male_FoodPrepandServing',
            'female': 'Fem_FoodPrepandServing',
            'majority': 'M_F_FoodPrepandServing',
        },
        'build': {
            'male': 'Male_BuildingandGroundsCleaningandMaintenance',
            'female': 'Fem_BuildingandGroundsCleaningandMaintenance',
            'majority': 'M_F_BuildingandGroundsCleaningandMaintenance',
        },
        'personal': {
            'male': 'Male_PersonalCareandService',
            'female': 'Fem_PersonalCareandService',
            'majority': 'M_F_PersonalCareandService',
        },
        'sales': {
            'male': 'Male_SalesandRelated',
            'female': 'Fem_SalesandRelated',
            'majority': 'M_F_SalesandRelated',
        },
        'admin': {
            'male': 'Male_OfficeandAdminSupport',
            'female': 'Fem_OfficeandAdminSupport',
            'majority': 'M_F_OfficeandAdminSupport',
        },
        'farm': {
            'male': 'Male_FarmingFishingandForestry',
            'female': 'Fem_FarmingFishingandForestry',
            'majority': 'M_F_FarmingFishingandForestry',
        },
        'construct': {
            'male': 'Male_ConstructionExtractionandMaintenance',
            'female': 'Fem_ConstructionExtractionandMaintenance',
            'majority': 'M_F_ConstructionExtractionandMaintenance',
        },
        'prod': {
            'male': 'Male_Production',
            'female': 'Fem_Production',
            'majority': 'M_F_Production',
        },
        'transp': {
            'male': 'Male_TranspoandMaterialMoving',
            'female': 'Fem_TranspoandMaterialMoving',
            'majority': 'M_F_TranspoandMaterialMoving',
        }
    };
    
    let userSelection = '';

    // CREATE COLOR VARIABLE
    function getColor(d) {
        //sets default color if there is no userSelection (length=0)
        //think this is the problem - userSelection = 0 - so multiplication doesn't work
        if (userSelection.length === 0) return '#8888';

        //move the below 3 fields (to the hover section)
        let fields = profFields[userSelection];
        console.log('fields', fields)
        let maleValue = d.properties[fields.male];
        console.log('males', maleValue)
        let femaleValue = d.properties[fields.female];
        console.log('female', femaleValue)

        let majorityValue = d.properties[fields.majority];
        console.log('majority', majorityValue)

        return majorityValue == 'F' ? 'orangered' :
            majorityValue == 'M' ? 'darkgreen' :
                '#ffffff';
    }

    geojson = L.geoJSON(resp.data, {
        style: function (feature) {
            return {
                fillColor: getColor(feature),
                fillOpacity: 0.95,
                color: 'black', //colors the borders
                weight: 1
            }
        },

        //onEachFeature - can click and display state name and tooltip
        onEachFeature: function (feature, layer) {
            layer.bindPopup(function () {
                if (!userSelection || userSelection.length === 0) {
                    return feature.properties.STUSPS + '<br />Select a job category';
                }

                const fields = profFields[userSelection];
                const maleVal = feature.properties[fields.male];
                const femaleVal = feature.properties[fields.female];

                return feature.properties.STUSPS +
                    '<br />' + (femaleVal * 100).toFixed(1) + '% women' +
                    '<br />' + (maleVal * 100).toFixed(1) + '% men';
            });
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
        }

    }).addTo(map).bringToFront();

    //CREATE EVENT CHANGE FUNCTION THAT UPDATES WHEN USER SELECTS OPTION FROM DROPDOWN 
    function selectEventHandler(e) {
        userSelection = e.target.value;

        geojson.eachLayer(function (layer) {
            layer.setStyle({
                fillColor: getColor(layer.feature),
                fillOpacity: 0.95,
                color: 'black', //colors the borders
                weight: 1
            }
            );
        });
    }

    //TARGET THE HTML ("selectJob") THAT WILL CHANGE AND ADD eventListener 
    //ADD THE 'CHANGE' eventListener TO HTML & WILL TRIGGER THE selectionEventHandler FUNCTION 
    document.getElementById("selectJob").addEventListener('change', selectEventHandler);






    // CONTROL THAT SHOWS STATE INFO IN HOVER
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };


    //HIGHLIGHT THAT SHOWS ON STATES DURING HOVER
    function highlightFeature(e) {
        const layer = e.target;

        //styles the highlight feature over the states
        layer.setStyle({
            weight: 2.5,
            color: '#2cc1f7',
            dashArray: '',
            fillOpacity: 0.8
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    //RESETS THE HIGHLIGHT 
    function resetHighlight(e) {
        console.log(resetHighlight)
        geojson.resetStyle(e.target);
        info.update();
    }

    //ZOOM FEATURE WHEN YOU CLICK THE STATE
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }


    info.update = function (props) {
    if (!props || !userSelection || userSelection.length === 0) {
        this._div.innerHTML = '<h4>Occupation stats</h4>Hover over a state';
        return;
    }

    const fields = profFields[userSelection];
    const maleVal = props[fields.male];
    const femaleVal = props[fields.female];

    this._div.innerHTML =
        '<h4>Occupation stats</h4>' +
        '<b>' + props.NAME + '</b><br />' +
        (femaleVal * 100).toFixed(1) + '% women<br />' +
        (maleVal * 100).toFixed(1) + '% men';
};info.addTo(map);

});

var popup = L.popup();


map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

