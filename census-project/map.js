console.log('loaded');

// CREATE BASE MAP LAYERS
let map = L.map('map').setView([46.0, -97.5], 3.4);

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
const allStates = axios('../data/usState-jobs.json').then(resp => { //brings in the map data 
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
    
    // Set userSelection to an open string
    let userSelection = '';

    // Create style feature that will fill map based on getColor function
    geojson = L.geoJSON(resp.data, {
        style: function (feature) {
            return {
                fillColor: getColor(feature),
                fillOpacity: 0.95,
                color: 'black',
                weight: 1
            }
        },
        // onEachFeature - mouse over = highlight each state a color, then when mouseout, highlight turns off. Click state = zooms into state
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.STUSPS + '<br> Women: ' + Math.round(feature.properties.Fem_PersonalCareandService * 100.0) + '%' + ' <br> Men: ' + Math.round(feature.properties.Male_PersonalCareandService * 100.0) + '%'), //not needed b/c highlight shows percentages
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

    }).addTo(map).bringToFront();

    // Create event change function that will update based on user selection in dropdown list
    // Must recall the style function whenever the dropdown (userSelection) updates
    function selectEventHandler(e) {
        userSelection = e.target.value;

        geojson.eachLayer(function (layer) {

            layer.setStyle({
                fillColor: getColor(layer.feature),
                fillOpacity: 0.95,
                color: 'black', 
                weight: 1
            }
            );

        });

    }
    // Target the HTML ("selectJob") that will change and add eventListener
    document.getElementById("selectJob").addEventListener('change', selectEventHandler);


    // CREATE COLOR VARIABLE
    function getColor(d) {

        if (userSelection.length === 0) return '#8888';
        //move the below 3 fields (to the hover section)
        let fields = profFields[userSelection];

        let maleValue = d.properties[fields.male];
        //console.log('maleValue', maleValue)
        let femaleValue = d.properties[fields.female];
        //console.log('femaleValue', femaleValue)
        

        let majorityValue = d.properties[fields.majority];
        

        return majorityValue == 'F' ? '#fdae6b' :
            majorityValue == 'M' ? '#542788' :
                '#ffffff';

    }
    // Recall the getStyle function
    function getStyle(feature) {
        return {
            fillColor: getColor(feature),
            fillOpacity: 0.95,
            color: 'black', //colors the borders
            weight: 1
        }
    }



// Create highlight function - will highlight and apply style when hovered over the state
    function highlightFeature(e) {
        const layer = e.target;

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

// Create function that will reset highlight when cursor is no longer over the state (target)
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        //info.update(); //this may not be needed
    }

// Create zoom function that will zoom when clicked
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }


    // CONTROL THAT SHOWS STATE INFO IN HOVER
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    //user selection is to be used as the lookup for the data - need to actually connect to the numerical values
    //2 problems - (1)if femaleLoopUp & maleLookUp & console logs are active, then hover doesn't show (2) if they are inactive, then they do
    info.update = function (props) {
        console.log('props', props)
        console.log('user', userSelection)
        console.log('test', profFields[userSelection])
        let femaleLookUp = profFields[userSelection].female //female returns as undefined
        let maleLookUp = profFields[userSelection].male //male returns as undefined
        console.log('femaleJob', props[femaleLookUp]) //shows female % per category/state - also can be props[profFields[userSelection].female]
        console.log('maleJob', props[maleLookUp]) //shows male % per category/state - also can be props[profFields[userSelection].male]
        this._div.innerHTML = '<h4>Occupation stats</h4>' + (props ?
            '<b>' + props.NAME + '</b><br />' + ([userSelection.femaleValue] * 100).toFixed(1) + ' % ' + ' women' + '<br />' + ([userSelection.maleValue] * 100).toFixed(1) + ' % ' + 'men' : 'Hover over a state');
        
            // this._div.innerHTML = '<h4>Occupation stats</h4>' + (props ?
        //     '<b>' + props.NAME + '</b><br />' + (parseInt(profFields[userSelection].female) * 100).toFixed(1) + ' % ' + ' women' + '<br />' + (parseInt(profFields[userSelection].male) * 100).toFixed(1) + ' % ' + 'men' : 'Hover over a state');
    }; info.addTo(map);
})

var popup = L.popup();


map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

