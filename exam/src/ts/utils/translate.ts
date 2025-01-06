import {ITranslateRequest} from "./types";
import {BackendClient} from "./BackendClient";

export class TranslateUtils {
    static async translate(text: string, fromLanguage: string, toLanguage: string): Promise<string | null> {
        const request: ITranslateRequest = {text, fromLanguage, toLanguage};
        try {
            const result = await BackendClient.fetchTranslate(request);
            return result.responseData.translatedText;
        } catch (error) {
            return null;
        }
    }
}
