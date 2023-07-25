export function drawBarChart(svg, data, width, height) {
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Micronutrient Breakdown");
    
    var margin = { top: 20, right: 20, bottom: 50, left: 60 },
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
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10) // move y-axis label outside the axis
        .attr("dy", "1em") // center y-axis label
        .attr("text-anchor", "end")
        .style("font-weight", "bold")
        .text("% of recommended daily intake");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill", "#000")
        .attr("x", width / 2) // center x-axis label
        .attr("y", margin.bottom) // position x-axis label
        .attr("dy", "-1em") // offset x-axis label
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Micronutrients"); // add x-axis label

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(parseFloat(d.value)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(parseFloat(d.value)))
        .attr("fill", "hsl(173, 90%, 15%)"); 
}
