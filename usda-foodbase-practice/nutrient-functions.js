export function createNutrientObject(food) {
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

export function calculatePercentages(nutrientObj) {
    var dailyIntake = {
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