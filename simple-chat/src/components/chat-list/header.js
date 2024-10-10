export function createChatListHeader() {
    const chatListHeader = document.createElement('div');
    chatListHeader.className = 'header';

    const menu = document.createElement('span');
    menu.className = 'material-symbols-outlined';
    menu.textContent = 'menu';

    const headerText = document.createElement('div');
    headerText.className = 'header-text';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = 'Messenger';

    const search = document.createElement('span');
    search.className = 'material-symbols-outlined';
    search.textContent = 'search';

    headerText.appendChild(name);

    chatListHeader.appendChild(menu);
    chatListHeader.appendChild(headerText);
    chatListHeader.appendChild(search);

    return chatListHeader;
}