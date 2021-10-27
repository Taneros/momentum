console.log(`✔️bg-change.js loaded`)

let log = console.log

import { getTimeOfDay } from './greeting.js'
import { state, getLocalStorageSettings } from './settings.js'

getLocalStorageSettings()
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

function getRandomNum(num = 20) {
  const MIN = 1
  const MAX = num
  const NUM = Math.floor(Math.random() * (MAX - MIN + 1) + MIN).toString()
  let rndNum = NUM.padStart(2, '0')
  // console.log(`random num ${randomNum}`)
  randomNum = rndNum
  return rndNum
}

function getTimeOfDayBg() {
  const DATE_OBJ = new Date()
  const TIME_HR = DATE_OBJ.getHours()
  const TIME_MIN = DATE_OBJ.getMinutes()
  // const TIME = TIME_HR.toString() + ':' + TIME_MIN.toString()
  // log(TIME)
  if (TIME_HR >= 6 && TIME_HR < 12) return 'morning'
  else if (TIME_HR >= 12 && TIME_HR < 18) return 'afternoon'
  else if (TIME_HR >= 18 && TIME_HR < 24) return 'evening'
  else if (TIME_HR >= 0 && TIME_HR < 6) return 'night'
}

function setBG(click = false) {
  if (state.imgSrc === 'github') getImgGitHub(click)
  if (state.imgSrc === 'flickr') getImgFlickr()
}

async function getImgGitHub(click) {
  log(`Github img source`)
  const url = 'https://raw.githubusercontent.com/Taneros/stage1-tasks/assets/images/'
  const img = new Image()
  if (!click) img.src = `${url + getTimeOfDayBg() + '/' + getRandomNum(20)}.jpg`
  else img.src = `${url + getTimeOfDayBg() + '/' + randomNum}.jpg`
  img.onload = () => {
    // log(`image loaded`)
    BODY.style.cssText = `background-image: url(${img.src})`
  }
}

async function getImgFlickr() {
  log(`Flicker img source`)
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10fa0cd7a5d8e616f96e23509396fa6b&tags=nature,${getTimeOfDayBg()},-people&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`
  const res = await fetch(url)
  const data = await res.json()
  let photoArrLen = data.photos.photo.length - 1
  // log(data.photos.photo[99].url_h)
  let randomFlickrNum = getRandomNum(photoArrLen)
  const img = new Image()
  // log(randomFlickrNum)
  img.src = data.photos.photo[Number(randomFlickrNum)].url_h
  // log(img.src)
  img.onload = () => {
    BODY.style.cssText = `background-image: url(${img.src})`
  }
}

function getSlideNext() {
  if (state.imgSrc === 'github') getRandomNum(20)
  const NUM = Number(randomNum)
  // log(NUM)
  if (NUM === 20) randomNum = `${1}`.padStart(2, '0')
  else randomNum = (NUM + 1).toString().padStart(2, '0')
  setBG(true)
}

function getSlidePrev() {
  if (state.imgSrc === 'github') getRandomNum(20)
  const NUM = Number(randomNum)
  // log(NUM)
  if (NUM === 1) randomNum = `${20}`.padStart(2, '0')
  else randomNum = (NUM - 1).toString().padStart(2, '0')
  setBG(true)
}

export { setBG }

// TODO
/**

 */
