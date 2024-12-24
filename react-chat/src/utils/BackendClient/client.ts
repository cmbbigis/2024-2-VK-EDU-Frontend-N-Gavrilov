import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    IAuthRequest,
    IAuthResponse,
    ICreateChatRequest,
    ICreateChatResponse,
    ICreateMessageRequest,
    ICreateMessageResponse,
    IEditProfileRequest,
    IEditProfileResponse,
    IGetChatRequest,
    IGetChatResponse,
    IGetChatsRequest,
    IGetChatsResponse,
    IGetMessagesRequest,
    IGetMessagesResponse,
    IGetUserRequest,
    IGetUserResponse,
    IGetUsersRequest,
    IGetUsersResponse,
    IOptions,
    IRefreshResponse,
    IRegisterRequest,
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

    public static async auth(request: IAuthRequest): Promise<IAuthResponse> {
        console.log(`${request.username}: ${request.password}`);
        const formData = this.toFormData(request);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        debugger
        return await fetch(`https://vkedu-fullstack-div2.ru/api/auth/`, {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    public static async register(request: IRegisterRequest): Promise<IRegisterResponse> {
        const formData = this.toFormData(request);
        return await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: 'POST',
            body: formData
        }).then(async res => await this.aggregateResponse(res));
    }

    public static async getChats(request: IGetChatsRequest): Promise<IGetChatsResponse> {
        let query = new URLSearchParams();
        if (request.page != null) {
            query.append('page', `${request.page}`);
        }
        if (request.page_size != null) {
            query.append('page_size', `${request.page_size}`);
        }
        if (request.search != null) {
            query.append('search', request.search);
        }
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/?" + query.toString(), {
            method: 'GET'
        });
    }

    public static async getChat(request: IGetChatRequest): Promise<IGetChatResponse> {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/chat/${request.id}/`, {
            method: 'GET'
        });
    }

    public static async createChat(request: ICreateChatRequest): Promise<ICreateChatResponse> {
        const formData = this.toFormData(request);
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/chats/", {
            method: 'POST',
            body: formData
        });
    }

    public static async getChatMessages(request: IGetMessagesRequest): Promise<IGetMessagesResponse> {
        let query = new URLSearchParams();
        query.append('chat', request.chat);
        if (request.page != null) {
            query.append('page', `${request.page}`);
        }
        if (request.page_size != null) {
            query.append('page_size', `${request.page_size}`);
        }
        if (request.search != null) {
            query.append('search', request.search);
        }
        return await this.fetchWithAuth('https://vkedu-fullstack-div2.ru/api/messages/?' + query.toString(), {
            method: 'GET'
        });
    }

    public static async sendMessage(request: ICreateMessageRequest): Promise<ICreateMessageResponse> {
        const formData = this.toFormData(request);
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/messages/", {
            method: 'POST',
            body: formData
        });
    }

    public static async getUsers(request: IGetUsersRequest): Promise<IGetUsersResponse> {
        let query = new URLSearchParams();
        if (request.page) {
            query.append('page', `${request.page}`);
        }
        if (request.page_size) {
            query.append('page_size', `${request.page_size}`);
        }
        if (request.search) {
            query.append('search', request.search);
        }
        return await this.fetchWithAuth("https://vkedu-fullstack-div2.ru/api/users/?" + query.toString(), {
            method: 'GET'
        });
    }

    public static async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${request.id}/`, {
            method: 'GET'
        });
    }

    public static async editProfile(request: IEditProfileRequest): Promise<IEditProfileResponse> {
        const formData = this.toFormData(request);
        formData.delete('id');
        return await this.fetchWithAuth(`https://vkedu-fullstack-div2.ru/api/user/${request.id}/`, {
            method: 'PATCH',
            body: formData
        });
    }

    private static toFormData<T extends Record<string, any>>(request: T): FormData {
        const formData = new FormData();
        Object.keys(request).forEach(key => {
            const value = request[key];
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    }

    private static async fetchWithAuth<T>(url: string, options: IOptions = {}, retryCount: number = 1): Promise<T> {
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
            .then(async res => await this.aggregateResponse(res as Response));
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