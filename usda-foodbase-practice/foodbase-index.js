import { drawBarChart } from '../src/scripts/bar-chart.js';
import { drawPieChart } from '../src/scripts/pie-chart.js';
import * as nutrientFunctions from './nutrient-functions.js'

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
        var food = data.foods[0];

        var portionSize = "The nutrient values are based on the database's standard portion size, 100 grams.";

        if (food.description.toLowerCase().includes("100g")) {
            portionSize = "The nutrient values are for 100g of " + food.description + ".";
        }
        var portionSizeDiv = document.createElement('h2');
        portionSizeDiv.innerHTML = portionSize;
        resultDiv.append(portionSizeDiv);

        var nutrientObj = nutrientFunctions.createNutrientObject(food);
        var nutrientPercents = nutrientFunctions.calculatePercentages(nutrientObj);

        var caloriesDiv = document.createElement('h2');
        caloriesDiv.innerHTML = `Total Calories: ${nutrientObj.Calories}`;
        resultDiv.append(caloriesDiv);

        var svgPie = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

        var macronutrients = ['Protein', 'Fat', 'Carbohydrates'];
        drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutrientObj[n] })), width, height, nutrientObj);
        resultDiv.append(svgPie.node());

        var svgBar = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

        var otherNutrients = Object.keys(nutrientPercents).filter(n => !macronutrients.includes(n));
        delete nutrientPercents['Calories'];
        drawBarChart(svgBar, otherNutrients.map(n => ({ name: n, value: nutrientPercents[n] })), width, height);
        resultDiv.append(svgBar.node());
    } else {
        resultDiv.innerHTML = 'No results found';
    }
}