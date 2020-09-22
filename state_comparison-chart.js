;

StateCrimeComparisonChart = (function() {
  // var margin = { top: 40, right: 20, bottom: 30, left: 40 };
  var margin = { top: 10, right: 50, bottom: 110, left: 75 };
  var width = 960;
  var height = 600;
  var padding = 0.2;
  var chartWidth;
	var chartHeight;
  var svg;
  var x;
  var y;
  var xAxis;
  var yAxis;
  var yAxisContainer;
  var xAxisContainer;
  var tip;
  tip = d3version3
  .tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function(d,b) {
    return (
      "<strong>" + d.state + ":</strong> <span style='color:red'>" +
      d.crimeCount +
      "</span>"
    );
  });

  function clear_chart()
  {
    $("#comparison_chart svg").remove() 
   }

  function init()
  {
    clear_chart();

    width = document.getElementById("comparison_chart").offsetWidth;
    height = document.getElementById("comparison_chart").offsetHeight;
    
    chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

    var formatPercent = d3version3.format(".0");
    x = d3version3.scale.ordinal().rangeRoundBands([0, chartWidth ], padding);
    y = d3version3.scale.linear().range([chartHeight, 0]);

    xAxis = d3version3.svg
      .axis()
      .scale(x)
      .orient("bottom");

    yAxis = d3version3.svg
      .axis()
      .scale(y)
      .orient("left")
      .tickFormat(formatPercent)
      //.tickSize(chartWidth/500);



    svg = d3version3
      .select("#comparison_chart")
      .append("svg")
      // .attr("width", width + margin.left + margin.right)
      // .attr("height", height + margin.top + margin.bottom)
      //saurabh
      .attr("width", width)
      .attr("height", height)
      
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    xAxisContainer = svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        //.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
        .call(xAxis);
        //saurabh
        xAxisContainer.selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

      yAxisContainer = svg
        .append("g")
        .attr("class", "y axis")
        //saurabh
        //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        
        .call(yAxis);
        yAxisContainer.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(""); //"Frequency"
   
    set_plot("Rape");
  }

  function set_plot(crime_type) {

    data = AppState.getStateWiseCrimeDataByCrimeTypeV2(crime_type);

    svg.selectAll(".barc").remove();
    //svg.selectAll("text").remove();
    
      x.domain(
        data.map(function(d) {
          return d.state;
        })
      );
      y.domain([
        0,
        d3version3.max(data, function(d) {
          return d.crimeCount;
        })
      ]);

      yAxis.scale(y);
      yAxisContainer.call(yAxis);
      xAxis.scale(x);
      xAxisContainer.call(xAxis).selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");;

      // svg
      //   .append("g")
      //   .attr("class", "x axis")
      //   .attr("transform", "translate(0," + chartHeight + ")")
      //   //.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
      //   .call(xAxis)
      //   //saurabh
      //   .selectAll("text")
      //   .attr("y", 0)
      //   .attr("x", 9)
      //   .attr("dy", ".35em")
      //   .attr("transform", "rotate(45)")
      //   .style("text-anchor", "start");

      // svg
      //   .append("g")
      //   .attr("class", "y axis")
      //   //saurabh
      //   //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        
      //   .call(yAxis)
      //   .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", ".71em")
      //   .style("text-anchor", "end")
      //   .text(""); //"Frequency"

      svg
        .selectAll("barc")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "barc")
        .attr("x", function(d) {
          return x(d.state);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
          return y(d.crimeCount);
        })
        .attr("height", function(d) {
          return chartHeight - y(d.crimeCount);
        })
        .on("mouseover", show_tooltip)
        .on("mouseout", hide_tooltip)
        .on("onMapClicked", tip.show);
    }

    function show_tooltip(d, i)
    {
      tip.show(d,i);
      IndiaMapModule.highlight_state(d.state);
    }

    function hide_tooltip(d, i)
    {
      tip.hide();
      IndiaMapModule.unhighlight_state(d.state);
    }

    function scene_plot(scene, year)
    {
      clear_chart();
  
      width = document.getElementById("comparison_chart").offsetWidth;
      height = document.getElementById("comparison_chart").offsetHeight;
      
      chartWidth = width - margin.left - margin.right;
      chartHeight = height - margin.top - margin.bottom;
  
      var formatPercent = d3version3.format(".0");
      x = d3version3.scale.ordinal().rangeRoundBands([0, chartWidth ], padding);
      y = d3version3.scale.linear().range([chartHeight, 0]);
  
      xAxis = d3version3.svg
        .axis()
        .scale(x)
        .orient("bottom");
  
      yAxis = d3version3.svg
        .axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent)
        //.tickSize(chartWidth/500);
  
  
      svg = d3version3
        .select("#comparison_chart")
        .append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        //saurabh
        .attr("width", width)
        .attr("height", height)
        
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      svg.call(tip);
  
      xAxisContainer = svg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + chartHeight + ")")
          //.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
          .call(xAxis);
          //saurabh
          xAxisContainer.selectAll("text")
          .attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".35em")
          .attr("transform", "rotate(45)")
          .style("text-anchor", "start");
  
        yAxisContainer = svg
          .append("g")
          .attr("class", "y axis")
          //saurabh
          //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
          
          .call(yAxis);
          yAxisContainer.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(""); //"Frequency"
     
          data = AppState.getCrimeComparisonChartSceneData(scene, year);
  
          svg.selectAll(".barc").remove();
          //svg.selectAll("text").remove();
          
            x.domain(
              data.map(function(d) {
                return d.state;
              })
            );
            y.domain([
              0,
              d3version3.max(data, function(d) {
                return d.crimeCount;
              })
            ]);
      
            yAxis.scale(y);
            yAxisContainer.call(yAxis);
            xAxis.scale(x);
            xAxisContainer.call(xAxis).selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");;
      
      
            svg
              .selectAll("barc")
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "barc")
              .attr("x", function(d) {
                return x(d.state);
              })
              .attr("width", x.rangeBand())
              .attr("y", function(d) {
                return y(d.crimeCount);
              })
              .attr("height", function(d) {
                return chartHeight - y(d.crimeCount);
              })
              .on("mouseover", show_tooltip)
              .on("mouseout", hide_tooltip)
              .on("onMapClicked", tip.show);
    }

  return {
    init: init,
    set_plot: set_plot,
    scene_plot: scene_plot
  };
})();

