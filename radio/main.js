
$(window).load(function() {
    
        
    $("#radio_buttons :input").change(function() {
        console.log(this.id);
        id=this.id;
        //based on crime intensity selected/ crime rate
        if(id=="b_ci"){
            AppState.setIntensitytype("Crime Rate");
            
            
        }
        //based on cased reported
        else{
            
            AppState.setIntensitytype("No. of cases reported");
        }


        scene=AppState.getCurrentScene();

        if(scene == "Explore")
        {
            var year = AppState.getyear()+ "";
            IndiaMapModule.set_choropleth_crime_and_year(year);
        }
        else{
            if(scene != "Introduction")
            {
                var year = AppState.getyear()+ "";
                IndiaMapModule.set_choropleth_by_scene_and_year(scene, year);
            }
        }

        switch(scene){
            case "Domestic_Violence":
                scene="Domestic Violence";
                
                break;
            
            case "Sexual_Harrassment":
                scene="Sexual Harrassment"
                break;
            default:
                
                break;    
                    
        }

        show_map_title(scene+" by "+AppState.getIntensitytype()) 



    }); 

});