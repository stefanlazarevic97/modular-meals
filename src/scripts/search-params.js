export function getSearchParams(form) {
    let searchQuery = document.querySelector('input[type="text"]').value;
    let minTime = document.querySelector('#min-time-input').value;
    let maxTime = document.querySelector('#max-time-input').value;
    let minCalories = document.querySelector('#min-calories-input').value;
    let maxCalories = document.querySelector('#max-calories-input').value;
    let minCarbs = document.querySelector('#min-carbs-input').value;
    let maxCarbs = document.querySelector('#max-carbs-input').value;
    let minFat = document.querySelector('#min-fat-input').value;
    let maxFat = document.querySelector('#max-fat-input').value;
    let minProtein = document.querySelector('#min-protein-input').value;
    let maxProtein = document.querySelector('#max-protein-input').value;
    let mealType = document.querySelector('.meal-type-input').value;
    let cuisineType = document.querySelector('.cuisine-input').value;
    let dietRestrictions = Array.from(document.querySelectorAll('.dietary-restrictions input[type="checkbox"]:checked')).map(el => el.value) || [];
    let excludedIngredients = (document.querySelector('.ingredient-search-field').querySelector('input[type="text"]').value.split(',').map(item => item.trim())).filter(item => item.length > 0) || [];

    return {
        searchQuery, minTime, maxTime, minCalories, maxCalories, minCarbs, maxCarbs, minFat, maxFat, minProtein, maxProtein, mealType, cuisineType, dietRestrictions, excludedIngredients
    };
}
