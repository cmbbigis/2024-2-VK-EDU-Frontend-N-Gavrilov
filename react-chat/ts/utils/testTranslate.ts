import TranslateUtils from './index';

async function testTranslate() {
    const translated = await TranslateUtils.translate('Сделаем вид, что это тесты', 'ru', 'en');
    if (translated) {
        console.log('Translated:', translated);
    } else {
        console.log('Что-то пошло не так :(');
    }
}

testTranslate();