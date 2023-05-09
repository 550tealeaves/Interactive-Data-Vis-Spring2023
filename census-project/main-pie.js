const width = 450,
height = 550,
margin = 30;


d3.json("../data/census_states_all_totals.json", d3.autoType)
.then(data => {
    console.log('data', data)
})