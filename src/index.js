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
    console.log("searchParams: ", searchParams);
    let queryParameters = {
        q: searchParams.searchQuery.length > 0 ? searchParams.searchQuery : undefined,
        time: searchParams.minTime && searchParams.maxTime ? `${searchParams.minTime}-${searchParams.maxTime}`
            : searchParams.minTime ? `${parseFloat(searchParams.minTime)}+`
            : searchParams.maxTime ? `${searchParams.maxTime}`
            : undefined,
        calories: searchParams.minCalories && searchParams.maxCalories ? `${searchParams.minCalories}-${searchParams.maxCalories}`
            : searchParams.minCalories ? `${searchParams.minCalories}+`
            : searchParams.maxCalories ? `${searchParams.maxCalories}`
            : undefined,
        'nutrients[CHOCDF]': searchParams.minCarbs && searchParams.maxCarbs ? `${searchParams.minCarbs}-${searchParams.maxCarbs}`
            : searchParams.minCarbs ? `${searchParams.minCarbs}+`
            : searchParams.maxCarbs ? `${searchParams.maxCarbs}`
            : undefined,
        'nutrients[FAT]': searchParams.minFat && searchParams.maxFat ? `${searchParams.minFat}-${searchParams.maxFat}`
            : searchParams.minFat ? `${searchParams.minFat}+`
            : searchParams.maxFat ? `${searchParams.maxFat}`
            : undefined,
        'nutrients[PROCNT]': searchParams.minProtein && searchParams.maxProtein ? `${searchParams.minProtein}-${searchParams.maxProtein}`
            : searchParams.minProtein ? `${searchParams.minProtein}+`
            : searchParams.maxProtein ? `${searchParams.maxProtein}`
            : undefined,
        mealType: searchParams.mealType || undefined,
        cuisineType: searchParams.cuisineType ? searchParams.cuisineType.toLowerCase() : undefined,
        health: searchParams.dietRestrictions.length > 0 ? searchParams.dietRestrictions : undefined,
        excluded: searchParams.excludedIngredients.length > 0 ? searchParams.excludedIngredients : undefined
    }

    // let baseURL = `http://localhost:5001?url=https://api.edamam.com/api/recipes/v2&type=public&app_id=${appId}&app_key=${appKey}&random=true`;
    console.log("queryParameters: ", queryParameters);

    let searchURL = Object.keys(queryParameters)
        .filter(key => queryParameters[key] !== undefined)
        .flatMap(key => {
            if (Array.isArray(queryParameters[key])) {
                return queryParameters[key].map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(queryParameters[key])}`;
            }
        })
        .join('&');
        
    fullURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&random=true&${searchURL}`;
    const response = await fetch(fullURL);
    const data = await response.json();
    generateHTML(data.hits);
}

function getSearchParams(form) {
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
    // console.log("Cuisine Type: ", cuisineType);
    let dietRestrictions = Array.from(document.querySelectorAll('.dietary-restrictions input[type="checkbox"]:checked')).map(el => el.value) || [];
    let excludedIngredients = (document.querySelector('.ingredient-search-field').querySelector('input[type="text"]').value.split(',').map(item => item.trim())).filter(item => item.length > 0) || [];

    return {
        searchQuery, minTime, maxTime, minCalories, maxCalories, minCarbs, maxCarbs, minFat, maxFat, minProtein, maxProtein, mealType, cuisineType, dietRestrictions, excludedIngredients
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