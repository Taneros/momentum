console.log(`bg-change.js loaded`)

let log = console.log

import { getTimeOfDay } from './greeting.js'

// console.log(getTimeOfDay())

let randomNum
const BODY = document.querySelector('body')
const IMG_LINK = 'https://raw.githubusercontent.com/Taneros/stage1-tasks/assets/images/'
const SLIDE_PREV = document.querySelector('.slide-prev')
const SLIDE_NEXT = document.querySelector('.slide-next')
SLIDE_NEXT.addEventListener('click', bounce(getSlideNext, 500))
SLIDE_PREV.addEventListener('click', bounce(getSlidePrev, 500))

getRandomNum()
setBG()

function bounce(f, w, i) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!i) f.apply(context, args)
    }
    var callNow = i && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, w)
    if (callNow) f.apply(context, args)
  }
}

function getRandomNum() {
  const MIN = 1
  const MAX = 20
  const NUM = Math.floor(Math.random() * (MAX - MIN + 1) + MIN).toString()
  randomNum = NUM.padStart(2, '0')
}

function setBG() {
  log(`setBG randomNum ${randomNum}`)
  const img = new Image()
  img.src = `${IMG_LINK + getTimeOfDay().split(' ')[1] + '/' + randomNum}.jpg`
  img.onload = () => {
    log(`image loaded`)
    BODY.style.cssText = `background-image: url('${IMG_LINK + getTimeOfDay().split(' ')[1] + '/' + randomNum}.jpg')`
  }
}

function getSlideNext() {
  const NUM = Number(randomNum)
  log(NUM)
  if (NUM === 20) randomNum = `${1}`.padStart(2, '0')
  else randomNum = (NUM + 1).toString().padStart(2, '0')
  setBG()
}

function getSlidePrev() {
  const NUM = Number(randomNum)
  log(NUM)
  if (NUM === 1) randomNum = `${20}`.padStart(2, '0')
  else randomNum = (NUM - 1).toString().padStart(2, '0')
  setBG()
}

// log(getTimeOfDay().split(' ')[1])
// log(BODY)
