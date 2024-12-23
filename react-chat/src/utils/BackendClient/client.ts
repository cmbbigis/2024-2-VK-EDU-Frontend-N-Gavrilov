import {toast} from "react-toastify";
import {
    IAuthResponse,
    ICreateChatResponse,
    ICreateMessageResponse,
    IEditProfileResponse,
    IGetChatResponse,
    IGetChatsResponse,
    IGetMessagesResponse,
    IGetUserResponse,
    IGetUsersResponse,
    IOptions,
    IRefreshResponse,
    IRegisterResponse
} from "./types";

export class BackendClient {
    public static async refreshToken(): Promise<IRefreshResponse> {
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
                return data;
            });
    }

    public static async auth(formData: FormData): Promise<IAuthResponse> {
        return await fetch(`https://vkedu-fullstack-div2.ru/api/auth/`, {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    public static async register(formData: FormData): Promise<IRegisterResponse> {
        return await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    public static async getChats(page: number, page_size: number, search: string): Promise<IGetChatsResponse> {
        let query = new URLSearchParams();
        if (page != null) {
            query.append('page', `${page}`);
        }
        if (page_size != null) {
            query.append('page_size', `${page_size}`);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/?" + query.toString(), {
            method: 'GET'
        });
    }

    public static async getChat(id: string): Promise<IGetChatResponse> {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/chat/${id}/`, {
            method: 'GET'
        });
    }

    public static async createChat(formData: FormData): Promise<ICreateChatResponse> {
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/", {
            method: 'POST',
            body: formData
        });
    }

    public static async getChatMessages(chat: string, page: number, page_size: number, search: string): Promise<IGetMessagesResponse> {
        let query = new URLSearchParams();
        if (chat != null) {
            query.append('chat', chat);
        } else {
            return;
        }
        if (page != null) {
            query.append('page', `${page}`);
        }
        if (page_size != null) {
            query.append('page_size', `${page_size}`);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await this.fetchWithAuth('https://vkedu-fullstack-div2.ru/api/messages/?' + query.toString(), {
            method: 'GET'
        });
    }

    public static async sendMessage(formData: FormData): Promise<ICreateMessageResponse> {
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/messages/", {
            method: 'POST',
            body: formData
        });
    }

    public static async getUsers(page: number, page_size: number, search: string): Promise<IGetUsersResponse> {
        let query = new URLSearchParams();
        if (page != null) {
            query.append('page', `${page}`);
        }
        if (page_size != null) {
            query.append('page_size', `${page_size}`);
        }
        if (search != null) {
            query.append('search', search);
        }
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/users/?" + query.toString(), {
            method: 'GET'
        });
    }

    public static async getUser(id: string): Promise<IGetUserResponse> {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'GET'
        });
    }

    public static async editProfile(id: string, formData: FormData): Promise<IEditProfileResponse> {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${id}/`, {
            method: 'PATCH',
            body: formData
        });
    }

    private static async fetchWithAuth(url: string, options: IOptions = {}, retryCount: number = 1) {
        let access = localStorage.getItem("access");
        if (!access) {
            toast.error("No access token available");
        }

        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${access}`
        };

        return await fetch(url, options)
            .then(async res => {
                if (res.status === 401 && retryCount > 0) {
                    access = (await this.refreshToken()).access;
                    options.headers!["Authorization"] = `Bearer ${access}`;
                    return await this.fetchWithAuth(url, options, retryCount - 1);
                } else if (res.status === 401 && retryCount <= 0) {
                    toast.error('Maximum retry attempts exceeded');
                } else if (!res.ok) {
                    throw await res.json();
                }
                return res;
            })
            .then(async res => await this.aggregateResponse(res));
    }

    private static async aggregateResponse(res: Response) {
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