/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("const searchForm = document.querySelector('form');\nconst searchResultDiv = document.querySelector('.search-result');\nconst container = document.querySelector('.container');\nlet searchQuery;\nconst appId = '9571bf1b';\nconst appKey = 'fd421218cb6bedd9fe774a93dd05e16e';\nsearchForm.addEventListener('submit', e => {\n  e.preventDefault();\n  searchQuery = e.target.querySelector('input').value;\n  fetchAPI();\n});\nasync function fetchAPI() {\n  // const baseURL = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=20`;\n  const baseURL = `http://localhost:5001?url=https://api.edamam.com/api/recipes/v2?q=${searchQuery}`;\n  const response = await fetch(baseURL);\n  const data = await response.json();\n  // generateHTML(data.hits);\n  console.log(data);\n}\n\n// function generateHTML(results) {\n//     let generatedHTML;\n\n//     results.map((result) => {\n//         newHTML += `\n//             <div class=\"item\">\n//                 <img src=\"${result.recipe.image}\" alt=\"\">\n//                     <div class=\"flex-container\">\n//                         <h1 class=\"title\">${result.recipe.label}</h1>\n//                         <a class=\"modify-button\" href=\"${result.recipe.url}\" target=\"_blank\">Modify Recipe</a>\n//                     </div>\n//                     <p class=\"item-data\">Calories: ${result.recipe.calories.toFixed(0)}</p>\n//                     <p class=\"item-data\">Macronutrients: ${result.recipe.carbohydrates.toFixed(0)}g carbohydrates, ${result.recipe.protein.toFixed(0)}g protein, ${result.recipe.fat.toFixed(0)}g fat</p>\n//                     <p class=\"item-data\">Servings: ${result.recipe.servings.toFixed(0)}</p>\n//                     <p\n//                     <p class=\"item-data\">Price/serving: $${(result.recipe.price / result.recipe.servings).toFixed(0)}</p>\n//                     <p \n//             </div>\n//         `;\n//     })\n\n//     searchResultDiv.innerHTML = newHTML;\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJzZWFyY2hGb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VhcmNoUmVzdWx0RGl2IiwiY29udGFpbmVyIiwic2VhcmNoUXVlcnkiLCJhcHBJZCIsImFwcEtleSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZldGNoQVBJIiwiYmFzZVVSTCIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHQtcHJvamVjdC8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5jb25zdCBzZWFyY2hSZXN1bHREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLXJlc3VsdCcpO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpO1xubGV0IHNlYXJjaFF1ZXJ5O1xuY29uc3QgYXBwSWQgPSAnOTU3MWJmMWInO1xuY29uc3QgYXBwS2V5ID0gJ2ZkNDIxMjE4Y2I2YmVkZDlmZTc3NGE5M2RkMDVlMTZlJztcblxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZWFyY2hRdWVyeSA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG4gICAgZmV0Y2hBUEkoKTtcbn0pXG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQVBJKCkge1xuICAgIC8vIGNvbnN0IGJhc2VVUkwgPSBgaHR0cHM6Ly9hcGkuZWRhbWFtLmNvbS9hcGkvcmVjaXBlcy92Mj9xPSR7c2VhcmNoUXVlcnl9JmFwcF9pZD0ke2FwcElkfSZhcHBfa2V5PSR7YXBwS2V5fSZ0bz0yMGA7XG4gICAgY29uc3QgYmFzZVVSTCA9IGBodHRwOi8vbG9jYWxob3N0OjUwMDE/dXJsPWh0dHBzOi8vYXBpLmVkYW1hbS5jb20vYXBpL3JlY2lwZXMvdjI/cT0ke3NlYXJjaFF1ZXJ5fWA7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChiYXNlVVJMKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIC8vIGdlbmVyYXRlSFRNTChkYXRhLmhpdHMpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xufVxuXG4vLyBmdW5jdGlvbiBnZW5lcmF0ZUhUTUwocmVzdWx0cykge1xuLy8gICAgIGxldCBnZW5lcmF0ZWRIVE1MO1xuICAgIFxuLy8gICAgIHJlc3VsdHMubWFwKChyZXN1bHQpID0+IHtcbi8vICAgICAgICAgbmV3SFRNTCArPSBgXG4vLyAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPlxuLy8gICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtyZXN1bHQucmVjaXBlLmltYWdlfVwiIGFsdD1cIlwiPlxuLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+JHtyZXN1bHQucmVjaXBlLmxhYmVsfTwvaDE+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm1vZGlmeS1idXR0b25cIiBocmVmPVwiJHtyZXN1bHQucmVjaXBlLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Nb2RpZnkgUmVjaXBlPC9hPlxuLy8gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpdGVtLWRhdGFcIj5DYWxvcmllczogJHtyZXN1bHQucmVjaXBlLmNhbG9yaWVzLnRvRml4ZWQoMCl9PC9wPlxuLy8gICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIml0ZW0tZGF0YVwiPk1hY3JvbnV0cmllbnRzOiAke3Jlc3VsdC5yZWNpcGUuY2FyYm9oeWRyYXRlcy50b0ZpeGVkKDApfWcgY2FyYm9oeWRyYXRlcywgJHtyZXN1bHQucmVjaXBlLnByb3RlaW4udG9GaXhlZCgwKX1nIHByb3RlaW4sICR7cmVzdWx0LnJlY2lwZS5mYXQudG9GaXhlZCgwKX1nIGZhdDwvcD5cbi8vICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpdGVtLWRhdGFcIj5TZXJ2aW5nczogJHtyZXN1bHQucmVjaXBlLnNlcnZpbmdzLnRvRml4ZWQoMCl9PC9wPlxuLy8gICAgICAgICAgICAgICAgICAgICA8cFxuLy8gICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIml0ZW0tZGF0YVwiPlByaWNlL3NlcnZpbmc6ICQkeyhyZXN1bHQucmVjaXBlLnByaWNlIC8gcmVzdWx0LnJlY2lwZS5zZXJ2aW5ncykudG9GaXhlZCgwKX08L3A+XG4vLyAgICAgICAgICAgICAgICAgICAgIDxwIFxuLy8gICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIGA7XG4vLyAgICAgfSlcblxuLy8gICAgIHNlYXJjaFJlc3VsdERpdi5pbm5lckhUTUwgPSBuZXdIVE1MO1xuLy8gfSJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDakQsTUFBTUMsZUFBZSxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoRSxNQUFNRSxTQUFTLEdBQUdILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUN0RCxJQUFJRyxXQUFXO0FBQ2YsTUFBTUMsS0FBSyxHQUFHLFVBQVU7QUFDeEIsTUFBTUMsTUFBTSxHQUFHLGtDQUFrQztBQUVqRFAsVUFBVSxDQUFDUSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdDLENBQUMsSUFBSztFQUN6Q0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztFQUNsQkwsV0FBVyxHQUFHSSxDQUFDLENBQUNFLE1BQU0sQ0FBQ1QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDVSxLQUFLO0VBQ25EQyxRQUFRLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQztBQUVGLGVBQWVBLFFBQVFBLENBQUEsRUFBRztFQUN0QjtFQUNBLE1BQU1DLE9BQU8sR0FBSSxxRUFBb0VULFdBQVksRUFBQztFQUNsRyxNQUFNVSxRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUFDRixPQUFPLENBQUM7RUFDckMsTUFBTUcsSUFBSSxHQUFHLE1BQU1GLFFBQVEsQ0FBQ0csSUFBSSxDQUFDLENBQUM7RUFDbEM7RUFDQUMsT0FBTyxDQUFDQyxHQUFHLENBQUNILElBQUksQ0FBQztBQUNyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXByb2plY3QvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;