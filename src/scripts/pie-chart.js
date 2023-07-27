export function drawPieChart(svg, data, width, height, nutritionObj) {
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold");

    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeSet3);

    var pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var labelArc = d3.arc()
        .outerRadius(radius * 0.6)
        .innerRadius(radius * 0.6);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arcs.append("path")
        .style("fill", d => color(d.data.name))
        .transition()
        .delay((d, i) => i * 500)
        .duration(500)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            }
        });

    arcs.each(function (d) {
        var label = d3.select(this).append("text")
            .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "12px");
        var name = d.data.name + ': ' + parseFloat(d.data.value).toFixed(0) + ' g',
            additional = [];

        if (d.data.name === 'Carbohydrates') {
            if (!isNaN(nutritionObj.Fiber)) additional.push('Fiber: ' + parseFloat(nutritionObj.Fiber).toFixed(0) + ' g');
            if (!isNaN(nutritionObj.Sugar)) additional.push('Sugar: ' + parseFloat(nutritionObj.Sugar).toFixed(0) + ' g');
        } else if (d.data.name === 'Fat') {
            if (!isNaN(nutritionObj.Saturated)) additional.push('Saturated Fat: ' + parseFloat(nutritionObj.Saturated).toFixed(0) + ' g');
            if (!isNaN(nutritionObj.Trans)) additional.push('Trans Fat: ' + parseFloat(nutritionObj.Trans).toFixed(0) + ' g');
        }

        label.append("tspan")
            .style("font-weight", "bold")
            .attr("dy", "0.6em")
            .text(name);

        additional.forEach(function (add, i) {
            label.append("tspan")
                .attr("x", 0)
                .attr("dy", "1.2em")
                .style("font-weight", "normal")
                .text(add);
        });
    });
}
