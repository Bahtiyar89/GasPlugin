import I18n from 'react-native-i18n';
import Utility from './app/utils/Utility';

Utility.getDeviceLanguageFromStorage().then(lang => {
  I18n.locale = lang;
});

I18n.fallbacks = true;
I18n.translations = {
  en: require('./app/utils/en.json'),
  ru: require('./app/utils/ru.json'),
};

export default I18n;
