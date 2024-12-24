import {ITranslateResponse} from "./types";

export class Cache {
    private cache: Map<string, ITranslateResponse>;

    constructor() {
        this.cache = new Map<string, ITranslateResponse>();
    }

    get(key: string): ITranslateResponse | undefined {
        return this.cache.get(key);
    }

    set(key: string, value: ITranslateResponse): void {
        this.cache.set(key, value);
    }
}