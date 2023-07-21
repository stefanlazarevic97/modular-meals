const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const appId = '9571bf1b';
const appKey = 'fd421218cb6bedd9fe774a93dd05e16e';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/api/recipes/v2?q=pizza&app_id=${appId}&app_key=${appKey}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
}