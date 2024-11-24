export class BackendClient {
    static async refreshToken() {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
            throw new Error("No refresh token available");
        }

        return await fetch("https://vkedu-fullstack-div2.ru/api/auth/refresh/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh })
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to refresh token');
            }
            return res.json();
        }).then(data => {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            return data.access;
        });
    }

    static async fetchWithAuth(url, options = {}, retryCount = 1) {
        let access = localStorage.getItem("access");
        if (!access) {
            throw new Error("No access token available");
        }

        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${access}`
        };

        return await fetch(url, options).then(async res => {
            if (res.status === 401 && retryCount > 0) {
                access = await this.refreshToken();
                options.headers["Authorization"] = `Bearer ${access}`;
                return await this.fetchWithAuth(url, options, retryCount - 1);
            } else if (res.status === 401 && retryCount <= 0) {
                throw new Error('Maximum retry attempts exceeded');
            }
            return res;
        });
    }

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

    static async getChats(page, page_size, search) {
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
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/?" + query.toString(), {
            method: 'GET'
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async getChat(id) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/chat/${id}/`, {
            method: 'GET'
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
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/", {
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

    static async getChatMessages(chat, page, page_size, search) {
        let query = new URLSearchParams();
        if (chat != null) {
            query.append('chat', chat);
        } else {
            return;
        }
        if (page != null) {
            query.append('page', page);
        }
        if (page_size != null) {
            query.append('page_size', page_size);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await this.fetchWithAuth('https://vkedu-fullstack-div2.ru/api/messages/?' + query.toString(), {
            method: 'GET'
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
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/message/${id}/`, {
            method: 'GET'
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
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/messages/", {
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
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/users/?" + query.toString(), {
            method: 'GET'
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
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'GET'
        }).then(res => {
            if (!res.ok) {
                const err = new Error('Error occurred!');
                alert(err);
                return;
            }
            return res.json();
        });
    }

    static async editProfile(id, formData) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'PATCH',
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
}