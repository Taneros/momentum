console.log(`✔️unspash.js loaded`)

let log = console.log

const BODY = document.querySelector('body')
let randomNum

function getRandomNum(num = 20) {
  const MIN = 1
  const MAX = num
  const NUM = Math.floor(Math.random() * (MAX - MIN + 1) + MIN).toString()
  let rndNum = NUM.padStart(2, '0')
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

async function getImgUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=xPw4coWZpgPh4OfvSXnzMGBecVEZL_2GpUhzsCKg4Rs`
  const res = await fetch(url)
  const data = await res.json()
  log(data)
  log(data.urls.regular)
  const img = new Image()
  img.src = data.urls.regular
  log(img.src)
  img.onload = () => {
    BODY.style.cssText = `background-image: url(${img.src})`
  }
}

// getImgUnsplash()
