$(document).ready(function() {
  
	SceneIntroduction.set_current_scene();


	  
    var numItems = $('li.fancyTab').length;
		
	
			  if (numItems == 12){
					$("li.fancyTab").width('8.3%');
				}
			  if (numItems == 11){
					$("li.fancyTab").width('9%');
				}
			  if (numItems == 10){
					$("li.fancyTab").width('10%');
				}
			  if (numItems == 9){
					$("li.fancyTab").width('11.1%');
				}
			  if (numItems == 8){
					$("li.fancyTab").width('12.5%');
				}
			  if (numItems == 7){
					$("li.fancyTab").width('14.2%');
				}
			  if (numItems == 6){
					$("li.fancyTab").width('16.666666666666667%');
				}
			  if (numItems == 5){
					$("li.fancyTab").width('20%');
				}
			  if (numItems == 4){
					$("li.fancyTab").width('25%');
				}
			  if (numItems == 3){
					$("li.fancyTab").width('33.3%');
				}
			  if (numItems == 2){
					$("li.fancyTab").width('50%');
				}
		  
	 

	
		});

$(window).load(function() {

  $('.fancyTabs').each(function() {

    var highestBox = 0;
    $('.fancyTab a', this).each(function() {

      if ($(this).height() > highestBox)
        highestBox = $(this).height();
    });

    $('.fancyTab a', this).height(highestBox);

  });

  SceneIntroduction.set_current_scene();

  $('#tab0').click(function(){
	SceneIntroduction.set_current_scene();
  });

  
  $('#tab1').click(function(){
	SceneDomesticViolence.set_current_scene();
  });

  //kidn,dom,sex
  
  $('#tab2').click(function(){
	SceneKidnappingAbduction.set_current_scene();
  });

  
  $('#tab3').click(function(){
	  
	SceneRape.set_current_scene();
  });

  $('#tab4').click(function(){
	SceneSexualHarrassment.set_current_scene();

  });

  
  $('#tab5').click(function(){
	SceneExplorer.set_current_scene();
  });

});