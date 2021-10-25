console.log(`✔️weather-app.js loaded`)

let log = console.log

const WEATHER_ICON = document.querySelector('.weather-icon')
const TEMP = document.querySelector('.temperature')
const WEATHER_DESC = document.querySelector('.weather-description')
const CITY = document.querySelector('.city')
const WIND = document.querySelector('.wind')
const HUMID = document.querySelector('.humidity')
const WEATHER_ERR = document.querySelector('.weather-error')
const WEATHER_LOCALE = {
  cityValue: localStorage.getItem('city') || CITY.value,
  locale: 'en',
  wind: 'Wind speed',
  wind_speed: 'm/s',
  humidity: 'Humidity',
}

// log(`CITY.value on load ${CITY.value}`)
// let cityValue = localStorage.getItem('city') || CITY.value
let url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_LOCALE.cityValue}&lang=${WEATHER_LOCALE.locale}&appid=42ecf345f3c5d6c38e11a4216450bac6&units=metric`
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=2cce539450db32c7a4de695cf7dec20a&units=metric`

getWeather()

CITY.addEventListener('change', () => {
  WEATHER_LOCALE.cityValue = CITY.value.trim().replace(/^\w/, (c) => c.toUpperCase())
  url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_LOCALE.cityValue}&lang=${WEATHER_LOCALE.locale}&appid=42ecf345f3c5d6c38e11a4216450bac6&units=metric`
  // url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=2cce539450db32c7a4de695cf7dec20a&units=metric`
  getWeather()
})

async function getWeather() {
  log('weather-app.js', url)
  try {
    const RES = await fetch(url)
    const DATA = await RES.json()
    const LS_S = localStorage.getItem('sky', DATA.weather[0].id) || DATA.weather[0].id
    WEATHER_ERR.textContent = ``
    WEATHER_ICON.style.display = 'initial'
    WEATHER_ICON.classList.remove(`owf-${LS_S}`)
    WEATHER_ICON.classList.add(`owf-${DATA.weather[0].id}`)
    localStorage.setItem('sky', DATA.weather[0].id)
    TEMP.textContent = `${DATA.main.temp.toFixed(1)}°C`
    WEATHER_DESC.textContent = `${DATA.weather[0].description}`
    WIND.textContent = `${WEATHER_LOCALE.wind}: ${DATA.wind.speed.toFixed(0)} ${WEATHER_LOCALE.wind_speed}`
    HUMID.textContent = `${WEATHER_LOCALE.humidity}: ${DATA.main.humidity}%`
  } catch (error) {
    WEATHER_ERR.textContent = 'City not found'
    WEATHER_ICON.style.display = 'none'
    TEMP.textContent = ''
    WEATHER_DESC.textContent = ''
    WIND.textContent = ''
    HUMID.textContent = ''
  }
}

function setLocalStorageCity() {
  localStorage.setItem('city', WEATHER_LOCALE.cityValue)
}

function getLocalStorageCity() {
  CITY.value = localStorage.getItem('city') || WEATHER_LOCALE.cityValue
}

window.addEventListener('beforeunload', setLocalStorageCity)
window.addEventListener('load', getLocalStorageCity)

export { WEATHER_LOCALE, getWeather }
