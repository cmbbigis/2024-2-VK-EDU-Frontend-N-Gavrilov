import {TranslateUtils} from './index';
import {ITranslateRequest} from "./types";

const testImTooTired: ITranslateRequest = {
    text: 'My name is Khan (good movie btw)',
    fromLanguage: 'en',
    toLanguage: 'ru',
}

const testBackTranslation: ITranslateRequest = {
    text: 'Я так устал переписывать проект на тайпескрипте...',
    fromLanguage: 'ru',
    toLanguage: 'en',
}

const testDetectLanguage: ITranslateRequest = {
    text: 'Sing with me sing for the year, Sing for the laughter, and sing for the tear',
    fromLanguage: 'en',
    toLanguage: 'ru',
}

test('translations', async () => {
    await expect(TranslateUtils.translate(testImTooTired.text,  testImTooTired.fromLanguage, testImTooTired.toLanguage)).resolves.toBe('Меня зовут Кхан (хороший фильм, кстати)');
    await expect(TranslateUtils.translate(testBackTranslation.text,  testBackTranslation.fromLanguage, testBackTranslation.toLanguage)).resolves.toBe('I\'m so tired of rewriting the project on a typescript...');
    await expect(TranslateUtils.translate(testDetectLanguage.text,  testDetectLanguage.fromLanguage, testDetectLanguage.toLanguage)).resolves.toBe('Пой со мной петь в течение года, петь для смеха, и петь для слезы');
});
