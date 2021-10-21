console.log(`clock.js loaded`)

let log = console.log

import { showGreeting } from './greeting.js'

export const TIME = document.querySelector('.time')
export const DATE = document.querySelector('.date')

// display time
export function showTime() {
  const DATE_OBJ = new Date()
  const CURRENTTIME = DATE_OBJ.toLocaleTimeString()
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
  const CURRENTDATE = DATE_OBJ.toLocaleTimeString('en-Us', OPTIONS).split(',')
  const MONTH = CURRENTDATE[1].trim()
  const WEEK = CURRENTDATE[0].trim()
  DATE.textContent = `${WEEK}, ${MONTH}`
}
