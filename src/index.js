const searchForm = document.querySelector('.search-form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const appId = '9571bf1b';
const appKey = 'fd421218cb6bedd9fe774a93dd05e16e';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchParams = getSearchParams(e.target);
    fetchAPI(searchParams);
})

async function fetchAPI(searchParams) {
    let queryParameters = {
        q: searchParams.searchQuery,
        time: searchParams.minTime ? `${searchParams.minTime}-${searchParams.maxTime || '*'}`
            : searchParams.maxTime ? `*-${searchParams.maxTime}` : undefined,
        calories: searchParams.minCalories ? `${searchParams.minCalories}-${searchParams.maxCalories || '*'}`
            : searchParams.maxCalories ? `*-${searchParams.maxCalories}` : undefined,
        carbs: searchParams.minCarbs ? `${searchParams.minCarbs}-${searchParams.maxCarbs || '*'}`
            : searchParams.maxCarbs ? `*-${searchParams.maxCarbs}` : undefined,
        fat: searchParams.minFat ? `${searchParams.minFat}-${searchParams.maxFat || '*'}`
            : searchParams.maxFat ? `*-${searchParams.maxFat}` : undefined,
        protein: searchParams.minProtein ? `${searchParams.minProtein}-${searchParams.maxProtein || '*'}`
            : searchParams.maxProtein ? `*-${searchParams.maxProtein}` : undefined,
        mealType: searchParams.mealType || undefined,
        cuisineType: searchParams.cuisine || undefined,
        diet: searchParams.dietRestrictions.length > 0 ? searchParams.dietRestrictions.join(',') : undefined,
        ingr: searchParams.includedIngredients.length > 0 ? searchParams.includedIngredients.join(',') : undefined,
        excl: searchParams.excludedIngredients.length > 0 ? searchParams.excludedIngredients.join(',') : undefined
    }
    
    let baseURL = `http://localhost:5001?url=https://api.edamam.com/api/recipes/v2`;
    
    let fullURL = Object.keys(queryParameters)
        .filter(key => queryParameters[key] !== undefined)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParameters[key]))
        .join('&');

    baseURL = `${baseURL}?${fullURL}&app_id=${appId}&app_key=${appKey}`;

    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function getSearchParams(form) {
    let searchQuery = form.querySelector('input[type="text"]').value;

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
    let includedIngredients = (document.querySelectorAll('.ingredient-search-field')[0].querySelector('input[type="text"]').value.split(',').map(item => item.trim())) || [];
    let excludedIngredients = (document.querySelectorAll('.ingredient-search-field')[1].querySelector('input[type="text"]').value.split(',').map(item => item.trim())) || [];

    return {
        searchQuery, minTime, maxTime, minCalories, maxCalories, minCarbs, maxCarbs, minFat, maxFat, minProtein, maxProtein, mealType, cuisineType, dietRestrictions, includedIngredients, excludedIngredients
    };
}
function generateHTML(results) {
    let newHTML = '';
    
    results.map((result) => {
        newHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="">

                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="modify-button" href="${result.recipe.url}" target="_blank">Modify Recipe</a>
                </div>
                    
                <p class="item-data">
                    Calories: ${result.recipe.calories.toFixed(0)}
                </p>
                <p class="item-data">
                    Macronutrients: ${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(0)}g carbohydrates, ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(0)}g protein, ${result.recipe.totalNutrients.FAT.quantity.toFixed(0)}g fat
                </p>
                <p class="item-data">
                    Servings: ${result.recipe.yield.toFixed(0)}
                </p>
            </div>
        `;
    });

    searchResultDiv.innerHTML = newHTML;
}