console.log(`✔️greeting.js loaded`)

let log = console.log

export const GREETING = document.querySelector('.greeting')
export const NAME = document.querySelector('.name')
const GREETING_TEXT = { locale: ['🌅Good morning', '🌞Good afternoon', '🌇Good evening', '🌙Good night'] }

// Greeting
export function getTimeOfDay() {
  const DATE_OBJ = new Date()
  const TIME_HR = DATE_OBJ.getHours()
  const TIME_MIN = DATE_OBJ.getMinutes()
  // const TIME = TIME_HR.toString() + ':' + TIME_MIN.toString()
  // log(TIME)
  if (TIME_HR >= 6 && TIME_HR < 12) return GREETING_TEXT.locale[0]
  else if (TIME_HR >= 12 && TIME_HR < 18) return GREETING_TEXT.locale[1]
  else if (TIME_HR >= 18 && TIME_HR < 24) return GREETING_TEXT.locale[2]
  else if (TIME_HR >= 0 && TIME_HR < 6) return GREETING_TEXT.locale[3]
}

function showGreeting() {
  GREETING.textContent = `${getTimeOfDay()}`
}

// Name input
function setLocalStorage() {
  localStorage.setItem('name', NAME.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  const LOCAL_NAME = localStorage.getItem('name')
  if (LOCAL_NAME) NAME.value = LOCAL_NAME
  NAME.style.width = (NAME.value.length + 1) * 1.1 + 'ch'
}
window.addEventListener('load', getLocalStorage)

// TODO wrap everyting in one export in individual parts are not required

export { showGreeting, GREETING_TEXT }
