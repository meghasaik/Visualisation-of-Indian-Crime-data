$(document).ready(function() {
  

	  
	// With JQuery
	
	
	
	
		});

$(window).load(function() {
	var selected;

	AppState.setyear(2001);


var prev;


	$("#ex13").on("slideStop", function(slideEvt) {
		if(slideEvt.value!=prev)
		{
			console.log("Slide kei paas sei "+slideEvt.value);
			AppState.setyear(slideEvt.value);			
			var current_scene = AppState.getCurrentScene();

			initialize_cases_text();


			// IndiaMapModule.set_choropleth_by_scene_and_year(AppState.getCurrentScene(), AppState.getyear()+"");
	
			if(current_scene == "Explore")		
			{
				IndiaMapModule.set_choropleth_crime_and_year(slideEvt.value.toString());
				StateCrimeComparisonChart.set_plot(AppState.getSelectedCrime());
			}
			else
			{				show_top5(AppState.getCurrentScene(),slideEvt.value);

				IndiaMapModule.set_choropleth_by_scene_and_year(current_scene, slideEvt.value.toString());
				update_scene_charts(current_scene, slideEvt.value.toString());
			}
		}		
		prev=slideEvt.value;
		
	});
	
});