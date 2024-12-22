export interface ITranslateRequest {
    text: string;
    fromLanguage: string;
    toLanguage: string;
}

export interface ITranslateResponse {
    responseData: {
        translatedText: string;
    }
}