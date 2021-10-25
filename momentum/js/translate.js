console.log(`✔️translate.js loaded`)

let log = console.log

import { locale, showDate, showTime } from './clock.js'
import { state } from './settings.js'
import { GREETING_TEXT } from './greeting.js'
import { API_URL, getQuotes } from './quote-of-day.js'

const EN_GREETING = ['🌅Good morning', '🌞Good afternoon', '🌇Good evening', '🌙Good night']
const RU_GREETING = ['🌅Доброе утро ', '🌞Добрый день', '🌇Добрый вечер', '🌙Доброй ночи']
const EN_API_URL = 'https://type.fit/api/quotes'
const RU_API_URL = './js/russian-quotes.json'

// log('translate', state)

function translate() {
  if (state.language === 'RU') {
    API_URL.locale = RU_API_URL
    getQuotes(API_URL.locale)
  } else {
    API_URL.locale = EN_API_URL
    getQuotes(API_URL.locale)
  }
  // translate greeting
  if (state.language === 'RU') {
    GREETING_TEXT.locale = RU_GREETING
    document.querySelector('body > main > div.greeting-container > input').value = 'друг!'
  } else {
    GREETING_TEXT.locale = EN_GREETING
    document.querySelector('body > main > div.greeting-container > input').value = 'friend!'
  }
  // translate time
  if (state.language === 'RU') {
    locale.timeLocale = 'ru-RU'
    showTime()
  } else {
    locale.timeLocale = 'en-US'
  }
  // translate date
  if (state.language === 'RU') {
    locale.dateLocale = 'ru-RU'
    showDate()
  } else {
    locale.dateLocale = 'en-US'
  }
}

export { translate }
