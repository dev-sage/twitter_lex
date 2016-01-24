var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88] ];



var padding = 25, w = window.innerWidth - 100, h = window.innerHeight - 100;

var xScale = d3.scale.linear()
						.domain([0, d3.max(dataset, function(d) { return d[0]; })])
						.range([padding, w - padding]);

var yScale = d3.scale.linear()
						.domain([0, d3.max(dataset, function(d) { return d[1]; })])
						.range([h - padding, padding]);

var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return xScale(d[0]); })
	.attr("cy", function(d) { return yScale(d[1]); })
	.attr("r", 5);


