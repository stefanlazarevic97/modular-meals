const usdaApiKey = 'UbpcAswEuzbbCwPhKaJdUxIkeAMUean4rUUDq9ij';
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

    document.querySelectorAll('.modify-recipe-button').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const recipeId = event.target.dataset.recipeId;
            const selectedRecipe = results[recipeId].recipe;
            const ingredientObj = getNutritionalInformation(selectedRecipe);
            console.log(ingredientObj);
            const nutritionObj = createNutritionObject(selectedRecipe);
            console.log(nutritionObj);
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


export function createNutritionObject(recipe) {
    let servings = recipe.yield;

    // recommended daily intake for micronutrients
    const RDI = {
        'Cholesterol': 300,
        'Sodium': 2300,
        'Potassium': 4700,
        'Magnesium': 420,
        'Calcium': 1000,
        'Iron': 18,
        'Zinc': 11,
        'VitaminA': 900,
        'VitaminE': 15,
        'VitaminC': 90,
        'VitaminB6': 1.7,
        'VitaminB12': 2.4,
        'VitaminD': 20,
        'VitaminK': 120
    };

    return {
        'Calories': (recipe.calories / servings).toFixed(2),
        'Protein': (recipe.totalNutrients.PROCNT.quantity / servings).toFixed(2),
        'Fat': (recipe.totalNutrients.FAT.quantity / servings).toFixed(2),
        'Saturated Fat': (recipe.totalNutrients.FASAT.quantity / servings).toFixed(2),
        'Trans Fat': (recipe.totalNutrients.FATRN.quantity / servings).toFixed(2),
        'Carbohydrates': (recipe.totalNutrients.CHOCDF.quantity / servings).toFixed(2),
        'Sugar': (recipe.totalNutrients.SUGAR.quantity / servings).toFixed(2),
        'Fiber': (recipe.totalNutrients.FIBTG.quantity / servings).toFixed(2),
        'Cholesterol': ((recipe.totalNutrients.CHOLE.quantity / RDI.Cholesterol / servings) * 100).toFixed(2),
        'Sodium': ((recipe.totalNutrients.NA.quantity / RDI.Sodium / servings) * 100).toFixed(2),
        'Potassium': ((recipe.totalNutrients.K.quantity / RDI.Potassium / servings) * 100).toFixed(2),
        'Magnesium': ((recipe.totalNutrients.MG.quantity / RDI.Magnesium / servings) * 100).toFixed(2),
        'Vitamin A': ((recipe.totalNutrients.VITA_RAE.quantity / RDI.VitaminA / servings) * 100).toFixed(2),
        'Vitamin E': ((recipe.totalNutrients.TOCPHA.quantity / RDI.VitaminE / servings) * 100).toFixed(2),
        'Vitamin C': ((recipe.totalNutrients.VITC.quantity / RDI.VitaminC / servings) * 100).toFixed(2),
        'Vitamin B6': ((recipe.totalNutrients.VITB6A.quantity / RDI.VitaminB6 / servings) * 100).toFixed(2),
        'Vitamin B12': ((recipe.totalNutrients.VITB12.quantity / RDI.VitaminB12 / servings) * 100).toFixed(2),
        'Vitamin D': ((recipe.totalNutrients.VITD.quantity / RDI.VitaminD / servings) * 100).toFixed(2),
        'Vitamin K': ((recipe.totalNutrients.VITK1.quantity / RDI.VitaminK / servings) * 100).toFixed(2),
        'Calcium': ((recipe.totalNutrients.CA.quantity / RDI.Calcium / servings) * 100).toFixed(2),
        'Iron': ((recipe.totalNutrients.FE.quantity / RDI.Iron / servings) * 100).toFixed(2),
        'Zinc': ((recipe.totalNutrients.ZN.quantity / RDI.Zinc / servings) * 100).toFixed(2)
    };
}
