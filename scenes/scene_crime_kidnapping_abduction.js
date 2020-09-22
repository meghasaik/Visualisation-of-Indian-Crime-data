;

SceneKidnappingAbduction = (function() {
    var this_scene = "Kidnapping";

    function update_charts(year)
    {
        var csv = "./data/reported-arrested-convicted-csv/" + this_scene + "_" + year + ".csv";
        ArrestedAndConvictedChart.init(csv); 
        StateCrimeComparisonChart.scene_plot(this_scene, year); 
    }

    function set_current_scene()
    {  

        makedisapear_all();
        AppState.setCurrentScene(this_scene);
        show_map_title("Kidnappings by "+AppState.getIntensitytype()) 
        show_explore_charts();
        show_g_chart();
        show_map();
        show_slider();
        hide_trend_chart();
        show_top5(this_scene,AppState.getyear());
        show_radio_buttons();
        show_case_text();

        AppState.setyear("2001");

        if(AppState.isfirst()){
            init_slider();
            AppState.notfirst();
            }

            initialize_cases_text();


        $('#ex13').slider('setValue', AppState.getyear());
        //To give place for legend as the legend name is big.
        $('#title_g').css("margin-right","10%");

        initialize_ano("general");
        $('#title_c').text("Number of cases reported per state")

        AppState.initializeCharts();
        StateCrimeComparisonChart.init();
        IndiaMapModule.set_choropleth_by_scene_and_year("Kidnapping",AppState.getyear()+"");
        update_charts("2001");

               
        
    }

    return {
        update_charts: update_charts,
        set_current_scene: set_current_scene
    }
})();
