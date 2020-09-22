;

SceneDomesticViolence = (function() {
    var this_scene = "Domestic_Violence";
    

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
        show_map_title("Domestic Violence by "+AppState.getIntensitytype())
        //title position to accomodate legend
        $('#title_g').css("margin-right","5%");


        //show and hide
        show_explore_charts();
        show_g_chart();
        show_map();
        show_slider();
        hide_trend_chart();
        show_ano();
        show_top5(this_scene,AppState.getyear());
        show_radio_buttons();
        show_case_text();

        initialize_cases_text();

        AppState.setyear("2001");

        
        if(AppState.isfirst()){
            init_slider();
            AppState.notfirst();
            }

        //chart initial
        AppState.initializeCharts();

        StateCrimeComparisonChart.init();

        initialize_ano("general")

        $('#title_c').text("Number of cases reported per state")

        $('#ex13').slider('setValue', AppState.getyear());

        IndiaMapModule.set_choropleth_by_scene_and_year("Domestic_Violence", AppState.getyear()+"");

        update_charts("2001");

    }

    return {
        update_charts: update_charts,
        set_current_scene: set_current_scene
    }
})();
