;

SceneSexualHarrassment = (function() {
    var this_scene = "Sexual_Harrassment";

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

        show_map_title("Sexual Harrassment by "+AppState.getIntensitytype())

        //show and disapear thngs which are needed and not needed. 
        show_explore_charts();
        show_g_chart();
        show_map();
        show_slider();
        show_top5(this_scene,AppState.getyear());
        hide_trend_chart();
        show_radio_buttons();
        show_case_text();

        AppState.setyear("2001")

        if(AppState.isfirst()){
            init_slider();
            AppState.notfirst();
            }
            initialize_cases_text();

        //initialize appropriate charts
        StateCrimeComparisonChart.init();
        $('#ex13').slider('setValue', AppState.getyear());

        initialize_ano("general");
        
        $('#title_c').text("Number of cases reported per state")


        IndiaMapModule.set_choropleth_by_scene_and_year("Sexual_Harrassment", AppState.getyear()+"");
        update_charts("2001");

                //title_clear
                $('#title_g').css("margin-right","10%");

    }

    return {
        update_charts: update_charts,
        set_current_scene: set_current_scene
    }
})();
