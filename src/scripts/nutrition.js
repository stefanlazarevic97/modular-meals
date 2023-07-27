import * as maps from "./maps.js";

export function getNutritionalInformation(recipe) {
    let ingredientObj = {};

    recipe.ingredients.forEach(ingredient => {
        ingredientObj[ingredient.food] = ingredient.weight;
    });

    return ingredientObj;
}

export function createNutritionObject(recipe, RDI) {
    let servings = recipe.yield;

    return {
        'Calories': (recipe.calories / servings).toFixed(0),
        'Protein': (recipe.totalNutrients.PROCNT.quantity / servings).toFixed(0),
        'Fat': (recipe.totalNutrients.FAT.quantity / servings).toFixed(0),
        'Saturated': (recipe.totalNutrients.FASAT.quantity / servings).toFixed(0),
        'Trans': (recipe.totalNutrients.FATRN.quantity / servings).toFixed(0),
        'Carbohydrates': (recipe.totalNutrients.CHOCDF.quantity / servings).toFixed(0),
        'Sugar': (recipe.totalNutrients.SUGAR.quantity / servings).toFixed(0),
        'Fiber': (recipe.totalNutrients.FIBTG.quantity / servings).toFixed(0),
        'Cholesterol': ((recipe.totalNutrients.CHOLE.quantity / maps.RDI.Cholesterol / servings) * 100).toFixed(0),
        'Sodium': ((recipe.totalNutrients.NA.quantity / maps.RDI.Sodium / servings) * 100).toFixed(0),
        'Potassium': ((recipe.totalNutrients.K.quantity / maps.RDI.Potassium / servings) * 100).toFixed(0),
        'Magnesium': ((recipe.totalNutrients.MG.quantity / maps.RDI.Magnesium / servings) * 100).toFixed(0),
        'Vitamin A': ((recipe.totalNutrients.VITA_RAE.quantity / maps.RDI.VitaminA / servings) * 100).toFixed(0),
        'Vitamin E': ((recipe.totalNutrients.TOCPHA.quantity / maps.RDI.VitaminE / servings) * 100).toFixed(0),
        'Vitamin C': ((recipe.totalNutrients.VITC.quantity / maps.RDI.VitaminC / servings) * 100).toFixed(0),
        'Vitamin B6': ((recipe.totalNutrients.VITB6A.quantity / maps.RDI.VitaminB6 / servings) * 100).toFixed(0),
        'Vitamin B12': ((recipe.totalNutrients.VITB12.quantity / maps.RDI.VitaminB12 / servings) * 100).toFixed(0),
        'Vitamin D': ((recipe.totalNutrients.VITD.quantity / maps.RDI.VitaminD / servings) * 100).toFixed(0),
        'Vitamin K': ((recipe.totalNutrients.VITK1.quantity / maps.RDI.VitaminK / servings) * 100).toFixed(0),
        'Calcium': ((recipe.totalNutrients.CA.quantity / maps.RDI.Calcium / servings) * 100).toFixed(0),
        'Iron': ((recipe.totalNutrients.FE.quantity / maps.RDI.Iron / servings) * 100).toFixed(0),
        'Zinc': ((recipe.totalNutrients.ZN.quantity / maps.RDI.Zinc / servings) * 100).toFixed(0)
    };
}

export function subtractNutrition(nutritionObj, ingredientData, RDI, servings) {
    let newNutritionObj = { ...nutritionObj };

    Object.keys(ingredientData.totalNutrients).forEach((key) => {
        if (maps.nutrientMappingPercentage[key] && nutritionObj[maps.nutrientMappingPercentage[key]]) {
            let ingredientPercentage = (Number(ingredientData.totalNutrients[key].quantity) / servings) / RDI[maps.nutrientMappingPercentage[key]] * 100;
            let newNutrientValue = Number(nutritionObj[maps.nutrientMappingPercentage[key]]) - ingredientPercentage;
            if (newNutrientValue < 0) newNutrientValue = 0;
            newNutritionObj[maps.nutrientMappingPercentage[key]] = newNutrientValue.toFixed(0);
        }

        if (maps.nutrientMappingAbsolute[key] && nutritionObj[maps.nutrientMappingAbsolute[key]]) {
            let newNutrientValue = Number(nutritionObj[maps.nutrientMappingAbsolute[key]]) - (Number(ingredientData.totalNutrients[key].quantity) / servings);
            if (newNutrientValue < 0) newNutrientValue = 0;
            newNutritionObj[maps.nutrientMappingAbsolute[key]] = newNutrientValue.toFixed(0);
        }
    });

    return newNutritionObj;
}

export function addNutrition(nutritionObj, ingredientData, RDI, servings) {
    let newNutritionObj = { ...nutritionObj };

    Object.keys(ingredientData.totalNutrients).forEach((key) => {
        if (maps.nutrientMappingPercentage[key] && nutritionObj[maps.nutrientMappingPercentage[key]]) {
            let ingredientPercentage = (Number(ingredientData.totalNutrients[key].quantity) / servings) / RDI[maps.nutrientMappingPercentage[key]] * 100;
            let newNutrientValue = Number(nutritionObj[maps.nutrientMappingPercentage[key]]) + ingredientPercentage;
            newNutritionObj[maps.nutrientMappingPercentage[key]] = newNutrientValue.toFixed(0);
        }

        if (maps.nutrientMappingAbsolute[key] && nutritionObj[maps.nutrientMappingAbsolute[key]]) {
            let newNutrientValue = Number(nutritionObj[maps.nutrientMappingAbsolute[key]]) + (Number(ingredientData.totalNutrients[key].quantity) / servings);
            newNutritionObj[maps.nutrientMappingAbsolute[key]] = newNutrientValue.toFixed(0);
        }
    });

    return newNutritionObj;
}