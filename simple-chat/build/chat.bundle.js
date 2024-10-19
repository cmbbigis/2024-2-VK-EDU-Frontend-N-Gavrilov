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
/******/ 	return __webpack_require__(__webpack_require__.s = "./chat/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chat/index.css":
/*!************************!*\
  !*** ./chat/index.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./chat/index.css?");

/***/ }),

/***/ "./chat/index.js":
/*!***********************!*\
  !*** ./chat/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./chat/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_chat_header_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat/header.css */ \"./components/chat/header.css\");\n/* harmony import */ var _components_chat_header_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_chat_header_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_chat_chatScreen_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/chat/chatScreen.css */ \"./components/chat/chatScreen.css\");\n/* harmony import */ var _components_chat_chatScreen_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_chat_chatScreen_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_chat_header_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/chat/header.js */ \"./components/chat/header.js\");\n/* harmony import */ var _components_chat_chatScreen_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/chat/chatScreen.js */ \"./components/chat/chatScreen.js\");\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var app = document.getElementById('app');\n  var params = new URLSearchParams(window.location.search);\n  var chatId = +params.get('id');\n  var chatHeader = Object(_components_chat_header_js__WEBPACK_IMPORTED_MODULE_3__[\"createChatHeader\"])(chatId);\n  var chatScreen = Object(_components_chat_chatScreen_js__WEBPACK_IMPORTED_MODULE_4__[\"createChatScreen\"])(chatId);\n  app.appendChild(chatHeader);\n  app.appendChild(chatScreen);\n});\n\n//# sourceURL=webpack:///./chat/index.js?");

/***/ }),

/***/ "./components/chat/chatScreen.css":
/*!****************************************!*\
  !*** ./components/chat/chatScreen.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./components/chat/chatScreen.css?");

/***/ }),

/***/ "./components/chat/chatScreen.js":
/*!***************************************!*\
  !*** ./components/chat/chatScreen.js ***!
  \***************************************/
/*! exports provided: createChatScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatScreen\", function() { return createChatScreen; });\nfunction createChatScreen(chatId) {\n  var chatScreen = document.createElement('div');\n  chatScreen.className = 'chat-screen';\n  var messagesContainer = document.createElement('div');\n  messagesContainer.className = 'messages';\n  var form = document.createElement('form');\n  form.className = 'form';\n  var messageInputContainer = document.createElement('label');\n  messageInputContainer.className = 'message-input-container';\n  var messageInput = document.createElement('input');\n  messageInput.className = 'message-input';\n  messageInput.name = 'message-text';\n  messageInput.placeholder = 'Сообщение';\n  messageInput.type = 'text';\n  messageInputContainer.appendChild(messageInput);\n  form.appendChild(messagesContainer);\n  form.appendChild(messageInputContainer);\n  form.addEventListener('submit', handleSubmit);\n  loadMessages(chatId, messagesContainer);\n  chatScreen.appendChild(messagesContainer);\n  chatScreen.appendChild(form);\n  return chatScreen;\n  function handleSubmit(event) {\n    event.preventDefault();\n    var text = messageInput.value.trim();\n    var sender = 'Я';\n    if (text) {\n      saveMessage(chatId, text, sender);\n      loadMessages(chatId, messagesContainer);\n      messageInput.value = '';\n      messagesContainer.scrollTop = messagesContainer.scrollHeight;\n    }\n  }\n  function loadMessages(chatId, container) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    var filteredMessages = messages.filter(function (message) {\n      return message.chatId === chatId;\n    }) || [];\n    container.innerHTML = '';\n    filteredMessages.forEach(function (_ref) {\n      var text = _ref.text,\n        sender = _ref.sender,\n        time = _ref.time;\n      var messageDiv = document.createElement('div');\n      messageDiv.classList.add('message');\n      messageDiv.classList.add(sender === 'Я' ? 'my-message' : 'interlocutor-message');\n      messageDiv.innerHTML = \"<strong>\".concat(sender, \"</strong> (<em>\").concat(time, \"</em>):<br>\").concat(text);\n      container.appendChild(messageDiv);\n    });\n  }\n  function saveMessage(chatId, text, sender) {\n    var messages = JSON.parse(localStorage.getItem('messages')) || [];\n    var time = new Date().toLocaleString();\n    messages.push({\n      chatId: chatId,\n      text: text,\n      sender: sender,\n      time: time\n    });\n    localStorage.setItem('messages', JSON.stringify(messages));\n  }\n}\n\n//# sourceURL=webpack:///./components/chat/chatScreen.js?");

/***/ }),

/***/ "./components/chat/header.css":
/*!************************************!*\
  !*** ./components/chat/header.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./components/chat/header.css?");

/***/ }),

/***/ "./components/chat/header.js":
/*!***********************************!*\
  !*** ./components/chat/header.js ***!
  \***********************************/
/*! exports provided: createChatHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatHeader\", function() { return createChatHeader; });\nfunction createChatHeader(chatId) {\n  var chats = JSON.parse(localStorage.getItem('chats')) || [];\n  if (!chats) {\n    return null;\n  }\n  var chat = chats.find(function (chat) {\n    return chat.id === chatId;\n  });\n  var chatHeader = document.createElement('div');\n  chatHeader.className = 'header';\n  var arrowBack = document.createElement('span');\n  arrowBack.className = 'material-symbols-outlined';\n  arrowBack.textContent = 'arrow_back';\n  var backToChatListLink = document.createElement('a');\n  backToChatListLink.className = 'back-to-chat-list-link';\n  backToChatListLink.href = './index.html';\n  var avatar = document.createElement('img');\n  avatar.className = 'avatar';\n  avatar.alt = 'Avatar';\n  avatar.src = chat.avatar;\n  var headerText = document.createElement('div');\n  headerText.className = 'header-text';\n  var name = document.createElement('span');\n  name.className = 'name';\n  name.textContent = chat.interlocutor;\n  var status = document.createElement('span');\n  status.className = 'status';\n  status.textContent = 'была 2 часа назад';\n  var search = document.createElement('span');\n  search.className = 'material-symbols-outlined';\n  search.textContent = 'search';\n  var moreVert = document.createElement('span');\n  moreVert.className = 'material-symbols-outlined';\n  moreVert.textContent = 'more_vert';\n  headerText.appendChild(name);\n  headerText.appendChild(status);\n  backToChatListLink.appendChild(arrowBack);\n  chatHeader.appendChild(backToChatListLink);\n  chatHeader.appendChild(avatar);\n  chatHeader.appendChild(headerText);\n  chatHeader.appendChild(search);\n  chatHeader.appendChild(moreVert);\n  return chatHeader;\n}\n\n//# sourceURL=webpack:///./components/chat/header.js?");

/***/ })

/******/ });