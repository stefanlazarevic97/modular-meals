import * as generate from "./scripts/generate-recipes.js";
import { getSearchParams } from "./scripts/search-params.js";

const searchForm = document.querySelector('.search-form');
const appId = '9571bf1b';
const appKey = 'fd421218cb6bedd9fe774a93dd05e16e';
export let recipes = [];

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchParams = getSearchParams(e.target);
    fetchAPI(searchParams);
})

async function fetchAPI(searchParams) {
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

    let fullURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&random=true&${searchURL}`;
    const response = await fetch(fullURL);
    const data = await response.json();
    recipes = data.hits; 
    generate.generateHTML(data.hits);
    console.log(data);
}