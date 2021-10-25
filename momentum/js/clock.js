console.log(`✔️clock.js loaded`)

let log = console.log

import { showGreeting } from './greeting.js' // use {} without default export

const TIME = document.querySelector('.time')
const DATE = document.querySelector('.date')
let locale = { timeLocale: 'en-US', dateLocale: 'en-US' }

// display time
export function showTime() {
  const DATE_OBJ = new Date()
  const CURRENTTIME = DATE_OBJ.toLocaleTimeString(`${locale.timeLocale}`)
  TIME.textContent = `${CURRENTTIME}`
  showDate()
  showGreeting()
  setTimeout(showTime, 1000)
}
showTime()

//  display Date
export function showDate() {
  const DATE_OBJ = new Date()
  // const OPTIONS = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }
  const OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' }
  // const CURRENTDATE = DATE_OBJ.toLocaleTimeString('en-US', OPTIONS).split(',')
  const CURRENTDATE = DATE_OBJ.toLocaleTimeString(`${locale.dateLocale}`, OPTIONS).split(',')
  const MONTH = CURRENTDATE[1].trim()
  const WEEK = CURRENTDATE[0].trim()
  DATE.textContent = `${WEEK}, ${MONTH}`
}

export { TIME, DATE, locale }
