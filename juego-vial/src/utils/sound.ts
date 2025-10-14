import { Howl } from 'howler'

const sounds = {
  click: new Howl({ src: ['https://assets.codepen.io/605876/click.mp3'], volume: 0.4 }),
  advance: new Howl({ src: ['https://assets.codepen.io/605876/pop.mp3'], volume: 0.5 }),
  win: new Howl({ src: ['https://assets.codepen.io/605876/success.mp3'], volume: 0.6 }),
  wrong: new Howl({ src: ['https://assets.codepen.io/605876/error.mp3'], volume: 0.5 }),
}

export function play(name: keyof typeof sounds) {
  sounds[name].play()
}


