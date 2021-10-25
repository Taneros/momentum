console.log(`✔️translate.js loaded`)

let log = console.log

import { locale, showDate, showTime } from './clock.js'
import { state } from './settings.js'
import { GREETING_TEXT } from './greeting.js'

const EN_GREETING = ['🌅Good morning', '🌞Good afternoon', '🌇Good evening', '🌙Good night']
const RU_GREETING = ['🌅Доброе утро ', '🌞Добрый день', '🌇Добрый вечер', '🌙Доброй ночи']

// log('translate', state)

function translate() {
  if (state.language === 'RU') {
    GREETING_TEXT.locale = RU_GREETING
    document.querySelector('body > main > div.greeting-container > input').value = 'друг!'
  } else {
    GREETING_TEXT.locale = EN_GREETING
    document.querySelector('body > main > div.greeting-container > input').value = 'friend!'
  }
  // translate time
  if (state.language === 'RU') {
    log(locale.timeLocale)
    locale.timeLocale = 'ru-RU'
    showTime()
  } else {
    locale.timeLocale = 'en-US'
  }
  // translate date
  if (state.language === 'RU') {
    // if (true) {
    log(locale.dateLocale)
    locale.dateLocale = 'ru-RU'
    showDate()
  } else {
    locale.dateLocale = 'en-US'
  }
}

export { translate }
