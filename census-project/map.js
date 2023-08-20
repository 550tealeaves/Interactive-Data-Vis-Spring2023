console.log('loaded');

//CREATE BASE MAP LAYERS
let map = L.map('map').setView([40.7, -73.7], 5);

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

//Use https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array - to learn how to create dropdown and select value

// Use https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript - to learn how to select value

//Save value of selected option (ex: Fem_Health...from dropdown) into a variable - it saves the name of the object key
var geojson;


const allStates = axios('../data/usState-jobs.json').then(resp => { //brings in the map data 
    jobTitles = Object.keys(resp.data.features[0].properties) //use this to be able to select all the job titles

    jobValues = Object.values(resp.data.features[0].properties) //use this to see all the values from the key.value pairs

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

    geojson = L.geoJSON(resp.data, {
        style: function (feature) {
            return {
                fillColor: getColor(feature),
                fillOpacity: 0.95,
                color: 'black', //colors the borders
                weight: 1
            }
        },
        //onEachFeature - can click and display state name 
        onEachFeature: function (feature, layer) {
            // layer.bindPopup(feature.properties.STUSPS + ': ' + Math.round(feature.properties.Fem_HealthcareSupport * 100.0)  + '%' + ' <br>' ), not needed b/c highlight shows percentages
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

    }).addTo(map).bringToFront();

    //Create event change function
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
    //Target the HTML that will change and add eventListener
    document.getElementById("selectJob").addEventListener('change', selectEventHandler);


    // // CREATE COLOR VARIABLE
    function getColor(d) {

        if (userSelection.length === 0) return '#8888';
        //move the below 3 fields (to the hover section)
        const fields = profFields[userSelection];

        const maleValue = d.properties[fields.male];
        console.log('males', maleValue)
        const femaleValue = d.properties[fields.female];
        console.log('female', femaleValue)

        let majorityValue = d.properties[fields.majority];
        console.log('majority', majorityValue)

        return majorityValue == 'F' ? '#fdae6b' :
            majorityValue == 'M' ? '#542788' :
                '#ffffff';

    }

    function getStyle(feature) {
        return {
            fillColor: getColor(feature),
            fillOpacity: 0.95,
            color: 'black', //colors the borders
            weight: 1
        }
    }




    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 2.5,
            color: '#67000d',
            dashArray: '',
            fillOpacity: 0.8
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }


    function resetHighlight(e) {
        console.log(resetHighlight)
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

})


// CONTROL THAT SHOWS STATE INFO IN HOVER
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    console.log('props', props)
    this._div.innerHTML = '<h4>Occupation stats</h4>' + (props ?
        '<b>' + props.NAME + '</b><br />' + (props.Fem_SalesandRelated * 100).toFixed(1) + ' % ' + ' women' + '<br />' + (props.Male_SalesandRelated * 100).toFixed(1) + ' % ' + 'men' : 'Hover over a state');
};

info.addTo(map);


map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

