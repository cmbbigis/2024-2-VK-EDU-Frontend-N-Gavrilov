export function createCreateChatButton() {
    const createChatButton = document.createElement('button');
    createChatButton.className = 'create-chat-button';
    const addSymbol = document.createElement('span');
    addSymbol.className = 'material-symbols-outlined';
    addSymbol.innerText = 'edit';

    createChatButton.appendChild(addSymbol);

    return createChatButton;
}