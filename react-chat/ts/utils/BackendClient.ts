import {IApiResponse, ITranslateRequest} from "./types";
import {TranslateEndpoint} from "./TranslateEndpoint";

export class BackendClient {
    public static async fetchTranslate(request: ITranslateRequest): Promise<IApiResponse> {
        const query = new URLSearchParams({
            q: request.text,
            langpair: `${request.fromLanguage}|${request.toLanguage}`
        });

        try {
            const response = await fetch(`${TranslateEndpoint.endpoint}?${query.toString()}`, {
                method: 'GET'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`HTTP Error: ${error}`);
            }

            return await response.json() as IApiResponse;
        } catch (error) {
            console.error(`Catch error while fetching translate: ${error}`);
            throw error;
        }
    }
}