import { Centrifuge } from 'centrifuge';

export function Centrifugo(chatId, setMessages, setLatestMessage) {
    const access = localStorage.getItem('access');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    function getConnectionToken() {
        return (ctx) =>
            new Promise((resolve, reject) =>
                fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
                    body: JSON.stringify(ctx),
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${access}`}
                })
                    .then((res) => res.json())
                    .then((data) => resolve(data.token))
                    .catch((err) => reject(err))
            );
    }

    function getSubscriptionToken() {
        return (ctx) =>
            new Promise((resolve, reject) =>
                fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
                    body: JSON.stringify(ctx),
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${access}`}
                })
                    .then((res) => res.json())
                    .then((data) => resolve(data.token))
                    .catch((err) => reject(err))
            );
    }

    const centrifuge = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
        getToken: getConnectionToken()
    });

    const subscription = centrifuge.newSubscription(currentUser['id'], {
        getToken: getSubscriptionToken()
    });

    subscription.on('publication', function(ctx) {
        const { event, message } = ctx.data;

        if (event === 'create') {
            if (setMessages) {
                setMessages((prevMessages) => {
                    if (prevMessages.some((msg) => msg.id === message.id || message.chat !== chatId)) {
                        return prevMessages;
                    }
                    return [message, ...prevMessages];
                });
            }

            if (setLatestMessage) {
                setLatestMessage((prevLatestMessage) => {
                    if (prevLatestMessage.id !== message.id && message.chat === chatId) {
                        return message;
                    }
                    return prevLatestMessage;
                });
            }
        }
    });

    subscription.subscribe();
    centrifuge.connect();

    return () => {
        centrifuge.disconnect();
        subscription.removeAllListeners();
        subscription.unsubscribe();
    };
}