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

    const search = document.createElement('span');
    search.className = 'material-symbols-outlined';
    search.textContent = 'search';
    const moreVert = document.createElement('span');
    moreVert.className = 'material-symbols-outlined';
    moreVert.textContent = 'more_vert';

    headerText.appendChild(name);
    headerText.appendChild(status);

    chatHeader.appendChild(arrowBack);
    chatHeader.appendChild(avatar);
    chatHeader.appendChild(headerText);
    chatHeader.appendChild(search);
    chatHeader.appendChild(moreVert);

    return chatHeader;
}
