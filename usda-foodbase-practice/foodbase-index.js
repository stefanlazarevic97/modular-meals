
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
        data.foods.forEach((food, i) => {
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

            // Create an svg element to hold the pie chart
            var width = 500;
            var height = 500;
            var svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
            document.getElementById(`result-${i}`).append(svg.node());

            // Create a pie chart for the macronutrients
            var macronutrients = ['Protein', 'Fat', 'Carbohydrates'];
            drawPieChart(svg, macronutrients.map(n => nutrientPercents[n]), width, height);

            // Create a pie chart for the other nutrients
            var otherNutrients = Object.keys(nutrientPercents).filter(n => !macronutrients.includes(n));
            drawPieChart(svg, otherNutrients.map(n => nutrientPercents[n]), width, height);
        });
    } else {
        resultDiv.innerHTML = 'No results found';
    }
}

function drawPieChart(svg, data, width, height) {
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeCategory10);

    var pie = d3.pie();
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2);

    svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("fill", d => color(d.data))
        .attr("d", arc)
        .append("title")
        .text(d => `${d.data.toFixed(2)}%`);
}