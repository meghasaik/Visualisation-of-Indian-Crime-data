;

ArrestedAndConvictedChart = (function() {

  function clear_chart()
  {
    d3version4.select("#gchart").select('svg').remove();
  }

  function init(csv_file){

    clear_chart();
    // variable for tooltip 
    var divTooltip = d3version4.select("div.tooltip")

    // selecting a svg and appending a group tag to it also setting up 
    // margins, width and height for inner drawing space
    var svg = d3version4.select("#gchart").append("svg:svg")  .attr("width", 700)
    .attr("height", 250),
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom


    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // because the plot is grouped by months and then by weekdays it has two scales for the x axis
    // creating x0 scale which is grouped by months
    var x0 = d3version4.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    // creating x1 scale which is grouped by days of week
    var x1 = d3version4.scaleBand()
        .padding(0.08);

    // creating a linear scale for y axis
    var y = d3version4.scaleLinear()
        .rangeRound([height, 0]);

    // creating an ordinal scale for color that is going to represent different days of week
    var z = d3version4.scaleOrdinal()
        .range(['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494']);


    // reading csv data
    d3version4.csv(csv_file, function(d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i)
            d[columns[i]] = +d[columns[i]];
        //console.log(+d[columns[i]])
        return d;
    }, function(error, data) {
        if (error) throw error;
        // creating var keys containing array of names of days
        var keys = data.columns.slice(1)
        // setting up domain for x0 as a list of all the names of months
        x0.domain(data.map(function(d) {
            //console.log(d.Month);
            return d.Month;
        }));
        // setting up domain for x1 as a list of all the names of days
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        // setting up domain for y which will be from 0 to max day of week for any month
        y.domain([0, d3version4.max(data, function(d) {
            return d3version4.max(keys, function(key) {
                return d[key];
            });
        })]).nice()
        // binding data to svg group elements
        g.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                //console.log(x0(d.Month));
                return "translate(" + x0(d.Month) + ",0)";
            })
            .attr("class", "days")
            // binding days of week data to rectangles
            .selectAll("rect")
            .data(function(d) {
                return keys.map(function(key) {
                    //console.log({ key: key, value: d[key] });
                    return {
                        key: key,
                        value: d[key]
                    };
                });
            })
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                //console.log(x1(d.key));
                return x1(d.key);
            })
            .attr("width", x1.bandwidth())
            .attr("fill", function(d) {
                //console.log(z(d.key));
                return z(d.key);
            })
            // setting up y coordinates and height position to 0 for transition
            .attr("y", function(d) {
                return y(0);
            })
            .attr("height", function(d) {
                return height - y(0);
            })
            // setting up tooltip and interactivity
            .on("mouseover", function(d) {
                //divTooltip.attr("class", "d3-tip")
                divTooltip.style("left", d3version4.event.pageX - 80  + "px")
                divTooltip.style("bottom", d3version4.event.pageY + 100  + "px")
                divTooltip.style("display", "inline-block")
                divTooltip.style("opacity", "0.9")
                
                var x = d3version4.event.pageX,
                    y = d3version4.event.pageY;
                var elements = document.querySelectorAll(":hover");
                var l = elements.length - 1;
                var elementData = elements[l].__data__;
                //console.log(elementData)
                divTooltip.html(elementData.key + ": " + elementData.value);
                d3version4.select(this)
                    .attr("fill", "#F8786B")
                    //.style("opacity", "0.7")
                    .style("stroke", "Black")
                    .style("stroke-width", "1.8px")
                    .style("stroke-opacity", "1");

            })
            .on("mouseout", function(d) {
                divTooltip.style("display", "none")
                d3version4.select(this).transition().duration(250)
                    .attr("fill", z(d.key))
                    //.style("opacity", "1")
                    .style("stroke-opacity", "0");
            })
            // setting up transition, delay and duration
            .transition()
            .delay(function(d) {
                return Math.random() * 250;
            })
            .duration(1000)
            // setting up normal values for y and height
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("height", function(d) {
                return height - y(d.value);
            });

        // setting up x axis    
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            // setting up x axis opacity to 0 before transition
            .style("opacity", "0")
            .call(d3version4.axisBottom(x0));
        // setting up transiton for x axis
        g.select(".x")
            .transition()
            .duration(500)
            .delay(800)
            // setting up full opacity after transition 
            .style("opacity", "1")

        // setting up y axis    
        g.append("g")
            .attr("class", "y axis")
            // setting up y axis opacity to 0 before transition
            .style("opacity", "0")
            .call(d3version4.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", -10)
            .attr("y", y(y.ticks().pop()) -60)
            .attr("dy", "0.90em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .text("Perpetrators Arrested");
        // setting up y axis transition    
        g.select(".y")
            .transition()
            .duration(500)
            .delay(1300)
            // setting up full opacity after transition
            .style("opacity", "1")

        // setting a legend and binding legend data to group    
        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice())
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(0," + i * 13 + ")";
            })
            // setting up opacity to 0 before transition
            .style("opacity", "0");

        // setting up rectangles for the legend    
        legend.append("rect")
            .attr("x", width - 19)
            .attr("y", -22)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", z);
        // setting up legend text    
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", -15)
            .attr("dy", "0.32em")
            .text(function(d) {
                return d;
            });
        // setting transition delay and duration for all individual elements for the legend    
        legend.transition()
            .duration(300)
            .delay(function(d, i) {
                return 1300 + 100 * i;
            })
            // setting up opacity back to full
            .style("opacity", "1");

    });

}

return{
    init: init
};

})();