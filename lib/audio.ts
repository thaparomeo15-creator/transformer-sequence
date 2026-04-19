'use client'
let enabled = false
let sounds: any = {}
export function initAudio() {
  if (typeof window === 'undefined') return
  try {
    const { Howl } = require('howler')
    sounds = {
      ambient: new Howl({ src: ['/audio/ambient.mp3'], loop: true, volume: 0.12, html5: true }),
      tick: new Howl({ src: ['/audio/tick.mp3'], volume: 0.4 }),
      lock: new Howl({ src: ['/audio/lock.mp3'], volume: 0.6 }),
      whoosh: new Howl({ src: ['/audio/whoosh.mp3'], volume: 0.3 }),
    }
  } catch {}
}
export function enableAudio() { enabled = true; try { sounds.ambient?.play() } catch {} localStorage.setItem('audio-enabled','true') }
export function disableAudio() { enabled = false; try { sounds.ambient?.stop() } catch {} localStorage.setItem('audio-enabled','false') }
export function playTick() { if (enabled) try { sounds.tick?.play() } catch {} }
export function playLock() { if (enabled) try { sounds.lock?.play() } catch {} }
export function playWhoosh() { if (enabled) try { sounds.whoosh?.play() } catch {} }
export function getEnabled() { return enabled }
