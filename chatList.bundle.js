/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./chat-list/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chat-list/index.js":
/*!****************************!*\
  !*** ./chat-list/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_chat_list_chatListHeader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/chat-list/chatListHeader.js */ \"./components/chat-list/chatListHeader.js\");\n/* harmony import */ var _components_chat_list_chatList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat-list/chatList.js */ \"./components/chat-list/chatList.js\");\n/* harmony import */ var _components_chat_list_chat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/chat-list/chat.js */ \"./components/chat-list/chat.js\");\n/* harmony import */ var _components_chat_list_createChatButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/chat-list/createChatButton.js */ \"./components/chat-list/createChatButton.js\");\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var app = document.getElementById('app');\n  var chatListHeader = Object(_components_chat_list_chatListHeader_js__WEBPACK_IMPORTED_MODULE_0__[\"createChatListHeader\"])();\n  var chatList = Object(_components_chat_list_chatList_js__WEBPACK_IMPORTED_MODULE_1__[\"createChatList\"])();\n  var chat = Object(_components_chat_list_chat_js__WEBPACK_IMPORTED_MODULE_2__[\"createChat\"])();\n  var createChatButton = Object(_components_chat_list_createChatButton_js__WEBPACK_IMPORTED_MODULE_3__[\"createCreateChatButton\"])();\n  chatList.appendChild(chat);\n  app.appendChild(chatListHeader);\n  app.appendChild(chatList);\n  app.appendChild(createChatButton);\n});\n\n//# sourceURL=webpack:///./chat-list/index.js?");

/***/ }),

/***/ "./components/chat-list/chat.js":
/*!**************************************!*\
  !*** ./components/chat-list/chat.js ***!
  \**************************************/
/*! exports provided: createChat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChat\", function() { return createChat; });\nfunction createChat() {\n  var chat = document.createElement('div');\n  chat.className = 'chat';\n  var avatar = document.createElement('img');\n  avatar.className = 'avatar';\n  avatar.alt = 'Avatar';\n  avatar.src = \"../chat/pictures/avatar.png\";\n  var chatInfo = document.createElement('div');\n  chatInfo.className = 'chat-info';\n  var chatTitle = document.createElement('h2');\n  chatTitle.className = 'chat-title';\n  chatTitle.innerText = 'Дженнифер Эшли';\n  var chatLastMessage = document.createElement('p');\n  chatLastMessage.className = 'chat-last-message';\n  chatLastMessage.innerText = 'Ты куда пропал?';\n  var chatMeta = document.createElement('div');\n  chatMeta.className = 'chat-meta';\n  var lastMessageTime = document.createElement('span');\n  lastMessageTime.className = 'last-message-time';\n  lastMessageTime.innerText = '15:52';\n  var status = document.createElement('span');\n  status.className = 'material-symbols-outlined';\n  status.innerText = 'done_all';\n  chatInfo.appendChild(chatTitle);\n  chatInfo.appendChild(chatLastMessage);\n  chatMeta.appendChild(lastMessageTime);\n  chatMeta.appendChild(status);\n  chat.appendChild(avatar);\n  chat.appendChild(chatInfo);\n  chat.appendChild(chatMeta);\n  return chat;\n}\n\n//# sourceURL=webpack:///./components/chat-list/chat.js?");

/***/ }),

/***/ "./components/chat-list/chatList.js":
/*!******************************************!*\
  !*** ./components/chat-list/chatList.js ***!
  \******************************************/
/*! exports provided: createChatList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatList\", function() { return createChatList; });\nfunction createChatList() {\n  var chatList = document.createElement('div');\n  chatList.className = 'chat-list';\n  return chatList;\n}\n\n//# sourceURL=webpack:///./components/chat-list/chatList.js?");

/***/ }),

/***/ "./components/chat-list/chatListHeader.js":
/*!************************************************!*\
  !*** ./components/chat-list/chatListHeader.js ***!
  \************************************************/
/*! exports provided: createChatListHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatListHeader\", function() { return createChatListHeader; });\nfunction createChatListHeader() {\n  var chatListHeader = document.createElement('div');\n  chatListHeader.className = 'header';\n  var menu = document.createElement('span');\n  menu.className = 'material-symbols-outlined';\n  menu.textContent = 'menu';\n  var headerText = document.createElement('div');\n  headerText.className = 'header-text';\n  var name = document.createElement('span');\n  name.className = 'name';\n  name.textContent = 'Messenger';\n  var search = document.createElement('span');\n  search.className = 'material-symbols-outlined';\n  search.textContent = 'search';\n  headerText.appendChild(name);\n  chatListHeader.appendChild(menu);\n  chatListHeader.appendChild(headerText);\n  chatListHeader.appendChild(search);\n  return chatListHeader;\n}\n\n//# sourceURL=webpack:///./components/chat-list/chatListHeader.js?");

/***/ }),

/***/ "./components/chat-list/createChatButton.js":
/*!**************************************************!*\
  !*** ./components/chat-list/createChatButton.js ***!
  \**************************************************/
/*! exports provided: createCreateChatButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCreateChatButton\", function() { return createCreateChatButton; });\nfunction createCreateChatButton() {\n  var createChatButton = document.createElement('button');\n  createChatButton.className = 'create-chat-button';\n  var addSymbol = document.createElement('span');\n  addSymbol.className = 'material-symbols-outlined';\n  addSymbol.innerText = 'edit';\n  createChatButton.appendChild(addSymbol);\n  return createChatButton;\n}\n\n//# sourceURL=webpack:///./components/chat-list/createChatButton.js?");

/***/ })

/******/ });