import * as generate from "./scripts/generate-recipes.js";
import { getSearchParams } from "./scripts/search-params.js";
import { capitalizeFirstLetter } from "./scripts/util.js";

const searchForm = document.querySelector('.search-form');
const appId = '9571bf1b';
const appKey = 'fd421218cb6bedd9fe774a93dd05e16e';
export let lastSearchParams;
export let recipes = [];

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    lastSearchParams = getSearchParams(e.target);
    fetchAPI(lastSearchParams, false);
})

export async function fetchAPI(searchParams, append) {
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
        health: searchParams.dietRestrictions.length > 0 ? searchParams.dietRestrictions : undefined,
        cuisineType: searchParams.cuisineType ? capitalizeFirstLetter(searchParams.cuisineType) : undefined,
        mealType: searchParams.mealType || undefined,
        excluded: searchParams.excludedIngredients.length > 0 ? searchParams.excludedIngredients : undefined
    }

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

    let fullURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&${searchURL}&random=true`;

    const response = await fetch(fullURL);
    const data = await response.json();

    if (append) {
        recipes = recipes.concat(data.hits.filter(recipe => recipe.recipe.image));
    } else {
        recipes = data.hits.filter(recipe => recipe.recipe.image);
    }

    generate.generateHTML(data.hits);
}

const backButton = document.querySelector('.back-to-search');

backButton.addEventListener('click', () => {
    location.reload();
});

var modal = document.querySelector(".modal");
var btn = document.querySelector(".instructions-button");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}