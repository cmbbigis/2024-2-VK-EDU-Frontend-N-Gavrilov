export interface ITranslateRequest {
    text: string;
    fromLanguage: string;
    toLanguage: string;
}

export interface IApiResponse {
    responseData: {
        translatedText: string;
    }
}