IndiaMapModule = (function() {
    var w,h;
    var proj;
    var path;
    var t,s;

    var buckets = 5;
      // colors = [ "#ffffd9", "#edf8b1", "#c7e9b4",
      //            "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8",
      //            "#253494", "#081d58" ]; 
      // alternatively colorbrewer.YlGnBu[9]

    // var colors = [ "#ffffcc", "#ffeda0", "#fed976",
    //                 "#feb24c", "#fd8d3c", "#fc4e2a",
    //                 "#e31a1c", "#bd0026", "#800026" ];

    var colors = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000" ];

    var map, india;
    var div;
    var json;
    var y, yAxis;
    var legend, colorScale;
    var path_dict = {};

  function init_map() {
    w = 500;
    h = 500;
    proj = d3version3.geo.mercator();
    path = d3version3.geo.path().projection(proj);
    t = proj.translate(); // the projection's default translation
    s = proj.scale(); // the projection's default scale

    map = d3version3
      .select("#chart")
      .append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      //.call(d3version3.behavior.zoom().on("zoom", redraw))
      .call(initialize);

    india = map.append("svg:g").attr("id", "india");

    div = d3version3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    d3version3.json("states.json", function(json_data) {
      json = json_data;
      //set_crime();
      set_crime_and_year("2001");
      create_states(json);
      create_color_scale_and_legend(json);
      fill_map_colors();
    });  
  }

 // deprecated- sets choropleth according to total crimes from all years
  function set_choropleth_crime()
  {
    set_crime();
    reinitialize_map();
    fill_map_colors(); 
  }

  function set_choropleth_crime_and_year(year)
  {
    set_crime_and_year(year);

    cases_reported_max = {
      "Assault on women with intent to outrage her modesty": 7118,
      "Cruelty by Husband or his Relatives": 19865 ,
      "Dowry Deaths": 2322,
      "Insult to modesty of Women": 4970,
      "Kidnapping and Abduction": 7910,
      "Rape": 3425,
      "Total Crimes": 30573
    };

    crime_rate_max = {
      "Assault on women with intent to outrage her modesty": 26,
      "Cruelty by Husband or his Relatives": 58 ,
      "Dowry Deaths": 3.0,
      "Insult to modesty of Women": 15,
      "Kidnapping and Abduction": 23,
      "Rape": 21,
      "Total Crimes": 103
    };

    var intensity_type = AppState.getIntensitytype();
    var crime = AppState.getSelectedCrime();

    var maxTotal;
    if(intensity_type != "Crime Rate")
    {
      maxTotal = cases_reported_max[crime];
    }
    else{
      maxTotal = crime_rate_max[crime];
    }

    reinitialize_map(maxTotal);
    fill_map_colors(); 
  }

  function set_choropleth_by_scene_and_year(scene, year)
  {
    scenesData = AppState.getScenesData();
    var maxTotal;
    cases_reported_max = {
      "Rape-Cases-Reported": 3425,
      "Kidnapping-Cases-Reported": 7910, 
      "Domestic_Violence-Cases-Reported": 20458,
      "Sexual_Harrassment-Cases-Reported": 9196 
    };

    crime_rates_max = {
      "Rape": 21,
      "Kidnapping": 28, 
      "Domestic_Violence": 59,
      "Sexual_Harrassment": 29 
    };
    var intensity_type = AppState.getIntensitytype();

    if(intensity_type != "Crime Rate")
    {
      scene = scene + "-Cases-Reported";
      maxTotal = cases_reported_max[scene];
    }
    else{
      maxTotal = crime_rates_max[scene];
    }
    //console.log(scenesData);
    for (var i = 0; i < json.features.length; i++)
    {
      state = json.features[i]["id"];
      total_crime = scenesData[year][state][scene];
      json.features[i]["total"] = total_crime.toString();
    }

    reinitialize_map(maxTotal);
    fill_map_colors(); 
  }
  
  function fill_map_colors()
  {

    india
      .selectAll("path")
      .transition()
      .duration(1000)
      .style("fill", function(d) {
        return colorScale(d.total);
      });

    legend.selectAll("rect")
      .data(
        colorScale.range().map(function(d, i) {
          return {
            y0: y(colorScale.domain()[i]) ,
            y1: y(colorScale.domain()[i+1]),
            z: d
          };
        })
      )
      .enter()
      .append("rect")
      .attr("width", 20)
      .attr("y", function(d) {
        return d.y0;
      })
      .attr("height", function(d) {
        return d.y1 - d.y0;
      })
      .style("fill", function(d) {
        return d.z;
      })
      .attr("transform", "translate(-20,0)");
      //.style("opacity", 0.5);

  }

  function reinitialize_map(maxTotal)
  {
    // var maxTotal = d3version3.max(json.features, function(d) {
    //   //console.log(d.id + " : " + d.total);
    //   return parseFloat(d.total);
    // });

    colorScale.domain(
      d3version3.range(buckets + 1).map(function(d) {
        return ((d) / buckets) * maxTotal;
      })
    );
    y.domain([0, maxTotal]);
    yAxis.scale(y);
    yAxis.tickValues(colorScale.domain());
    legend.call(yAxis);
    legend.selectAll("rect").remove();
  }

  function create_color_scale_and_legend(json)
  {
    var maxTotal = d3version3.max(json.features, function(d) {
      //console.log(d.id + " : " + d.total);
      return parseFloat(d.total);
    });

    colorScale = d3version3.scale
      .quantile()
      .domain(
        d3version3.range(buckets+1).map(function(d) {
          return ((d) / buckets) * maxTotal;
        })
      )
      .range(colors);

    y = d3version3.scale
      .linear()
      .domain([0, maxTotal])
      .range([0, 200]);

    yAxis = d3version3.svg
      .axis()
      .scale(y)
      .tickValues(colorScale.domain())
      .orient("right");

      //Adding legend for our Choropleth

    legend = india
    .append("g")
    .attr("class", "key")
    .attr("transform", "translate(370, 255)")
    .call(yAxis);
  }

  function create_states(json)
  {
    india
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", colors[0])
      .style("opacity", 1)

      .on("click", function(d, i) {
        d3version3
          .select(this)
          .transition()
          .duration(300)
          .style("opacity", 1);
        show_tooltip(d);  
        console.log(d);
        AppState.setState(d.id);
        CrimeTrendChart.set_plot(d.id);
        // d3version5
        //   .selectAll("rect")
        //   .dispatch("onMapClicked", {
        //     detail: { state: "Assam", crimeCount: 1716 }
        //   });
      })

      .on("mouseleave", function(d, i) {
        d3version3
          .select(this)
          .transition()
          .duration(300)
          //.style("opacity", 0.5);
          .style("stroke", "black")
          .style("stroke-width", "unset");
        hide_tooltip();
      })
      .on("mouseenter", function(d, i) {
        d3version3
          .select(this)
          .transition()
          .duration(300)
          //.style("opacity", 0.5);
          .style("stroke", "skyblue")
          .style("stroke-width", 1.5);
        show_tooltip(d);
      });

      // for tool tip. maintain a dict between state name and element
      india
      .selectAll("path").each(function (d,i)
      {
        path_dict[d.id] = this;
      });
  }

  function highlight_state(state)
  {
    var state_element = path_dict[state];
    scale_string = getElementScaleString(state_element, 2);
    d3version3.select(state_element)
    .transition()
    .duration(100)
    .style("stroke", "black")
    .style("stroke-width", 3);
    //.attr("transform", scale_string)
    //.style("position", "relative")
    //.style("z-index", 100)
  }

  function getElementScaleString(element, scale)
  {
    var bbox = element.getBBox();//.getBoundingClientRect();
    scale_string = 
    //"translate(" + (bbox["x"]) + "," +  (bbox["y"]) + ") " +
    // "scale(" + scale + "," + scale + ") " + 
    //"translate(" + (bbox["x"]) + "," +  (bbox["y"]) + ")";
    "translate(" + ((1-scale)*bbox["x"]) + "," +  ((1-scale)*bbox["y"]) + ")" 
    + " scale(" + scale + "," + scale + ") " ;
    return scale_string;
  }

  function unhighlight_state(state)
  {
    var state_element = path_dict[state];
    scale_string = getElementScaleString(state_element, 1);
    d3version3.select(state_element)
    .transition()
    .duration(300)
    .attr("transform", scale_string)
    .style("stroke", "black")
    .style("stroke-width", "unset");
  }

  function show_tooltip(d)
  {
    div
    .transition()
    .duration(300)
    .style("opacity", 0.8);
    div
      //.text(d.id + " : <br> " + d.total) // previous tooltip just had text
      .style("left", d3version3.event.pageX + 10 + "px")
      .style("top", d3version3.event.pageY - 100 + "px");
    
    stats = ""
    current_year = AppState.getyear();
    current_scene = AppState.getCurrentScene();
    intensity_type = AppState.getIntensitytype();
    if(current_scene == "Explore"){
        total_crime = AppState.getCrimeForSpecificStateAndYear(d.id, current_year);
        crime_rate = total_crime/AppState.getPopupulation(d.id, current_year);
        crime_rate = crime_rate.toFixed(2);
        
        if(intensity_type == "Crime Rate")
          stats =  "Crime Rate: " + crime_rate;
        else
          stats = "Cases Reported: " + total_crime;
      }
    else{
        scenesData = AppState.getScenesData();
        total_crime = scenesData[current_year][d.id][current_scene + "-Cases-Reported"];
        crime_rate = scenesData[current_year][d.id][current_scene];

        if(intensity_type == "Crime Rate")
          stats =  "Crime Rate: " + crime_rate;
        else
          stats = "Cases Reported: " + total_crime;
      }

    div.html(    
        "<strong><h5>" + d.id + "<h5></strong> <span style='color:red'>" +
        "<b>" + stats + "</b>" +
        "</span>"
      );
  }

  function hide_tooltip()
  {
    div
    .transition()
    .duration(300)
    .style("opacity", 0);
  }

  function initialize() {
    proj.scale(5200);
    proj.translate([-940, 570]);
  }

  //deprecated - gives sum of crimes from all years
  function set_crime(){
    for (var i = 0; i < json.features.length; i++)
    {
      state = json.features[i]["id"];
      total_crime = AppState.getCrimeForSpecificState(state);
      json.features[i]["total"] = total_crime.toString();
    }
    //return json;
  }

  function set_crime_and_year(year){

    var intensity_type = AppState.getIntensitytype();
    for (var i = 0; i < json.features.length; i++)
    {
      state = json.features[i]["id"];
      total_crime = AppState.getCrimeForSpecificStateAndYear(state, year);
      if(intensity_type == "Crime Rate")
        total_crime = total_crime/ AppState.getPopupulation(state, year);
      json.features[i]["total"] = total_crime.toString();
    }
    //return json;
  }

  return {
    init_map: init_map,
    set_choropleth_crime: set_choropleth_crime,
    set_choropleth_crime_and_year: set_choropleth_crime_and_year,
    set_choropleth_by_scene_and_year: set_choropleth_by_scene_and_year,
    highlight_state: highlight_state,
    unhighlight_state: unhighlight_state
  };
})();
