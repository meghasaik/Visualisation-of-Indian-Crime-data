$(window).load(function() {
    
        $("#state1").on("click",function(){
            state=$("#state1").text();
            initialize_ano(state);

        });

        $("#state2").on("click",function(){
            state=$("#state2").text();
            initialize_ano(state);
            console.log("here:"+state);
        });

        $("#state3").on("click",function(){
            state=$("#state3").text();
            initialize_ano(state);
        });

        $("#state4").on("click",function(){
            state=$("#state4").text();
            initialize_ano(state);
        });

        $("#state5").on("click",function(){
            state=$("#state5").text();
            initialize_ano(state);
        });

});