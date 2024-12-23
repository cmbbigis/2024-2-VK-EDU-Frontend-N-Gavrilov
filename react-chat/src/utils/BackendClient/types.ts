export interface IRegisterRequest {
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    bio?: string,
    avatar?: File,
}

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

export interface IAuthRequest {
    username: string,
    password: string,
}

export interface IAuthResponse {
    access: string,
    refresh: string
}

export interface IRefreshRequest {
    refresh: string
}

export interface IRefreshResponse {
    access: string,
    refresh: string
}

export interface IGetChatsRequest {
    page?: number,
    page_size?: number,
    search?: string,
}

export interface IGetChatsResponse {
    count: number,
    next: string,
    previous: string,
    results: IChat[]
}

export interface IGetChatRequest {
    id: string,
}

export interface IGetChatResponse {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar?: string,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message?: object,
    unread_messages_count: number
}

export interface ICreateChatRequest {
    members: string[],
    is_private: boolean,
    title?: string,
    avatar?: File
}

export interface ICreateChatResponse {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar?: string,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message?: object,
    unread_messages_count: number,
}

export interface IGetMessagesRequest {
    chat: string,
    page?: number,
    page_size?: number,
    search?: string,
}

export interface IGetMessagesResponse {
    count: number,
    next: string,
    previous: string,
    results: IMessage[]
}

export interface ICreateMessageRequest {
    chat: string,
    voice?: File,
    text?: string,
    files?: File[],
}

export interface ICreateMessageResponse {
    id: string,
    text?: string,
    voice?: string,
    chat: string,
    files?: IFile[],
    updated_at: string,
    created_at: string,
}

export interface IGetUsersRequest {
    page?: number,
    page_size?: number,
    search?: string,
}

export interface IGetUsersResponse {
    count: number,
    next: string,
    previous: string,
    results: IUser[]
}

export interface IGetUserRequest {
    id: string,
}

export interface IGetUserResponse {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio?: string,
    avatar?: string,
    last_online_at: string,
    is_online: boolean,
}

export interface IEditProfileRequest {
    id: string,
    username?: string,
    first_name?: string,
    last_name?: string,
    bio?: string,
    avatar?: string,
}

export interface IEditProfileResponse {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio?: string,
    avatar?: string,
    last_online_at: string,
    is_online: boolean,
}

export interface IOptions {
    method?: string,
    headers?: Record<string, string>,
    body?: FormData,
}

interface IUser {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    bio?: string,
    avatar?: string,
    last_online_at: string,
    is_online: boolean
}

interface IChat {
    id: string,
    title: string,
    members: IUser[],
    creator: IUser,
    avatar?: string,
    created_at: string,
    updated_at: string,
    is_private: boolean,
    last_message?: object,
    unread_messages_count: number
}

interface IMessage {
    id: string,
    text?: string,
    voice?: string,
    chat: string,
    sender: IUser,
    files?: IFile[],
    was_read_by: IUser[],
    updated_at: string,
    created_at: string
}

interface IFile {
    item: string,
}