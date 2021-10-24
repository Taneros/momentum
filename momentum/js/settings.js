console.log(`✔️settings.js loaded`)

let log = console.log()

const SETTINGS = document.querySelector('.settings')
const CLOSE = document.querySelector('.closebtn')

SETTINGS.addEventListener('click', () => openNav())
CLOSE.addEventListener('click', () => closeNav())

function openNav() {
  document.getElementById('myNav').style.height = '100%'
}

function closeNav() {
  document.getElementById('myNav').style.height = '0%'
}
