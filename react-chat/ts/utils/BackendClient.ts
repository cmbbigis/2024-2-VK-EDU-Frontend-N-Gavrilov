import {Cache} from "./Cache";
import {ITranslateResponse, ITranslateRequest} from "./types";
import {TranslateEndpoint} from "./TranslateEndpoint";

export class BackendClient {
    private static cache = new Cache();

    public static async fetchTranslate(request: ITranslateRequest): Promise<ITranslateResponse> {
        const query = new URLSearchParams({
            q: request.text,
            langpair: `${request.fromLanguage}|${request.toLanguage}`
        });

        const cachedResponse = this.cache.get(query.toString());
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(`${TranslateEndpoint.endpoint}?${query.toString()}`, {
                method: 'GET'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`HTTP Error: ${error}`);
            }

            const data = await response.json() as ITranslateResponse;

            this.cache.set(query.toString(), data);

            return data
        } catch (error) {
            console.error(`Catch error while fetching translate: ${error}`);
            throw error;
        }
    }
}