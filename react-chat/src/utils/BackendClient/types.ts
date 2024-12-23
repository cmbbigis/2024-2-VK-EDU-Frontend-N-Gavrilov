export interface IRegisterResponse {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio: string,
    avatar: string,
    is_online: boolean,
    last_online_at: string
}

export interface IAuthResponse {
    access: string,
    refresh: string
}

export interface IRefreshResponse {
    access: string,
    refresh: string
}

export interface IGetChatsResponse {
    count: number,
    next: string,
    previous: string,
    results: IChat[]
}

export interface IGetChatResponse {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar: string | null,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message: object | null,
    unread_messages_count: number
}

export interface ICreateChatResponse {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar: string | null,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message: object | null,
    unread_messages_count: number,
}

export interface IGetMessagesResponse {
    count: number,
    next: string,
    previous: string,
    results: IMessage[]
}

export interface ICreateMessageResponse {
    id: string,
    text: string | null,
    voice: string | null,
    chat: string,
    files: [
        {
            item: string,
        }
    ],
    updated_at: string,
    created_at: string,
}

export interface IGetUsersResponse {
    count: number,
    next: string,
    previous: string,
    results: IUser[]
}

export interface IGetUserResponse {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio: string | null,
    avatar: string | null,
    last_online_at: string,
    is_online: boolean,
}

export interface IEditProfileResponse {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio: string | null,
    avatar: string | null,
    last_online_at: string,
    is_online: boolean,
}

export interface IOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: FormData;
}

interface IUser {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio: string | null,
    avatar: string | null,
    last_online_at: string,
    is_online: boolean
}

interface IChat {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar: string | null,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message: object | null,
    unread_messages_count: number
}

interface IMessage {
    id: string,
    text: string | null,
    voice: string | null,
    chat: string,
    sender: IUser,
    files: [
        {
            item: string,
        }
    ],
    was_read_by: IUser[],
    updated_at: string,
    created_at: string
}