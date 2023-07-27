export function drawBarChart(svg, data, width, height) {
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold");

    var margin = { top: 20, right: 20, bottom: 70, left: 60 },
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    data = data.filter(d => !isNaN(parseFloat(d.value)));

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(d => d.name));

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => parseFloat(d.value))]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#244C3F")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("dy", "1em")
        .attr("text-anchor", "end")
        .style("font-weight", "bold")
        .text("% of recommended daily intake");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("fill", "#244C3F")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", "#244C3F")
        .transition()
        .duration(1000)
        .attr("y", d => y(parseFloat(d.value)))
        .attr("height", d => height - y(parseFloat(d.value)));
}
