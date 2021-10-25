console.log(`✔️quote-of-day.js loaded`)

let log = console.log

const API_URL = { locale: 'https://type.fit/api/quotes' }
const QUOTE = document.querySelector('.quote')
const AUTHOR = document.querySelector('.author')
const CHANGE_Q = document.querySelector('.change-quote')
let btn_pressed = false
getQuotes(API_URL.locale)
const SLEEP = (milliseconds = 500) => new Promise((resolve) => setTimeout(resolve, milliseconds))

CHANGE_Q.addEventListener('click', () => {
  ;(async () => {
    await SLEEP(500)
    getQuotes(API_URL.locale)
  })()
})

function bounce(f, w, i) {
  console.log(`debounce f:${f}, w:${w}`)
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

async function getQuotes(url) {
  log(url)
  try {
    // console.log(`API_URL ${url}`)
    const res = await fetch(url)
    const data = await res.json()
    // log(data)
    // log(data.length)
    const randomQuote = data[Math.floor(Math.random() * data.length)]
    // log(randomQuote)
    QUOTE.textContent = `"${randomQuote.text}"`
    AUTHOR.textContent = `${randomQuote.author}`
  } catch (e) {
    getQuotes('./js/quotes.json')
  }
}

export { API_URL, getQuotes }
