console.log(`✔️flickr.js loaded`)

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

async function getImgFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10fa0cd7a5d8e616f96e23509396fa6b&tags=nature,${getTimeOfDayBg()},-people&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`
  const res = await fetch(url)
  const data = await res.json()
  let photoArrLen = data.photos.photo.length - 1
  // log(data.photos.photo[99].url_h)
  let randomFlickrNum = getRandomNum(photoArrLen)
  const img = new Image()
  log(randomFlickrNum)
  img.src = data.photos.photo[Number(randomFlickrNum)].url_h
  log(img.src)
  img.onload = () => {
    BODY.style.cssText = `background-image: url(${img.src})`
  }
}

getImgFlickr()
