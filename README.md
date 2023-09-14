# [ModularMeals](https://stefanlazarevic97.github.io/modular-meals/)

Empowering personalized culinary creativity with over 1.7 million recipes tailored to your dietary needs and preferences.

## Description

If you've found yourself pressed for time with just 45 minutes to prepare dinner, or tasked with crafting a high-protein, low-carb, dairy-free, vegetarian breakfast, our application is the ideal solution for you. Perhaps you're looking to dazzle your friends with a culinary masterpiece hailing from their homeland, or maybe you're facing the challenge of missing an essential ingredient from a recipe. Even if your ambition is to recreate healthier versions of your favourite comfort foods, or to cleverly utilise those extra ingredients lying idle in your pantry, this application will empower you in your gastronomical endeavours.

Leveraging the extensive database of [Edamam's Recipe API](https://developer.edamam.com/edamam-recipe-api), this application offers you the ability to search across 1.7 million recipes spanning the entire web. You can meticulously refine your search parameters using a host of inclusive and exclusive filters, ensuring you find recipes that precisely cater to your needs and preferences.

<p align="center">
  <img src="./assets/search-form.png" style="height: 500px; object-fit: contain; object-position: center;"/>
</p>

Peruse through a multitude of recipes matching your search criteria, and for a more comprehensive understanding of the recipe, feel free to access the source website directly.

<p align="center">
  <img src="./assets/search-result.png" style="height: 300px; object-fit: contain; object-position: center;"/>
</p>

With our "modify recipe" feature, you're presented with a more detailed nutritional breakdown, built using the [D3 data visualization library](https://d3js.org/).

<p align="center">
  <img src="./assets/nutrient-breakdown.png" style="height: 300px; object-fit: contain; object-position: center;"/>
</p>

To tailor the recipe to your exact specifications, you can also add or remove ingredients by weight. This feature, powered by [Edamam's Nutritional Analysis API](https://developer.edamam.com/edamam-nutrition-api), enables you to perfect your recipe, ensuring it aligns with your dietary objectives or personal tastes.

<p align="center">
  <img src="./assets/ingredients-list.png" style="height: 300px; object-fit: contain; object-position: center;"/>
</p>

What's more, you can watch in real time as the nutritional profile of your meal adapts with each modification of ingredients. Discover the joy of customised culinary experiences with our application, designed with your unique needs in mind.

## Code Snippets

This function loops through the list of recipes (results) returned from the API. For each recipe, it calculates the calories per serving, generates dynamic HTML, embedding the recipe details (image, title, etc.) into the page.

```javascript
results.map((result, index) => {
    const caloriesPerServing = (result.recipe.calories / result.recipe.yield).toFixed(0);
    // ...
    newHTML += `
        <div class="item">
            <img src="${result.recipe.image}" alt="${result.recipe.label}">
            <div class="recipe-info">
                <h1 class="title">${result.recipe.label}</h1>
                <!-- ... -->
            </div>
            <!-- ... -->
        </div>
    `;
})
```

This event listener listens for clicks on all the "Remove Ingredient" buttons, fetches the nutrition data for the ingredient that needs to be removed, and updates the nutrition object to remove the nutrient values of the removed ingredient.

```javascript
document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', async function (e) {
        const ingredient = e.target.parentElement.parentElement.children[0].textContent;
        // ...
        nutritionObj = nutrition.subtractNutrition(nutritionObj, data, maps.RDI, selectedRecipe.yield);
        // ...
    });
});
```

This function checks if all ingredients are removed from the table. If so, it hides the pie chart and bar chart elements, and also removes the displayed calories.

```javascript
function checkAndToggleCharts() {
    const tableRows = document.querySelectorAll('table tr');
    const caloriesDiv = document.querySelector('.calories');

    if (tableRows.length <= 1) {
        document.querySelector('.pie-chart').style.display = 'none';
        document.querySelector('.bar-chart').style.display = 'none';
        caloriesDiv.innerHTML = '';
    } else {
        //...
    }
}
```

## Technologies Used

**JavaScript DOM Manipulation**
- Used extensively to dynamically generate and update HTML elements.
- Responsible for creating recipe cards, adding and removing ingredients, and updating nutritional charts in real-time.

**D3.js**
- Data-Driven Documents (D3) is used for creating dynamic, interactive data visualizations.
- In this application, D3 is used to render pie and bar charts that depict nutritional values of the selected recipes.

**Edamam API**
- The Edamam API is used for fetching recipe and nutrition data.
- Features such as recipe search and getting detailed nutritional information are made possible through this API.

**Fetch API**
- Native JavaScript API for making HTTP requests.
- Used to interact with the Edamam API to fetch recipes and nutritional data.

**CSS and HTML**
- HTML is used for structuring the application, while CSS provides the styling.
- Both are essential for creating a user-friendly interface.

**Async/Await Syntax**
- Modern JavaScript syntax used for handling asynchronous operations.
- Utilized in API calls to Edamam and when updating the DOM based on user interactions.

**Event Listeners**
- JavaScript Event Listeners are used to handle user interactions.
- They listen for clicks on buttons like "Add Ingredient" and "Remove Ingredient," among others, to execute corresponding functionalities.

## Challenges

1. Dynamic Updating of Nutritional Charts
- Problem: One of the major challenges was dynamically updating the nutritional charts in real-time as ingredients are added or removed from the recipe.

- Solution: Utilized D3.js to redraw the pie and bar charts whenever an ingredient is added or removed. Had to manage asynchronous operations and state to make sure the charts were always in sync with the data.

2. Handling No-Results and Empty States
- Problem: Another challenge was dealing with "no results" from the Edamam API and ensuring that the UI still provides a good user experience.

- Solution: Implemented conditional rendering to display a "No results found" message and also cleared the search form to encourage the user to try another search query.

3. Accumulating and Subtracting Nutritional Values
- Problem: Calculating and displaying per-serving nutritional values while considering that ingredients can be added or removed posed a mathematical and programming challenge.

- Solution: Created utility functions that handle the math involved in adding and subtracting nutritional values. Ensured these calculations are accurate and update in real-time.