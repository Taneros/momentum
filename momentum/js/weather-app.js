console.log(`✔️weather-app.js loaded`)

let log = console.log

const WEATHER_ICON = document.querySelector('.weather-icon')
const TEMP = document.querySelector('.temperature')
const WEATHER_DESC = document.querySelector('.weather-description')
const CITY = document.querySelector('.city')
const WIND = document.querySelector('.wind')
const HUMID = document.querySelector('.humidity')
const WEATHER_ERR = document.querySelector('.weather-error')

// log(`CITY.value on load ${CITY.value}`)
let cityValue = localStorage.getItem('city') || CITY.value
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=42ecf345f3c5d6c38e11a4216450bac6&units=metric`
getWeather()

CITY.addEventListener('change', () => {
  cityValue = CITY.value.trim().replace(/^\w/, (c) => c.toUpperCase())
  url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=42ecf345f3c5d6c38e11a4216450bac6&units=metric`
  getWeather()
})

async function getWeather() {
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
    WIND.textContent = `Wind speed: ${DATA.wind.speed.toFixed(0)} m/s`
    HUMID.textContent = `Humidity: ${DATA.main.humidity}%`
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
  localStorage.setItem('city', cityValue)
}

function getLocalStorageCity() {
  CITY.value = localStorage.getItem('city') || cityValue
}

window.addEventListener('beforeunload', setLocalStorageCity)
window.addEventListener('load', getLocalStorageCity)
