export function createChatHeader(chatId) {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    if (!chats) {
        return null;
    }
    const chat = chats.find(chat => chat.id === chatId);

    const chatHeader = document.createElement('div');
    chatHeader.className = 'header';

    const arrowBack = document.createElement('span');
    arrowBack.className = 'material-symbols-outlined';
    arrowBack.textContent = 'arrow_back';

    const backToChatListLink = document.createElement('a');
    backToChatListLink.className = 'header-button back-to-chat-list-link';
    backToChatListLink.href = './index.html';

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.alt = 'Avatar';
    avatar.src = chat.avatar;

    const headerText = document.createElement('div');
    headerText.className = 'header-text';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = chat.interlocutor;
    const status = document.createElement('span');
    status.className = 'status';
    status.textContent = 'была 2 часа назад';

    const searchButton = document.createElement('button');
    searchButton.className = 'header-button search-button';
    const search = document.createElement('span');
    search.className = 'material-symbols-outlined';
    search.textContent = 'search';

    const optionsButton = document.createElement('button');
    optionsButton.className = 'header-button options-button';
    const moreVert = document.createElement('span');
    moreVert.className = 'material-symbols-outlined';
    moreVert.textContent = 'more_vert';

    backToChatListLink.appendChild(arrowBack);

    headerText.appendChild(name);
    headerText.appendChild(status);

    searchButton.appendChild(search);

    optionsButton.appendChild(moreVert);

    chatHeader.appendChild(backToChatListLink);
    chatHeader.appendChild(avatar);
    chatHeader.appendChild(headerText);
    chatHeader.appendChild(searchButton);
    chatHeader.appendChild(optionsButton);

    return chatHeader;
}
