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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_chat_list_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/chat-list/header.js */ \"./components/chat-list/header.js\");\n/* harmony import */ var _components_chat_list_chatList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chat-list/chatList.js */ \"./components/chat-list/chatList.js\");\n/* harmony import */ var _components_chat_list_createChatButton_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/chat-list/createChatButton.js */ \"./components/chat-list/createChatButton.js\");\n/* harmony import */ var _components_chat_list_createChatModal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/chat-list/createChatModal.js */ \"./components/chat-list/createChatModal.js\");\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var app = document.getElementById('app');\n  var chatListHeader = Object(_components_chat_list_header_js__WEBPACK_IMPORTED_MODULE_0__[\"createChatListHeader\"])();\n  var chatList = Object(_components_chat_list_chatList_js__WEBPACK_IMPORTED_MODULE_1__[\"createChatList\"])();\n  var createChatButton = Object(_components_chat_list_createChatButton_js__WEBPACK_IMPORTED_MODULE_2__[\"createCreateChatButton\"])();\n  var createChatModal = Object(_components_chat_list_createChatModal_js__WEBPACK_IMPORTED_MODULE_3__[\"createModal\"])();\n  app.appendChild(chatListHeader);\n  app.appendChild(chatList);\n  app.appendChild(createChatButton);\n  app.appendChild(createChatModal);\n});\n\n//# sourceURL=webpack:///./chat-list/index.js?");

/***/ }),

/***/ "./components/chat-list/chat.js":
/*!**************************************!*\
  !*** ./components/chat-list/chat.js ***!
  \**************************************/
/*! exports provided: createChat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChat\", function() { return createChat; });\nfunction createChat(interlocutor, avatarFile) {\n  var chat = document.createElement('div');\n  chat.className = 'chat';\n  chat.addEventListener('click', function () {\n    window.location.href = \"../chat/index.html?id=\".concat(chat.id);\n  });\n  var avatar = document.createElement('img');\n  avatar.className = 'avatar';\n  avatar.alt = 'Avatar';\n  avatar.src = avatarFile;\n  var chatInfo = document.createElement('div');\n  chatInfo.className = 'chat-info';\n  var chatTitle = document.createElement('h2');\n  chatTitle.className = 'chat-title';\n  chatTitle.innerText = interlocutor;\n  var chatLastMessage = document.createElement('p');\n  chatLastMessage.className = 'chat-last-message';\n  chatLastMessage.innerText = 'Ты куда пропал?';\n  var chatMeta = document.createElement('div');\n  chatMeta.className = 'chat-meta';\n  var lastMessageTime = document.createElement('span');\n  lastMessageTime.className = 'last-message-time';\n  lastMessageTime.innerText = '15:52';\n  var status = document.createElement('span');\n  status.className = 'material-symbols-outlined';\n  status.innerText = 'done_all';\n  chatInfo.appendChild(chatTitle);\n  chatInfo.appendChild(chatLastMessage);\n  chatMeta.appendChild(lastMessageTime);\n  chatMeta.appendChild(status);\n  chat.appendChild(avatar);\n  chat.appendChild(chatInfo);\n  chat.appendChild(chatMeta);\n  return chat;\n}\n\n//# sourceURL=webpack:///./components/chat-list/chat.js?");

/***/ }),

/***/ "./components/chat-list/chatList.js":
/*!******************************************!*\
  !*** ./components/chat-list/chatList.js ***!
  \******************************************/
/*! exports provided: createChatList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatList\", function() { return createChatList; });\n/* harmony import */ var _createChatModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createChatModal.js */ \"./components/chat-list/createChatModal.js\");\n\nfunction createChatList() {\n  var chatList = document.createElement('div');\n  chatList.className = 'chat-list';\n  Object(_createChatModal_js__WEBPACK_IMPORTED_MODULE_0__[\"loadChats\"])(chatList);\n  return chatList;\n}\n\n//# sourceURL=webpack:///./components/chat-list/chatList.js?");

/***/ }),

/***/ "./components/chat-list/createChatButton.js":
/*!**************************************************!*\
  !*** ./components/chat-list/createChatButton.js ***!
  \**************************************************/
/*! exports provided: createCreateChatButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCreateChatButton\", function() { return createCreateChatButton; });\nfunction createCreateChatButton() {\n  var createChatButton = document.createElement('button');\n  createChatButton.className = 'create-chat-button';\n  createChatButton.onclick = function () {\n    var modal = document.getElementById('create-chat-modal');\n    modal.style.display = 'block';\n  };\n  var addSymbol = document.createElement('span');\n  addSymbol.className = 'material-symbols-outlined';\n  addSymbol.innerText = 'edit';\n  createChatButton.appendChild(addSymbol);\n  return createChatButton;\n}\n\n//# sourceURL=webpack:///./components/chat-list/createChatButton.js?");

/***/ }),

/***/ "./components/chat-list/createChatModal.js":
/*!*************************************************!*\
  !*** ./components/chat-list/createChatModal.js ***!
  \*************************************************/
/*! exports provided: createModal, loadChats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createModal\", function() { return createModal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadChats\", function() { return loadChats; });\n/* harmony import */ var _chat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.js */ \"./components/chat-list/chat.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nfunction createModal() {\n  var modal = document.createElement('div');\n  modal.className = 'modal';\n  modal.id = 'create-chat-modal';\n  modal.style.display = 'none';\n  var modalContent = document.createElement('div');\n  modalContent.className = 'modal-content';\n  var close = document.createElement('span');\n  close.className = 'close';\n  close.innerText = 'Close';\n  close.onclick = function () {\n    modal.style.display = 'none';\n  };\n  window.onclick = function (event) {\n    if (event.target === modal) {\n      modal.style.display = 'none';\n    }\n  };\n  var createChatText = document.createElement('h2');\n  createChatText.className = 'create-chat-text';\n  createChatText.innerText = 'Создание чата';\n  var chatForm = document.createElement('form');\n  chatForm.id = 'chat-form';\n  chatForm.onsubmit = createChat;\n  var interlocutorLabel = document.createElement('label');\n  interlocutorLabel.textContent = 'Имя собеседника:';\n  interlocutorLabel.htmlFor = 'interlocutor';\n  var interlocutorInput = document.createElement('input');\n  interlocutorInput.id = 'interlocutor';\n  interlocutorInput.type = 'text';\n  interlocutorInput.name = 'interlocutor';\n  interlocutorInput.required = true;\n  var avatarLabel = document.createElement('label');\n  avatarLabel.textContent = 'Аватар собеседника:';\n  avatarLabel.htmlFor = 'avatar';\n  var avatarInput = document.createElement('input');\n  avatarInput.id = 'avatar';\n  avatarInput.type = 'file';\n  avatarInput.name = 'avatar';\n  avatarInput.accept = 'image/*';\n  avatarInput.required = false;\n  var create = document.createElement('button');\n  create.type = 'submit';\n  create.textContent = 'Create';\n  chatForm.appendChild(interlocutorLabel);\n  chatForm.appendChild(interlocutorInput);\n  chatForm.appendChild(avatarLabel);\n  chatForm.appendChild(avatarInput);\n  chatForm.appendChild(create);\n  modalContent.appendChild(close);\n  modalContent.appendChild(createChatText);\n  modalContent.appendChild(chatForm);\n  modal.appendChild(modalContent);\n  return modal;\n  function createChat(event) {\n    event.preventDefault();\n    var interlocutor = document.getElementById('interlocutor').value;\n    var avatar = document.getElementById('avatar').files;\n    var chats = JSON.parse(localStorage.getItem('chats')) || [];\n    chats.push({\n      id: IdGenerator.generateId(),\n      interlocutor: interlocutor,\n      avatar: avatar\n    });\n    localStorage.setItem('chats', JSON.stringify(chats));\n    modal.style.display = 'none';\n    document.getElementById('interlocutor').placeholder = '';\n    document.getElementById('avatar').placeholder = '';\n    loadChats(document.getElementsByClassName('chat-list')[0]);\n  }\n}\nfunction loadChats(container) {\n  var chats = JSON.parse(localStorage.getItem('chats')) || [];\n  container.innerHTML = '';\n  chats.forEach(function (_ref) {\n    var id = _ref.id,\n      interlocutor = _ref.interlocutor,\n      avatar = _ref.avatar;\n    var chat = Object(_chat_js__WEBPACK_IMPORTED_MODULE_0__[\"createChat\"])(interlocutor, avatar);\n    container.appendChild(chat);\n  });\n  container.scrollTop = container.scrollHeight;\n}\nvar IdGenerator = /*#__PURE__*/function () {\n  function IdGenerator() {\n    _classCallCheck(this, IdGenerator);\n  }\n  return _createClass(IdGenerator, null, [{\n    key: \"generateId\",\n    value: function generateId() {\n      return this.currentId++;\n    }\n  }]);\n}();\n_defineProperty(IdGenerator, \"currentId\", 0);\n\n//# sourceURL=webpack:///./components/chat-list/createChatModal.js?");

/***/ }),

/***/ "./components/chat-list/header.js":
/*!****************************************!*\
  !*** ./components/chat-list/header.js ***!
  \****************************************/
/*! exports provided: createChatListHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createChatListHeader\", function() { return createChatListHeader; });\nfunction createChatListHeader() {\n  var chatListHeader = document.createElement('div');\n  chatListHeader.className = 'header';\n  var menu = document.createElement('span');\n  menu.className = 'material-symbols-outlined';\n  menu.textContent = 'menu';\n  var headerText = document.createElement('div');\n  headerText.className = 'header-text';\n  var name = document.createElement('span');\n  name.className = 'name';\n  name.textContent = 'Messenger';\n  var search = document.createElement('span');\n  search.className = 'material-symbols-outlined';\n  search.textContent = 'search';\n  headerText.appendChild(name);\n  chatListHeader.appendChild(menu);\n  chatListHeader.appendChild(headerText);\n  chatListHeader.appendChild(search);\n  return chatListHeader;\n}\n\n//# sourceURL=webpack:///./components/chat-list/header.js?");

/***/ })

/******/ });