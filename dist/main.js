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

eval("const searchForm = document.querySelector('form');\nconst searchResultDiv = document.querySelector('.search-result');\nconst container = document.querySelector('.container');\nlet searchQuery = '';\nconst appId = '9571bf1b';\nconst appKey = 'fd421218cb6bedd9fe774a93dd05e16e';\nsearchForm.addEventListener('submit', e => {\n  e.preventDefault();\n  searchQuery = e.target.querySelector('input').value;\n  console.log(searchQuery);\n  fetchAPI();\n});\nasync function fetchAPI() {\n  const baseURL = `https://api.edamam.com/api/recipes/v2?q=pizza&app_id=${appId}&app_key=${appKey}`;\n  const response = await fetch(baseURL);\n  console.log(response);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJzZWFyY2hGb3JtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VhcmNoUmVzdWx0RGl2IiwiY29udGFpbmVyIiwic2VhcmNoUXVlcnkiLCJhcHBJZCIsImFwcEtleSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJmZXRjaEFQSSIsImJhc2VVUkwiLCJyZXNwb25zZSIsImZldGNoIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXByb2plY3QvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuY29uc3Qgc2VhcmNoUmVzdWx0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1yZXN1bHQnKTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKTtcbmxldCBzZWFyY2hRdWVyeSA9ICcnO1xuY29uc3QgYXBwSWQgPSAnOTU3MWJmMWInO1xuY29uc3QgYXBwS2V5ID0gJ2ZkNDIxMjE4Y2I2YmVkZDlmZTc3NGE5M2RkMDVlMTZlJztcblxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZWFyY2hRdWVyeSA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWU7XG4gICAgY29uc29sZS5sb2coc2VhcmNoUXVlcnkpO1xuICAgIGZldGNoQVBJKCk7XG59KVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFQSSgpIHtcbiAgICBjb25zdCBiYXNlVVJMID0gYGh0dHBzOi8vYXBpLmVkYW1hbS5jb20vYXBpL3JlY2lwZXMvdjI/cT1waXp6YSZhcHBfaWQ9JHthcHBJZH0mYXBwX2tleT0ke2FwcEtleX1gO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYmFzZVVSTCk7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xufSJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDakQsTUFBTUMsZUFBZSxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNoRSxNQUFNRSxTQUFTLEdBQUdILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUN0RCxJQUFJRyxXQUFXLEdBQUcsRUFBRTtBQUNwQixNQUFNQyxLQUFLLEdBQUcsVUFBVTtBQUN4QixNQUFNQyxNQUFNLEdBQUcsa0NBQWtDO0FBRWpEUCxVQUFVLENBQUNRLGdCQUFnQixDQUFDLFFBQVEsRUFBR0MsQ0FBQyxJQUFLO0VBQ3pDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0VBQ2xCTCxXQUFXLEdBQUdJLENBQUMsQ0FBQ0UsTUFBTSxDQUFDVCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUNVLEtBQUs7RUFDbkRDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxXQUFXLENBQUM7RUFDeEJVLFFBQVEsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRUYsZUFBZUEsUUFBUUEsQ0FBQSxFQUFHO0VBQ3RCLE1BQU1DLE9BQU8sR0FBSSx3REFBdURWLEtBQU0sWUFBV0MsTUFBTyxFQUFDO0VBQ2pHLE1BQU1VLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUNGLE9BQU8sQ0FBQztFQUNyQ0gsT0FBTyxDQUFDQyxHQUFHLENBQUNHLFFBQVEsQ0FBQztBQUN6QiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

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