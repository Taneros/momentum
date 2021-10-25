console.log(`✔️settings.js loaded`)

let log = console.log

import { translate } from './translate.js'

export let state = {
  language: 'EN',
  photoSrc: 'github',
  blocks: [],
}

const SETTINGS = document.querySelector('.settings')
const CLOSE = document.querySelector('.closebtn')
const CHECKBOX_HIDESHOW = document.querySelectorAll('#myNav > div > div.overlay-content__hideShowEl input[type=checkbox]')
const CHECKBOX_TRANS = document.querySelectorAll('#myNav > div > div.overlay-content__translate input[type=radio]')
// ELEMENTS TO HIDE
const TIME = document.querySelector('.time')
const DATE = document.querySelector('.date')
const QUOTE = document.querySelector('.quote-container')
const GREETING = document.querySelector('.greeting-container')
const WEATHER = document.querySelector('.weather')
const PLAYER = document.querySelector('.player')

// updateItems()

// EVENT LISTENERS
SETTINGS.addEventListener('click', () => openNav())
CLOSE.addEventListener('click', () => closeNav())
CHECKBOX_TRANS.forEach((el) => {
  el.addEventListener('click', () => {
    if (!el.checked) el.setAttribute('checked', 'true')
    // log(el.value)
    // state.language == el.value
    if (el.value === 'RU') CHECKBOX_TRANS[0].removeAttribute('checked')
    if (el.value === 'EN') CHECKBOX_TRANS[1].removeAttribute('checked')
    updateState()
  })
})
CHECKBOX_HIDESHOW.forEach((el) =>
  el.addEventListener('click', () => {
    // log(el)
    if (!el.checked) el.setAttribute('checked', 'true')
    updateState()
  })
)

// FUNCTIONS
function openNav() {
  document.getElementById('myNav').style.height = '100%'
}

function closeNav() {
  document.getElementById('myNav').style.height = '0%'
  showHide()
  translate()
}

function updateState() {
  Array.from(CHECKBOX_HIDESHOW).forEach((el) => {
    // log(el.checked)
    // check element add to db
    if (el.checked && !state.blocks.includes(el.value)) {
      state.blocks.push(el.value)
      // find index of hidden element
      let idx = state.blocks.indexOf(el.value + '-hide')
      if (idx > -1) {
        state.blocks.splice(idx, 1)
      }
      // uncheck element update db
    } else if (!el.checked && state.blocks.includes(el.value)) {
      // find index of element and delete it
      let idx = state.blocks.indexOf(el.value)
      if (idx > -1) {
        state.blocks.splice(idx, 1)
        state.blocks.push(el.value + '-hide')
      }
    }
  })
  CHECKBOX_TRANS.forEach((el) => {
    if (el.checked) state.language = el.value
    // log('updateItems()', state.language)
  })
  // log(CHECKBOX_TRANS[0].checked, CHECKBOX_TRANS[1].checked)
  // log(state)
}

function onloadUpdate() {
  state.blocks.forEach((el) => {
    switch (el) {
      case 'time-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'time') el.removeAttribute('checked')
        })
        break
      //
      case 'date-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'date') el.removeAttribute('checked')
        })
        break
      //
      case 'greeting-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'greeting') el.removeAttribute('checked')
        })
        break
      //
      case 'quote-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'quote') el.removeAttribute('checked')
        })
        break
      //
      case 'weather-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'weather') el.removeAttribute('checked')
        })
        break
      //
      case 'audio-player-hide':
        // log(el)
        CHECKBOX_HIDESHOW.forEach((el) => {
          if (el.value === 'audio-player') el.removeAttribute('checked')
        })
        break
      //
      default:
        break
    }
  })
  if (state.language === 'EN') {
    CHECKBOX_TRANS[0].setAttribute('checked', 'checked')
    CHECKBOX_TRANS[1].removeAttribute('checked')
  } else {
    CHECKBOX_TRANS[1].setAttribute('checked', 'checked')
    CHECKBOX_TRANS[0].removeAttribute('checked')
  }
  translate()
}

function showHide() {
  state.blocks.forEach((el, idx) => {
    // log(el)
    switch (el) {
      case 'time':
        TIME.style.cssText = 'visibility: visible;'
        break
      case 'time-hide':
        TIME.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      case 'date':
        DATE.style.cssText = 'visibility: visible;'
        break
      case 'date-hide':
        DATE.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      case 'greeting':
        GREETING.style.cssText = 'visibility: visible;'
        break
      case 'greeting-hide':
        GREETING.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      case 'quote':
        QUOTE.style.cssText = 'visibility: visible;'
        break
      case 'quote-hide':
        QUOTE.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      case 'weather':
        WEATHER.style.cssText = 'visibility: visible;'
        break
      case 'weather-hide':
        WEATHER.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      case 'audio-player':
        PLAYER.style.cssText = 'visibility: visible;'
        break
      case 'audio-player-hide':
        PLAYER.style.cssText = 'visibility: hidden; pointer-events: none'
        break
      //
      default:
        break
    }
  })
}

function setLocalStorageSettings() {
  // updateItems()
  localStorage.setItem('settings', JSON.stringify(state))
}

function getLocalStorageSettings() {
  // log(JSON.parse(localStorage.getItem('settings')))
  if (!localStorage.getItem('settings')) {
    updateState()
  } else {
    state = JSON.parse(localStorage.getItem('settings'))
    showHide()
    // update overlay settings if settings saved before
    onloadUpdate()
  }
}

window.addEventListener('beforeunload', setLocalStorageSettings)
window.addEventListener('load', getLocalStorageSettings)

/**
 *
 *
 */
