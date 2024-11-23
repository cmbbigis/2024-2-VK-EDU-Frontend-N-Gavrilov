export class BackendHttpClient {
    static async auth(formData) {
        return await fetch(`https://vkedu-fullstack-div2.ru/api/auth/`, {
            method: 'POST',
            body: formData
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async register(formData) {
        return await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: 'POST',
            body: formData
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async getChats(page, page_size, search){
        let query = new URLSearchParams();
        if (page != null) {
            query.append('page', page);
        }
        if (page_size != null) {
            query.append('page_size', page_size);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await fetch("https://vkedu-fullstack-div2.ru/api/chats/?" + query.toString(), {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async createChat(formData) {
        return await fetch("https://vkedu-fullstack-div2.ru/api/chats/", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            },
            body: formData
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async getMessage(id) {
        return await fetch(`https://vkedu-fullstack-div2.ru/api/message/${id}/`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async sendMessage(formData) {
        return await fetch("https://vkedu-fullstack-div2.ru/api/messages/", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            },
            body: formData
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async getUsers(page, page_size, search) {
        let query = new URLSearchParams();
        if (page != null) {
            query.append('page', page);
        }
        if (page_size != null) {
            query.append('page_size', page_size);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await fetch("https://vkedu-fullstack-div2.ru/api/users/?" + query.toString(), {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async getUser(id) {
        return await fetch(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }
}