export function drawPieChart(svg, data, width, height, nutrientObj) {
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeCategory10);

    var pie = d3.pie()
        .value(d => d.value);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.name));

    arcs.append("text")
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(d => d.data.name + ': ' + d.data.value.toFixed(2) + ' g');
}