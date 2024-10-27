export function createChatListHeader() {
    const chatListHeader = document.createElement('div');
    chatListHeader.className = 'header';

    const menuButton = document.createElement('button');
    menuButton.className = 'header-button menu-button';
    const menu = document.createElement('span');
    menu.className = 'material-symbols-outlined';
    menu.textContent = 'menu';

    const headerText = document.createElement('div');
    headerText.className = 'header-text';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = 'Messenger';

    const searchButton = document.createElement('button');
    searchButton.className = 'header-button search-button';
    const search = document.createElement('span');
    search.className = 'material-symbols-outlined';
    search.textContent = 'search';

    menuButton.appendChild(menu);

    headerText.appendChild(name);

    searchButton.appendChild(search);

    chatListHeader.appendChild(menuButton);
    chatListHeader.appendChild(headerText);
    chatListHeader.appendChild(searchButton);

    return chatListHeader;
}