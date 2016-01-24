
d3.csv("data/measures.csv", function(error, data) {
	data.forEach(function(d) {
		d.Height = +d.Height;
		d.Weight = +d.Weight;
	});


	var padding = 50, w = window.innerWidth - 100, h = window.innerHeight - 100;

	var xScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d) { return d.Height; })])
							.range([padding, w - padding]);

	var yScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d) { return d.Weight; })])
							.range([h - padding, padding]);

	var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom");

	var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left");

	var svg = d3.select("#chart")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	var line_svg = d3.svg.line()
							.interpolate("basis")
							.x(function(d) { return xScale(d.Height); })
							.y(function(d) { return yScale(d.Weight); });

	svg.append("path")
		.attr("class", "line_path")
		.attr("d", line_svg(data)); 

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return xScale(d.Height) })
		.attr("cy", function(d) { return yScale(d.Weight) })
		.attr("r", 5);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

})
