console.log(`clock.js loaded`)

let log = console.log

export function clock() {
  const TIME = document.querySelector('.time')
  const DATE = document.querySelector('.date')
  const GREETING = document.querySelector('.greeting')
  const NAME = document.querySelector('.name')

  // display time
  function showTime() {
    const DATE_OBJ = new Date()
    const CURRENTTIME = DATE_OBJ.toLocaleTimeString()
    TIME.textContent = `${CURRENTTIME}`
    showDate()
    showGreeting()
    setTimeout(showTime, 1000)
  }
  showTime()

  //  display Date
  function showDate() {
    const DATE_OBJ = new Date()
    // const OPTIONS = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }
    const OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' }
    const CURRENTDATE = DATE_OBJ.toLocaleTimeString('en-Us', OPTIONS).split(',')
    const MONTH = CURRENTDATE[1].trim()
    const WEEK = CURRENTDATE[0].trim()
    DATE.textContent = `${WEEK}, ${MONTH}`
  }

  // Greeting
  function getTimeOfDay() {
    const DATE_OBJ = new Date()
    const TIME_NOW = DATE_OBJ.getHours()
    if (TIME_NOW > 12) return 'Good afternoon'
    if (TIME_NOW > 12 && TIME_NOW < 0) return 'Good evening'
    else return 'Good morning'
    log(TIME_NOW)
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
  }
  window.addEventListener('load', getLocalStorage)
}
