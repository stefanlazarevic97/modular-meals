const searchResultDiv = document.querySelector('.search-result');

export function generateHTML(results) {
    let newHTML = '';

    results.map((result, index) => {
        const caloriesPerServing = (result.recipe.calories / result.recipe.yield).toFixed(0);
        const carbsPerServing = (result.recipe.totalNutrients.CHOCDF.quantity / result.recipe.yield).toFixed(0);
        const proteinPerServing = (result.recipe.totalNutrients.PROCNT.quantity / result.recipe.yield).toFixed(0);
        const fatPerServing = (result.recipe.totalNutrients.FAT.quantity / result.recipe.yield).toFixed(0);

        newHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="">

                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-recipe-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    <button class="modify-recipe-button" data-recipe-id="${index}">Modify Recipe</button>
                </div>
                    
                <p class="item-data">
                    Calories Per Serving: ${caloriesPerServing}
                </p>
                <p class="item-data">
                    Macronutrients Per Serving: ${carbsPerServing}g carbohydrates, ${proteinPerServing}g protein, ${fatPerServing}g fat
                </p>
                <p class="item-data">
                    Servings: ${result.recipe.yield.toFixed(0)}
                </p>
            </div>
        `;
    });

    searchResultDiv.innerHTML = newHTML;

    // Add event listeners to all the "Modify Recipe" buttons
    document.querySelectorAll('.modify-recipe-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const recipeId = event.target.dataset.recipeId;
            const selectedRecipe = results[recipeId].recipe;
            const ingredientObj = getNutritionalInformation(selectedRecipe);
            console.log(ingredientObj);
        });
    });
}

export function getNutritionalInformation(recipe) {
    let ingredientObj = {};

    recipe.ingredients.forEach(ingredient => {
        ingredientObj[ingredient.food] = ingredient.weight;
    });

    return ingredientObj;
}
