;

SceneIntroduction = (function() {
    var this_scene = "Introduction";

    function init()
    {

    }

    function set_current_scene()
    {
        makedisapear_all();
      //  AppState.setCurrentScene(this_scene);
      hide_ano();

      show_intro_content();
      
       
    }

    return {
        init: init,
        set_current_scene: set_current_scene
    }
})();
