import * as _ from 'lodash';
import * as translationsFile from '../i18n';

export function removeDomain(string, removableBaseUriArray) {
  const removable = removableBaseUriArray;
  let newValue = string;
  for (let i = 0; i < removable.length; i++) {
    newValue = newValue.replace(removable[i], '');
  }
  return newValue;
}

export function getUiPhraseByLang(phrase, langcode) {
  if (translationsFile[langcode] && translationsFile[langcode][phrase]) {
    return translationsFile[langcode][phrase];
  }
  return phrase;
}

export function getParamValueFromUrl(url, param) {
  const splitUrl = url.split('&');
  let paramString;
  for (let i = 0; i < splitUrl.length; i++) {
    if (splitUrl[i].indexOf(param) !== -1) {
      paramString = splitUrl[i];
      break;
    }
  }
  const value = paramString.split('=')[1];
  return value;
}

export function labelByLang(string, lang, vocab, vocabPfx) {
  if (!string) {
    return '[FAILED LABEL]';
  }
  const pfx = vocabPfx;
  // Filter for fetching labels from vocab
  let lbl = string.toString();
  if (lbl && lbl.indexOf(pfx) !== -1) {
    lbl = lbl.replace(pfx, '');
  }
  const item = vocab.get(`${pfx}${lbl}`);
  let note = '';
  let labelByLang = '';
  if (typeof item !== 'undefined' && item.labelByLang) {
    labelByLang = item.labelByLang[lang];
  } else {
    note = ' (unhandled term)';
  }
  // Check if we have something of value
  if (_.isArray(labelByLang)) {
    labelByLang = _.uniqBy(labelByLang, (i) => {
      return i.toLowerCase();
    });
    labelByLang = labelByLang.join(', ');
  }

  if (labelByLang && labelByLang.length > 0) {
    return labelByLang;
  }
  return `${lbl}${note}`;
}
