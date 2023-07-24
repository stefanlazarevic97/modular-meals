
const apiKey = 'UbpcAswEuzbbCwPhKaJdUxIkeAMUean4rUUDq9ij'

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
        var food = data.foods[0];  // Only pick the first food item

        var nutrientObj = {
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

        // Calculate the percentage of the daily recommended intake for each nutrient
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

        // Create a new div for this food item
        var foodDiv = document.createElement("div");
        foodDiv.id = `result`;
        resultDiv.append(foodDiv);

        // Create an svg element to hold the pie chart
        var width = 500;
        var height = 500;
        var svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
        foodDiv.append(svg.node());

        // Create a pie chart for the macronutrients
        var macronutrients = ['Protein', 'Fat', 'Carbohydrates'];
        drawPieChart(svg, macronutrients.map(n => ({ name: n, value: nutrientPercents[n] })), width, height);

        // Create a pie chart for the other nutrients
        var otherNutrients = Object.keys(nutrientPercents).filter(n => !macronutrients.includes(n));
        drawPieChart(svg, otherNutrients.map(n => ({ name: n, value: nutrientPercents[n] })), width, height);
    } else {
        resultDiv.innerHTML = 'No results found';
    }
}

function drawPieChart(svg, data, width, height) {
    var color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeCategory10);

    var pie = d3.pie().value(d => d.value);
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2);
    var labelArc = d3.arc().innerRadius(Math.min(width, height) / 2 * 0.6).outerRadius(Math.min(width, height) / 2);

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    g.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toFixed(2)}%`);

    g.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.name);
}