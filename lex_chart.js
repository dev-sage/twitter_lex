d3.csv("data/word_frame.csv", function(error, data) {
	data.forEach(function(d) {
		d.a = +d.a;
		d.and = +d.and;
		d.the = +d.the;
		d.hello = +d.hello;
		d.car = +d.car;
		d.dog = +d.dog;
	});

	var time_series = Array();
	for(i = 0; i < data.length; i++) {
		time_series[i] = [{time: 1, value: data[i].a}, 
						  {time: 2, value: data[i].and},
						  {time: 3, value: data[i].the},
						  {time: 4, value: data[i].hello},
						  {time: 5, value: data[i].car},
						  {time: 6, value: data[i].dog}];
	}


	var $message;
	function pull_author(time1) {
		$message = $("<div id = 'message'></div>");
		$("body").append($message);
		$message.append("<center> @" + time1[0].value + "</center>");
	}

	function remove_author() {
		$message.remove();
	}


	var padding = 50, w = window.innerWidth * 0.75, h = window.innerHeight - 100;

	var xScale = d3.scale.linear()
							.domain([1, d3.max(data, function(d) { return 6; })])
							.range([padding, w - padding]);

	var yScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d) { return d.dog; })])
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
							.x(function(d) { return xScale(d.time); })
							.y(function(d) { return yScale(d.value); });

	svg.selectAll(".line")
		.data(time_series)
		.enter()
		.append("path")
		.attr("class", "line_path")
		.attr("d", line_svg)
		.on("mouseover", pull_author)
		.on("mouseout", function(datum) { remove_author(datum) });

	/*svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return xScale(d.Height) })
		.attr("cy", function(d) { return yScale(d.Weight) })
		.attr("r", 5);*/ 

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

})
