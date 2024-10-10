export function createCreateChatButton() {
    const createChatButton = document.createElement('button');
    createChatButton.className = 'create-chat-button';
    createChatButton.onclick = function() {
        let modal = document.getElementById('create-chat-modal');
        modal.style.display = 'block';
    }
    const addSymbol = document.createElement('span');
    addSymbol.className = 'material-symbols-outlined';
    addSymbol.innerText = 'edit';

    createChatButton.appendChild(addSymbol);

    return createChatButton;
}
