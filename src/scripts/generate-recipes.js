import { drawPieChart } from "./pie-chart.js";
import { drawBarChart } from "./bar-chart.js";
import { capitalizeFirstLetter } from "./util.js";
import * as maps from "./maps.js";
import * as nutrition from "./nutrition.js";
import { fetchAPI } from "../index.js";
import { lastSearchParams } from "../index.js";

const nutritionId = '0cc0aea0';
const nutritionKey = '1e077dc53566f535c8e43010f6e729d5';
const searchResultDiv = document.querySelector('.search-result');

export function generateHTML(results) {
    let newHTML = '';

    newHTML += `
        <button class="find-more-recipes-button">
            <ion-icon class="refresh-icon" name="refresh-outline"></ion-icon>
        </button>
    `;

    results.map((result, index) => {
        const caloriesPerServing = (result.recipe.calories / result.recipe.yield).toFixed(0);
        const carbsPerServing = (result.recipe.totalNutrients.CHOCDF.quantity / result.recipe.yield).toFixed(0);
        const proteinPerServing = (result.recipe.totalNutrients.PROCNT.quantity / result.recipe.yield).toFixed(0);
        const fatPerServing = (result.recipe.totalNutrients.FAT.quantity / result.recipe.yield).toFixed(0);

        newHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="${result.recipe.label}">
                
                <div class="recipe-info">
                    <h1 class="title">${result.recipe.label}</h1>
                    <div class="button-container">
                        <a class="view-recipe-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                        <button class="modify-recipe-button" data-recipe-id="${index}">Modify Recipe</button>
                    </div>
                    <div class="servings">Servings: ${result.recipe.yield.toFixed(0)}</div>
                </div>

                <table class="item-data">
                    <thead>
                        <tr>
                            <th>Nutrient</th>
                            <th>Value/Serving</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Calories</td>
                            <td>${caloriesPerServing}</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates</td>
                            <td>${carbsPerServing}g</td>
                        </tr>
                        <tr>
                            <td>Protein</td>
                            <td>${proteinPerServing}g</td>
                        </tr>
                        <tr>
                            <td>Fat</td>
                            <td>${fatPerServing}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    })

    
    const oldButton = document.querySelector('.find-more-recipes-button');
    if (oldButton) {
        oldButton.remove();
    }

    searchResultDiv.innerHTML = newHTML;

    document.querySelector('.find-more-recipes-button').addEventListener('click', () => fetchAPI(lastSearchParams, true));
    document.querySelector('.search-form').style.display = 'none';
    document.querySelector('.back-to-search').classList.remove('hidden');
    document.querySelector('.back-to-search').classList.add('visible');
    document.querySelector('.back-to-search').removeAttribute('disabled');
    
    if (results.length === 0) {
        searchResultDiv.innerHTML = '<div class="no-results">There are no results that match your search.</div>';
        searchResultDiv.style.display = 'flex';
        searchResultDiv.style.justifyContent = 'center';
        searchResultDiv.style.alignItems = 'center';
        searchResultDiv.style.height = '50vh';
        return;
    }

    searchResultDiv.removeAttribute('style'); 

    function checkAndToggleCharts() {
        const tableRows = document.querySelectorAll('table tr');
        const caloriesDiv = document.querySelector('.calories');

        if (tableRows.length <= 1) {
            document.querySelector('.pie-chart').style.display = 'none';
            document.querySelector('.bar-chart').style.display = 'none';
            caloriesDiv.innerHTML = '';
        } else {
            document.querySelector('.pie-chart').style.display = 'block';
            document.querySelector('.bar-chart').style.display = 'block';
        }
    }

    document.querySelectorAll('.modify-recipe-button').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const recipeId = event.target.dataset.recipeId;
            const selectedRecipe = results[recipeId].recipe;

            searchResultDiv.innerHTML = '';
            searchResultDiv.style.display = 'none';

            var searchForm = document.querySelector('.search-form');
            searchForm.innerHTML = '';

            let ingredientObj = nutrition.getNutritionalInformation(selectedRecipe);
            let nutritionObj = nutrition.createNutritionObject(selectedRecipe, maps.RDI);

            var pieChartDiv = document.querySelector('.pie-chart');
            var barChartDiv = document.querySelector('.bar-chart');   
            document.querySelector('.pie-chart').style.display = 'block';
            document.querySelector('.bar-chart').style.display = 'block';
            
            var ingredientsDiv = document.querySelector('.ingredients-list');
            ingredientsDiv.innerHTML = '';
            
            var caloriesDiv = document.querySelector('.calories');         
            caloriesDiv.innerHTML = `Calories per Serving: ${nutritionObj.Calories}`;
            
            let tableHTML = `
                <a class="view-selected-recipe-button" href="${selectedRecipe.url}" target="_blank">${selectedRecipe.label}</a>
            `

            tableHTML += `
                <table>
                    <tr>
                        <th>Ingredient</th>
                        <th>Weight (g)</th>
                        <th>Actions</th>
                    </tr>
                `;

            Object.entries(ingredientObj).forEach(([ingredient, weight]) => {
                tableHTML += `
                    <tr>
                        <td>${capitalizeFirstLetter(ingredient)}</td>
                        <td>${Math.floor(weight)}</td>
                        <td>
                            <button class="remove-button">Remove Ingredient</button>
                        </td>
                    </tr>
                `;
            });

            tableHTML += `
                </table>
                <div class="add-ingredient-div">
                    <input type="text" class="ingredient-input" placeholder="Enter ingredient">
                    <input type="number" class="weight-input" placeholder="Enter weight in grams" min="0">
                    <button class="add-button">Add Ingredient</button>
                </div>
            `;

            ingredientsDiv.innerHTML = tableHTML;

            const nutrientsData = Object.keys(nutritionObj).map(key => ({ name: key, value: nutritionObj[key] }));
            
            const width = 300;
            const height = 300;

            let svgPie = d3.create("svg")
                .attr("width", width)
                .attr("height", height);

            var macronutrients = ['Protein', 'Fat', 'Carbohydrates'];
            drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);
            pieChartDiv.append(svgPie.node());
                        
            let svgBar = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

            var micronutrients = ['Cholesterol', 'Sodium', 'Potassium', 'Magnesium', 'Calcium', 'Iron', 'Zinc', 'VitaminA', 'VitaminE', 'VitaminC', 'VitaminB6', 'VitaminB12', 'VitaminD', 'VitaminK'];
            drawBarChart(svgBar, micronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);
            barChartDiv.append(svgBar.node());

            document.querySelectorAll('.remove-button').forEach(button => {
                button.addEventListener('click', async function (e) {
                    const ingredient = e.target.parentElement.parentElement.children[0].textContent;
                    const weight = e.target.parentElement.parentElement.children[1].textContent;
                    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${nutritionId}&app_key=${nutritionKey}&nutrition-type=cooking&ingr=${ingredient}-${weight}g`);
                    const data = await response.json();
                    nutritionObj = nutrition.subtractNutrition(nutritionObj, data, maps.RDI, selectedRecipe.yield);
                    caloriesDiv.innerHTML = `Total Calories: ${nutritionObj.Calories}`;

                    svgPie.selectAll("*").remove();
                    drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                    svgBar.selectAll("*").remove();
                    drawBarChart(svgBar, micronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                    e.target.parentElement.parentElement.remove();
                    checkAndToggleCharts();
                });
            });

            document.querySelector('.add-button').addEventListener('click', async () => {
                const ingredientInput = document.querySelector('.ingredient-input').value;
                const weightInput = document.querySelector('.weight-input').value;

                if (!ingredientInput || !weightInput) {
                    alert("Please fill both ingredient and weight fields.");
                    return;
                }

                if (weightInput < 0) {
                    alert("Weight cannot be negative.");
                    return;
                }

                const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${nutritionId}&app_key=${nutritionKey}&nutrition-type=cooking&ingr=${ingredientInput}-${weightInput}g`);
                const data = await response.json();

                nutritionObj = nutrition.addNutrition(nutritionObj, data, maps.RDI, selectedRecipe.yield);

                const newTableRow = document.createElement('tr');
                
                newTableRow.innerHTML = `
                    <td>${capitalizeFirstLetter(ingredientInput)}</td>
                    <td>${Math.floor(weightInput)}</td>
                    <td>
                        <button class="remove-button">Remove Ingredient</button>
                    </td>
                `;

                document.querySelector('table').appendChild(newTableRow);
                checkAndToggleCharts();
                
                caloriesDiv.innerHTML = `Total Calories: ${nutritionObj.Calories}`;

                svgPie.selectAll("*").remove();
                drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                svgBar.selectAll("*").remove();
                drawBarChart(svgBar, micronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                document.querySelectorAll('.remove-button').forEach(button => {
                    button.addEventListener('click', async function (e) {
                        const ingredient = e.target.parentElement.parentElement.children[0].textContent;
                        const weight = e.target.parentElement.parentElement.children[1].textContent;
                        const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${nutritionId}&app_key=${nutritionKey}&nutrition-type=cooking&ingr=${ingredient}-${weight}g`);
                        const data = await response.json();

                        nutritionObj = nutrition.subtractNutrition(nutritionObj, data, maps.RDI, selectedRecipe.yield);

                        caloriesDiv.innerHTML = `Total Calories: ${nutritionObj.Calories}`;

                        svgPie.selectAll("*").remove();
                        drawPieChart(svgPie, macronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                        svgBar.selectAll("*").remove();
                        drawBarChart(svgBar, micronutrients.map(n => ({ name: n, value: nutritionObj[n] })), width, height, nutritionObj);

                        e.target.parentElement.parentElement.remove();
                    });
                });
            });
        });
    });
}