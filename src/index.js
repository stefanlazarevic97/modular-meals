const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery;
const appId = '9571bf1b';
const appKey = 'fd421218cb6bedd9fe774a93dd05e16e';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI() {
    // const baseURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=20`;
    const baseURL = `http://localhost:5001?url=https://api.edamam.com/api/recipes/v2?q=${searchQuery}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    // generateHTML(data.hits);
    console.log(data);
}

// function generateHTML(results) {
//     let generatedHTML;
    
//     results.map((result) => {
//         newHTML += `
//             <div class="item">
//                 <img src="${result.recipe.image}" alt="">
//                     <div class="flex-container">
//                         <h1 class="title">${result.recipe.label}</h1>
//                         <a class="modify-button" href="${result.recipe.url}" target="_blank">Modify Recipe</a>
//                     </div>
//                     <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
//                     <p class="item-data">Macronutrients: ${result.recipe.carbohydrates.toFixed(0)}g carbohydrates, ${result.recipe.protein.toFixed(0)}g protein, ${result.recipe.fat.toFixed(0)}g fat</p>
//                     <p class="item-data">Servings: ${result.recipe.servings.toFixed(0)}</p>
//                     <p
//                     <p class="item-data">Price/serving: $${(result.recipe.price / result.recipe.servings).toFixed(0)}</p>
//                     <p 
//             </div>
//         `;
//     })

//     searchResultDiv.innerHTML = newHTML;
// }