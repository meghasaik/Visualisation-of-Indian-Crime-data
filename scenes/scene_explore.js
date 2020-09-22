;

SceneExplorer = (function() {
    var this_scene = "Explore";
    var first=true;

    function init()
    {
        var csv = "./data/reported-arrested-convicted-csv/" + this_scene + "_" + "2001" + ".csv";
        ArrestedAndConvictedChart.init(csv); 
    }

    function set_current_scene()
    {          

        makedisapear_all();
        AppState.setCurrentScene(this_scene);

        show_map_title(this_scene.toUpperCase()+" by "+AppState.getIntensitytype())


        //show all divs required
        show_explore_charts();
        show_filter();
        show_map();
        show_slider();
        show_explore_charts_titles();
        show_c_chart();
        hide_g_chart();
        show_trend_chart();
        hide_ano();
        show_radio_buttons();
        
        
        if(AppState.isfirst()){
        init_slider();
        AppState.notfirst();
        }


        //initialize divs
        CrimeTrendChart.init();

        $('#title_c').text("Number of cases reported per state")


        if(first){
        initialize_filter();
        first=false;
    }
        StateCrimeComparisonChart.init();
        IndiaMapModule.set_choropleth_crime_and_year("2001");
        $('#ex13').slider('setValue', AppState.getyear());


        hide_ano();

                //title_clear
                $('#title_g').css("margin-right","0");


    }

    return {
        init: init,
        set_current_scene: set_current_scene
    }
})();
