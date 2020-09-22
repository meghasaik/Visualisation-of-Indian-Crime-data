;

AppState = (function() {
    var data;
	var states = [];
	var crimesList = [];
	var selected_purpose="Total Crimes"
    var selected_state="All States"
    var scenes_data;
    var current_scene = "Explore";
    var year = 2001;
    var first=true;
    var crime_intensity_type="Crime Rate";
    var population_data;

    function getIntensitytype(){
        return crime_intensity_type;
    }

    function setIntensitytype(s){
        crime_intensity_type=s;
    }

    function isfirst(){
        return first;
    }

    function notfirst(){
        first=false;
    }

    function getyear()
    {
        return year;
    }

    function setyear(year1){
        year=year1;
    }

    function add_all_states_data(json)
    {
        for (var year in json)
        {
            year_data = {};
            for (var crime in json[year]["Assam"])
            {
                crime_sum = 0;
                for (var state in json[year])
                {
                    crime_sum += json[year][state][crime]
                } 
                year_data[crime] = crime_sum; 
            }  
            json[year]["All States"] = year_data;    
        }
        console.log("hey")
        console.log(json);
        return json;
    }

    
    function init()
    {
        selected_purpose="Total Crimes"
        selected_state="All States"

        d3version5.json("./data/state-wise-crimes.json").then(function(json){

			data = add_all_states_data(json);
			console.log(data);
			//createAxes();

            for (var state in data["2001"]){
                states.push(state);
            }
            console.log(states)

			// The value of this variable is taken from "./data/state-wise-crimes-keys.json"
            crimesList = [
                "Rape",
                "Kidnapping and Abduction",
                "Dowry Deaths",
                "Assault on women with intent to outrage her modesty",
                "Insult to modesty of Women",
                "Cruelty by Husband or his Relatives",
                "Total Crimes"
            ]
            console.log(crimesList)

            // initialize all charts
            //initializeCharts();
            IndiaMapModule.init_map();

			// hint HERE!
			// you could load more data here using d3version5.json() again...

        }).catch(function(error) {console.warn(error)})
        
        d3version5.json("./data/scene_data.json").then(function(json){
            scenes_data = json;
        }).catch(function(error) {console.warn(error)});

        d3version5.json("./data/population_data.json").then(function(json){
            population_data = json;
        }).catch(function(error) {console.warn(error)});

    }

    function initializeCharts()
    {
        // if(!charts_initialized_first)
        // {
           
        //     charts_initialized_first = true;
        // }
    }

    var getCrimeTrend = function (state, crimeType)
	{
		state_crime = []
		for (var year in data)
		{
			var year_data = data[year]
			var state_data = year_data[state]
			state_crime.push({
				"xVal": year,
				"yVal": state_data[crimeType]});
		}
		return state_crime;
    }
    
    // deprecated. We no longer sum up crimes from all years
    var getStateWiseCrimeDataByCrimeType = function (crimeType)
    {
        state_wise_crimes = []
        var years = Object.keys(data);
        console.log(years);
        for (var state in data["2012"])
        {
            console.log(data["2012"]);
            var crimeCount = 0;
            for (var i =0; i < years.length; i++)
            {
                var year = years[i];
                crimeCount += data[year][state][crimeType]
            }
                
            state_wise_crimes.push({
                "state" : state,
                "crimeCount" : crimeCount
            })
        }
        return state_wise_crimes;
    }

    var getStateWiseCrimeDataByCrimeTypeV2 = function (crimeType)
    {
        state_wise_crimes = []
        
        for (var state in data["2012"])
        {
            if(state == "All States")
                continue;
                
            var crimeCount = data[year][state][crimeType]
                
            state_wise_crimes.push({
                "state" : state,
                "crimeCount" : crimeCount
            })
        }
        return state_wise_crimes;
    }

	function getStateNames()
	{
        return states;
	}

	function getCrimesList()
	{
        return crimesList;
    }

    function getSelectedCrime()
    {
        return selected_purpose;
    }

    function getSelectedState()
    {
        return selected_state;
    }

    function setCrime(crime)
    {
        return selected_purpose = crime;
    }

    function setState(state)
    {
        return selected_state = state;
    }

    function getCrimeForSpecificState(state)
    {
        crime_count = 0;
        for(var year in data)
        {
            if (state in data[year])
			crime_count += data[year][state][selected_purpose];
		}
		return crime_count;
    }
    
    function getCrimeForSpecificStateAndYear(state, year)
    {
        crime_count = 0;
            if (state in data[year])
			crime_count = data[year][state][selected_purpose];
		return crime_count;
    }

    function getCrimeComparisonChartSceneData(scene, year)
    {
        var chartData = [];

        var states_list = [];
        for (var state in scenes_data["2001"])
            states_list.push(state);
        for (var i = 0; i< states_list.length; i++)
        {
            chartData.push({ "state" : states_list[i],
                    "crimeCount" : scenes_data[year][states_list[i]][scene + "-Cases-Reported"]
                });               
        }
        return chartData;
    }

    function getScenesData()
    {
        return scenes_data;
    }

    function setCurrentScene(scene)
    {
        current_scene = scene;
    }

    function getCurrentScene()
    {
        return current_scene;
    }

    function getPopupulation(state, year)
    {
        return population_data[year][state];
    }

    return {
        init: init,
        getCrimesList : getCrimesList,
        initializeCharts: initializeCharts,
        getStateNames : getStateNames,
        getCrimeTrend : getCrimeTrend,
        getSelectedCrime : getSelectedCrime,
        getSelectedState : getSelectedState,
        getStateWiseCrimeDataByCrimeType : getStateWiseCrimeDataByCrimeType,
        getStateWiseCrimeDataByCrimeTypeV2 : getStateWiseCrimeDataByCrimeTypeV2,
        getCrimeForSpecificState : getCrimeForSpecificState,
        getCrimeForSpecificStateAndYear : getCrimeForSpecificStateAndYear,
        setCrime: setCrime,
        setState : setState,
        getScenesData : getScenesData,
        setCurrentScene : setCurrentScene,
        getCurrentScene : getCurrentScene ,
        setyear:setyear,
        getyear:getyear,
        isfirst:isfirst,
        notfirst:notfirst,
        getCrimeComparisonChartSceneData: getCrimeComparisonChartSceneData,
        getIntensitytype: getIntensitytype,
        setIntensitytype: setIntensitytype,
        getPopupulation: getPopupulation
    
      };

})();
AppState.init();