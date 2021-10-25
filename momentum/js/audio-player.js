console.log(`✔️audio-player.js loaded`)

let log = console.log
import PLAYLIST from './play-list.js'

const AUDIO = document.querySelector('.audio')
const PLAY = document.querySelector('.play')
const PREV = document.querySelector('.play-prev')
const NEXT = document.querySelector('.play-next')
const UL_PLAYLIST = document.querySelector('.play-list')
let isPlaying = false
let playListItems = null
let isPlay = false
let playNum = 0

newSrc()

function newSrc() {
  AUDIO.src = PLAYLIST[playNum].src
  // log(AUDIO.src)
}

// Event listeners
PLAY.addEventListener('click', () => {
  if (!isPlay) {
    playAudio()
    isPlay = true
  } else {
    pauseAudio()
    isPlay = false
  }
})

PREV.addEventListener('click', () => {
  if (playNum === 0) {
    playNum = 3
  } else {
    playNum--
  }
  playPrev()
})

NEXT.addEventListener('click', () => {
  if (playNum === 3) {
    playNum = 0
  } else {
    playNum++
  }
  playNext()
})

AUDIO.addEventListener(
  'ended',
  () => {
    triggerEvent(NEXT)
  },
  false
)

// Player functions

function triggerEvent(elem) {
  elem.dispatchEvent(new MouseEvent('click', { bubbles: true, cancellable: true }))
}

function playAudio() {
  if (!isPlay) {
    PLAY.classList.remove('play')
    PLAY.classList.add('pause')
  }
  AUDIO.currentTime = 0
  AUDIO.play()
  isPlaying = true
}

function pauseAudio() {
  if (isPlay) {
    PLAY.classList.remove('pause')
    PLAY.classList.add('play')
  }
  AUDIO.pause()
  isPlaying = false
}

function playNext() {
  PLAY.classList.forEach((el) => {
    if (el === 'pause') {
      PLAY.classList.remove('pause')
      PLAY.classList.add('play')
    }
  })
  // AUDIO.src = PLAYLIST[playNum].src
  newSrc()
  activeSongHL()
  if (isPlaying) {
    triggerEvent(PLAY)
    triggerEvent(PLAY)
  }
}

function playPrev() {
  PLAY.classList.forEach((el) => {
    if (el === 'pause') {
      PLAY.classList.remove('pause')
      PLAY.classList.add('play')
    }
  })
  // AUDIO.src = PLAYLIST[playNum].src
  newSrc()
  activeSongHL()
}

// Playlist
PLAYLIST.forEach((el, idx) => {
  const LI = document.createElement('li')
  LI.classList.add('play-item')
  LI.textContent = `${el.title}`
  LI.dataset.playlistId = `${idx}`
  UL_PLAYLIST.append(LI)
  // log(LI.dataset)
  // update playlist variable after finihing addint them to DOM
  if (idx === PLAYLIST.length - 1) {
    playListItems = document.getElementsByClassName('play-item')
    // console.log('playListItems', playListItems)
  }
})

// click events on play-list items
Array.from(playListItems).forEach((el) =>
  el.addEventListener('click', () => {
    Array.from(playListItems).forEach((el) => el.classList.remove('item-active'))
    el.classList.add('item-active')
    // log('playNum before', playNum)
    playNum = el.dataset.playlistId
    newSrc()
    // log('playNum new', playNum)
    if (isPlaying) {
      triggerEvent(PLAY)
      triggerEvent(PLAY)
    }
  })
)

// change active song highlighter
function activeSongHL() {
  Array.from(playListItems).forEach((el) => el.classList.remove('item-active'))
  // log('before', playListItems)
  playListItems[playNum].classList.add('item-active')
  // log('after', playListItems)
}

window.addEventListener('load', activeSongHL())

//TODO
/**
 * EXTRA
 *
 */
