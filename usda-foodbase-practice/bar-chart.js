export function drawBarChart(svg, data, width, height) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    data = data.filter(d => !isNaN(d.value));

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(d => d.name));

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => d.value)]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("% of recommended daily intake");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    console.log('Data:', data);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");
}