console.log(`✔️translate.js loaded`)

let log = console.log

import { locale, showDate, showTime } from './clock.js'
import { state, updateState, onloadUpdate } from './settings.js'
import { GREETING_TEXT } from './greeting.js'
import { API_URL, getQuotes } from './quote-of-day.js'
import { WEATHER_LOCALE, getWeather } from './weather-app.js'

const EN_GREETING = ['🌅Good morning', '🌞Good afternoon', '🌇Good evening', '🌙Good night']
const RU_GREETING = ['🌅Доброе утро ', '🌞Добрый день', '🌇Добрый вечер', '🌙Доброй ночи']
const EN_API_URL = 'https://type.fit/api/quotes'
const RU_API_URL = './js/russian-quotes.json'
const RU_CITY = 'Минск'
const RU_CITY_LOCALE = 'ru'

// log('translate', state)

function translate() {
  // /html/body/footer/div[2]/div/div[1]/div/label[1]/text()
  // translate hide elements
  if (state.language === 'RU') {
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(1) > span:nth-child(1)').textContent = 'Часы'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(2) > span:nth-child(1)').textContent = 'Дата'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(3) > span:nth-child(1)').textContent = 'Приветствие'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(4) > span:nth-child(1)').textContent = 'Цитата дня'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(5) > span:nth-child(1)').textContent = 'Погода'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(6) > span:nth-child(1)').textContent = 'Аудио плеер'
  } else {
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(1) > span:nth-child(1)').textContent = 'Time'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(2) > span:nth-child(1)').textContent = 'Date'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(3) > span:nth-child(1)').textContent = 'Greeting'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(4) > span:nth-child(1)').textContent = 'Quote of Day'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(5) > span:nth-child(1)').textContent = 'Weather'
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > div > label:nth-child(6) > span:nth-child(1)').textContent = 'Audio player'
  }
  // translate settigns
  if (state.language === 'RU') {
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > h2').textContent = 'Скрыть элементы'
    document.querySelector('#myNav > div > div.overlay-content__bgImgSrc > h2').textContent = 'Сменить заставку'
    document.querySelector('#myNav > div > div.overlay-content__translate > h2').textContent = 'Сменить язык'
  } else {
    document.querySelector('#myNav > div > div.overlay-content__hideShowEl > h2').textContent = 'Hide Elements'
    document.querySelector('#myNav > div > div.overlay-content__bgImgSrc > h2').textContent = 'Change Background'
    document.querySelector('#myNav > div > div.overlay-content__translate > h2').textContent = 'Change Language'
  }
  // translate weather
  if (state.language === 'RU') {
    WEATHER_LOCALE.cityValue = localStorage.getItem('city') || 'Минск'
    WEATHER_LOCALE.locale = 'ru'
    WEATHER_LOCALE.wind = 'Скорость ветра'
    WEATHER_LOCALE.wind_speed = 'м/с'
    WEATHER_LOCALE.humidity = 'Влажность'
    // document.querySelector('.city').value = 'Минск'
    document.querySelector('.city').dispatchEvent(new MouseEvent('change', { bubbles: true, cancellable: true }))
    // getWeather()
  } else {
    document.querySelector('.city').value = localStorage.getItem('city') || 'Minsk'
    WEATHER_LOCALE.cityValue = localStorage.getItem('city') || 'Minsk'
    WEATHER_LOCALE.locale = 'en'
    WEATHER_LOCALE.wind = 'Wind speed'
    WEATHER_LOCALE.wind_speed = 'm/s'
    WEATHER_LOCALE.humidity = 'Humidity'
    document.querySelector('.city').dispatchEvent(new MouseEvent('change', { bubbles: true, cancellable: true }))
    // getWeather()
  }
  // translate quote
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
    document.querySelector('body > main > div.greeting-container > input').value = localStorage.getItem('name') || GREETING_TEXT.username
  } else {
    GREETING_TEXT.locale = EN_GREETING
    document.querySelector('body > main > div.greeting-container > input').value = localStorage.getItem('name') || GREETING_TEXT.username
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
