;

CrimeTrendChart = 
(function() {

	function clear_chart()
	{
	  $("#trend_chart svg").remove() 
	 }

	var margin = { top: 40, right: 10, bottom: 30, left: 75 };
	var width = 580;
	var height = 350;//350
	padding=0.2

	var dataXRange = { min: 2001, max: 2012};
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "Year";
	var yAxisLabelHeader = "Reported Number of Cases";
	var circleRadius = 4;

	var crimeBuckets = [];
	var chart;
	var chartWidth;
	var chartHeight;
	var chartTitle = "";//"State: " + selected_state + " Kidnapping Purpose: " + selected_purpose

	var init = function () {

		clear_chart();

		console.log("initiating!")

		width = document.getElementById("trend_chart").offsetWidth-30
		height = document.getElementById("trend_chart").offsetHeight

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		initializeChart();
		createAxes();
		initializeUI();



	}


	function initializeUI()
	{
		crimePurposeList = AppState.getCrimesList();
		states = AppState.getStateNames();

		 selected_state = AppState.getSelectedState();
		 selected_purpose = AppState.getSelectedCrime();

		console.log(selected_state+","+selected_purpose);
		 set_plot(selected_state,selected_purpose);
	}

	var set_plot = function(sel_state,sel_purp)
	{
		if (sel_purp == null)
		sel_purp = AppState.getSelectedCrime();

		state_crime = AppState.getCrimeTrend(sel_state,sel_purp);

		reinitializeChart(state_crime);
		drawDots(state_crime);
		drawlinecurve(state_crime);
	}

	function initializeChart() {
		chart = d3version5.select("#trend_chart").append("svg")
			.attr("width", width)
			.attr("height", height);

		chart.plotArea = chart.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}

	function reinitializeChart(dataset)
	{
		chart.plotArea.selectAll(".dot").remove();
		chart.plotArea.selectAll("path").remove();

		chart.yScale.domain([0, d3version5.max(dataset, function(d) {return d.yVal;})])
		chart.yAxis.scale(chart.yScale)
		chart.yAxisContainer.call(chart.yAxis)

		// chartTitle = "State: " + selected_state + " Kidnapping Purpose: " + selected_purpose
		// chart.title.text(chartTitle);
		chart.title.text("");
	}

	function createAxes() {

		// x axis
		chart.xScale = d3version5.scaleLinear()
			.domain([dataXRange.min, dataXRange.max])
			.range([padding, chartWidth-padding]);

		chart.xAxis = d3version5.axisBottom()
			.tickSizeOuter(0)
			.scale(chart.xScale)
			.tickFormat(d3version5.format("d"))

		chart.xAxisContainer = chart.append("g")
			.attr("class", "x axis scatter-xaxis")
			.attr("transform", "translate(" + (margin.left) + ", " + (chartHeight + margin.top) + ")")
			.call(chart.xAxis);

		// x axis header label
		chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight + (margin.bottom / 2.0) + 22) + ")")
			.text(xAxisLabelHeader);

		chart.title = chart.append("text")
			.attr("class", "x axis scatter-xaxis")
			.style("font-size", "12px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left + chartWidth / 2.0) + ", " + (chartHeight*0.85) + ")")
			.text(chartTitle);	

		// y axis labels
		chart.yScale = d3version5.scaleLinear()
			.domain([dataYRange.min, dataYRange.max])
			.range([chartHeight, 0]);

		chart.yAxis = d3version5.axisLeft()
			.scale(chart.yScale);

		chart.yAxisContainer = chart.append("g")
			.attr("class", "y axis scatter-yaxis")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
			.call(chart.yAxis);

		// y axis header label
		chart.append('text')
			.style("font-size", "12px")
			.style("letter-spacing", "1px")
			.attr("class", "heatmap-yaxis")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (margin.left - 100 / 2.0) + ", " + ((chartHeight + 60) / 2.0)  + ") rotate(-90)")
			.text(yAxisLabelHeader);
	}

	function drawDots(plot_data) {

	// plot dots
		// var dots = chart.plotArea.selectAll(".dot").data(plot_data)
		var dots = chart.plotArea.selectAll(".dot").data(plot_data) // Saurabh

		.enter().append("circle")
			  .attr("class", "dot")
			.attr("cx", function(d) { return chart.xScale(d.xVal); })
			.attr("cy", function(d) { return chart.yScale(d.yVal); })
			.attr("r", circleRadius)
			.attr("fill", "#ff5e57")
			.on("click", function(d) {
				console.log("circle: ", d.xVal, ", ", d.yVal);
			});
	}

	function drawlinecurve(plot_data) {
	
		var line = d3version5.line()
	    .x(function(d) { return chart.xScale(d.xVal); }) // set the x values for the line generator
	    .y(function(d) { return chart.yScale(d.yVal); }) // set the y values for the line generator
		//.curve(d3version5.curveMonotoneX) // apply smoothing to the line

		chart.plotArea.append("path")
	    .datum(plot_data) // 10. Binds data to the line
	    .attr("class", "line") // Assign a class for styling
		.attr("d", line) // 11. Calls the line generator
		.style("stroke","#ff5e57")
		
		;

	}
// })();

// Saurabh 

return {
    init: init,
    set_plot: set_plot
  }


})();
//ChartModule1.init();