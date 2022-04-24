import AsyncStorage from '@react-native-community/async-storage';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value;
  } catch (e) {}
};

const setItemObject = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

const getItemObject = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {}
};

const hasOwenProperty = (object, value) => {
  try {
    if (object.hasOwnProperty(value) == true) {
      return object.value.toString();
    }
  } catch {
    return '';
  }
};

export function convertToFloat(value) {
  try {
    if (value === '') {
      return 0;
    }

    if (value === undefined) {
      return 0;
    }

    if (value.indexOf(',') === value.length - 3) {
      value = value.replace('.', '').replace(',', '.');
    } else {
      value = value.replace(',', '');
    }
    return parseFloat(value, 10);
  } catch (err) {
    return value;
  }
}

export function round(number, precision) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export function numberFormat(lang, value) {
  try {
    let formatted;

    if (value === '') {
      return 0;
    }

    if (value === undefined) {
      return 0;
    }

    const number = parseFloat(value.replace(',', '.'));

    if (lang == 'tr') {
      formatted = value.toLocaleString('tr-TR');
      /*var formatted = new Intl.NumberFormat('tr-TR', {

                minimumFractionDigits: 2,
            }).format(value);*/
    }

    if (lang == 'en') {
      formatted = value.toLocaleString('en-US');
      /* var formatted = new Intl.NumberFormat('en-US', {

                 minimumFractionDigits: 2,
             }).format(value);*/
    }

    /*
                if(formatted=='NaN'){
                    return '0'
                }*/
    return formatted;
  } catch (err) {
    return value;
  }
}

export function numberPrefix(lang, value) {
  try {
    let decimalSperator = ',';
    let newText = '';

    if (value === '') {
      return 0;
    }

    if (value === undefined) {
      return 0;
    }

    if (lang == 'tr') {
      decimalSperator = ',';
    }

    if (lang == 'en') {
      decimalSperator = '.';
    }

    let numbers = '0123456789' + decimalSperator;

    for (var i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newText = newText + value[i];
        if (value[i] == decimalSperator) {
          numbers = '0123456789';
        }
      } else {
      }
    }

    if (newText == NaN) {
      return '0';
    }

    return newText;
  } catch (err) {
    return value;
  }
}

export function numberPrefixOne(lang, value) {
  try {
    let decimalSperator = ',';
    let newText = '';

    if (value === '') {
      return '';
    }

    if (value === undefined) {
      return 1;
    }

    if (lang == 'tr') {
      decimalSperator = ',';
    }

    if (lang == 'en') {
      decimalSperator = '.';
    }

    let numbers = '0123456789' + decimalSperator;

    for (var i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newText = newText + value[i];
        if (value[i] == decimalSperator) {
          numbers = '0123456789';
        }
      } else {
      }
    }

    if (newText == NaN) {
      return 1;
    }

    return newText;
  } catch (err) {
    return value;
  }
}

const getDeviceLanguageFromStorage = async () => {
  try {
    let lang = await AsyncStorage.getItem('lang');
    if (lang && lang.length > 0) return lang;
    else return 'ru'; // No language setting, default it to english
  } catch (error) {
    // Can't get the language setting, default it to english
    return 'ru';
  }
};

const updateDeviceLanguageToStorage = async lang => {
  try {
    AsyncStorage.setItem('lang', lang);
  } catch (error) {}
};

export default {
  setItem,
  getItem,
  removeItem,
  setItemObject,
  getItemObject,
  createUUID,
  convertToFloat,
  numberFormat,
  numberPrefix,
  numberPrefixOne,
  round,
  hasOwenProperty,
  getDeviceLanguageFromStorage,
  updateDeviceLanguageToStorage,
};
