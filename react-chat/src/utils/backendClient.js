import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export class BackendClient {
    static async refreshToken() {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
            toast.error("No refresh token available");
        }

        return await fetch("https://vkedu-fullstack-div2.ru/api/auth/refresh/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh })
        }).then(async res => await this.aggregateResponse(res))
            .then(data => {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            return data.access;
        });
    }

    static async fetchWithAuth(url, options = {}, retryCount = 1) {
        let access = localStorage.getItem("access");
        if (!access) {
            toast.error("No access token available");
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
                toast.error('Maximum retry attempts exceeded');
            } else if (!res.ok) {
                throw await res.json();
            }
            return res;
        });
    }

    static async auth(formData) {
        return await fetch(`https://vkedu-fullstack-div2.ru/api/auth/`, {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    static async register(formData) {
        return await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
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
        }).then(async res => await this.aggregateResponse(res));
    }

    static async getChat(id) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/chat/${id}/`, {
            method: 'GET'
        }).then(async res => await this.aggregateResponse(res));
    }

    static async createChat(formData) {
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/", {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
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
        }).then(async res => await this.aggregateResponse(res));
    }

    static async getMessage(id) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/message/${id}/`, {
            method: 'GET'
        }).then(async res => await this.aggregateResponse(res));
    }

    static async sendMessage(formData) {
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/messages/", {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
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
        }).then(async res => await this.aggregateResponse(res));
    }

    static async getUser(id) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'GET'
        }).then(async res => await this.aggregateResponse(res));
    }

    static async editProfile(id, formData) {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'PATCH',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    static async aggregateResponse(res) {
        if (!res.ok) {
            const err = await res.json()
            if (Math.floor(res.status / 100) === 5) {
                toast.error("Server error occurred. Please try again later.");
                return;
            } else if (err["__all__"] || err.detail || err["non_field_errors"]) {
                toast.error((err["__all__"] || err.detail || err["non_field_errors"]));
                return;
            } else if (!err["__all__"] && !err.detail && !err["non_field_errors"]) {
                toast.error(`${res.status} ${res.statusText}`);
                return;
            }
            throw err;
        }
        return res.json();
    }
}