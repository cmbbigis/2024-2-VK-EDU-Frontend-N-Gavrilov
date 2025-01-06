export type RootState = {
    slice: {
        translateFrom: string,
        translateTo: string,
        textToTranslate: string,
        translatedText: string,
        history: string[],
    },
};