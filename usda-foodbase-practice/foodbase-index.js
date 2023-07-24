const apiKey = 'UbpcAswEuzbbCwPhKaJdUxIkeAMUean4rUUDq9ij'
const width = 500;
const height = 500;

document.getElementById("searchButton").addEventListener("click", function () {
    const ingredient = document.getElementById("ingredientInput").value;
    
    if (ingredient) {
        fetchNutritionData(ingredient);
    }
});

function fetchNutritionData(ingredient) {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
}

function displayResults(data) {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    if (data.foods && data.foods.length > 0) {
        var food = data.foods[0]; // We take only the first result

        var nutrientObj = createNutrientObject(food);
        var nutrientPercents = calculatePercentages(nutrientObj);

        // Display total calories
        var caloriesDiv = document.createElement('h2');
        caloriesDiv.innerHTML = `Total Calories: ${nutrientObj.Calories}`;
        resultDiv.append(caloriesDiv);

        // Create an SVG element for the pie chart
        var svgPie = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        resultDiv.append(svgPie.node());

        var macronutrients = ['Protein', 'Fat', 'Carbohydrates'];
        drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutrientPercents[n] })), width, height, nutrientObj);

        // Create an SVG element for the bar chart
        var svgBar = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        resultDiv.append(svgBar.node());

        var otherNutrients = Object.keys(nutrientPercents).filter(n => !macronutrients.includes(n));
        drawBarChart(svgBar, otherNutrients.map(n => ({ name: n, value: nutrientPercents[n] })), width, height);
    } else {
        resultDiv.innerHTML = 'No results found';
    }
}

// Helper function to create an object containing nutrient values
function createNutrientObject(food) {
    return {
        'Calories': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy')?.value,
        'Protein': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein')?.value,
        'Fat': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)')?.value,
        'Carbohydrates': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference')?.value,
        'Sugar': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Sugars, total including NLEA')?.value,
        'Fiber': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Fiber, total dietary')?.value,
        'Cholesterol': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Cholesterol')?.value,
        'Sodium': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Sodium, Na')?.value,
        'Potassium': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Potassium, K')?.value,
        'Vitamin A': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Vitamin A, RAE')?.value,
        'Vitamin C': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Vitamin C, total ascorbic acid')?.value,
        'Calcium': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Calcium, Ca')?.value,
        'Iron': food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Iron, Fe')?.value
    };
}

function calculatePercentages(nutrientObj) {
    var dailyIntake = {
        'Calories': 2000,
        'Protein': 50,
        'Fat': 70,
        'Carbohydrates': 300,
        'Sugar': 37.5,
        'Fiber': 30,
        'Cholesterol': 300,
        'Sodium': 2300,
        'Potassium': 4700,
        'Vitamin A': 900,
        'Vitamin C': 90,
        'Calcium': 1300,
        'Iron': 18
    };

    var nutrientPercents = {};
    for (let nutrient in nutrientObj) {
        nutrientPercents[nutrient] = nutrientObj[nutrient] / dailyIntake[nutrient] * 100;
    }

    return nutrientPercents;
}

function drawPieChart(svg, data, width, height, nutrientObj) {
    var color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeCategory10);

    var pie = d3.pie()
        .value(d => d.value);

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2);

    var arcs = svg.selectAll(".arc")
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
        .text(d => d.data.name + ': ' + d.data.value.toFixed(2) + '% (' + nutrientObj[d.data.name] + ' g)');
}

function drawBarChart(svg, data, width, height) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

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
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .call(d3.axisLeft(y));

    console.log('Data:', data);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => {
            console.log('d.name:', d.name);
            return x(d.name);
        })
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => {
            console.log('d.value:', d.value); 
            console.log('y(d.value):', y(d.value));
            console.log('height - y(d.value):', height - y(d.value)); 
            return height - y(d.value);
        })
        .attr("fill", "steelblue");
}