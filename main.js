;

chartModule = 
(function() {

	var margin = { top: 10, right: 10, bottom: 30, left: 50 };
	var width = 400;
	var height = 350;
	padding=0.2;

	var dataXRange = { min: 2001, max: 2010};
	var dataYRange = { min: 0, max: 100 };
	var xAxisLabelHeader = "Year";
	var yAxisLabelHeader = "Reported Number of Kidnappings";
	var circleRadius = 4;

	var data;
	var states = [];
	var crimeBuckets = [];
	var crimePurposeList = [];
	var chart;
	var chartWidth;
	var chartHeight;
	var selected_purpose="For Illicit Intercourse"
	var selected_state="Assam"
	var chartTitle = "State: " + selected_state + " Kidnapping Purpose: " + selected_purpose

	//init();




	var getStateCrime = function (state, crimePurpose)
	{
		state_crime = []
		for (var year in data)
		{
			if (year == "Column_Names")
			continue;
			var year_data = data[year]
			var state_data = year_data[state]
			state_crime.push({
				"xVal": year,
				"yVal": state_data[crimePurpose][8]});
		}
		return state_crime;

	}

	function getStateNames()
	{


		for (var state in data["2001"]){
			states.push(state);
		}
		console.log(states)

	}

	function getCrimePurpose()
	{
		for (var purpose in data["2001"]["Rajasthan"]){
			crimePurposeList.push(purpose);
		}
		console.log(crimePurposeList)
	}

	function getCrimeBuckets()
	{
		crimeBuckets = data["Column_Names"]
		console.log(crimeBuckets);
	}

	var init = function () {

		console.log("initiating!")

		chartWidth = width - margin.left - margin.right;
		chartHeight = height - margin.top - margin.bottom;

		// load data from json
		d3version5.json("./result.json").then(function(json){

			data = json;
			console.log("data loaded");
			initializeChart();
			createAxes();

			getStateNames();
			getCrimePurpose();
			getCrimeBuckets();

			initializeUI();

			// hint HERE!
			// you could load more data here using d3version5.json() again...

		}).catch(function(error) {console.warn(error)})

	}//end init


	function initializeUI()
	{
		console.log("state1:"+states[1])
		// d3version5.select("#state_list").enter().append("li").text(states[1]+"")
		for(var i=0;i<states.length;i++){
		 $("#state_list").append(" <li id=\"state\">"+states[i]+"</li>");}
		 console.log(crimePurposeList)
		 for(var i=0;i<crimePurposeList.length;i++){
			$("#purpose_list").append(" <li id=\"purpose\">"+crimePurposeList[i]+"</li>");}

		 li=d3version5.selectAll("li")
		 li.on("click",function(){

		 	var clickedon=d3version5.select(this)
		 	var which = d3version5.select(this).attr("id")
		 	if(which=="state"){
		 		var text=clickedon.text()
		 		selected_state=text;
		 	console.log(clickedon.text());
		 	set_plot(selected_state,selected_purpose);}
		 	else if(which=="purpose"){
		 		console.log(clickedon.text())
		 		var text=clickedon.text()
		 		selected_purpose=text
		 		set_plot(selected_state,selected_purpose);
		 	}
		 })

		 set_plot(selected_state,selected_purpose);
	}

	var set_plot = function(sel_state,sel_purp)
	{
		state_crime = getStateCrime(sel_state,sel_purp);

		reinitializeChart(state_crime);
		drawDots(state_crime);
		drawlinecurve(state_crime);
	}

	function initializeChart() {
		chart = d3version5.select("#my_dataviz").append("svg")
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

		chartTitle = "State: " + selected_state + " Kidnapping Purpose: " + selected_purpose
		chart.title.text(chartTitle);
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
			.attr("transform", "translate(" + (margin.left / 2.0) + ", " + (chartHeight / 2.0) + ") rotate(-90)")
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
		.attr("d", line); // 11. Calls the line generator
		
		d3.selectAll("line").style("stroke", "#ff5e57");

	}
// })();

// Saurabh 

return {
    init: init,
    set_plot: set_plot
  }


})();
chartModule.init();