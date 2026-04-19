import { Howl } from 'howler';

const sounds: Record<string, Howl> = {
  ambient: new Howl({ 
    src: ['/audio/ambient.mp3'], 
    loop: true, 
    volume: 0.12, 
    html5: true,
    preload: false 
  }),
  tick: new Howl({ src: ['/audio/tick.mp3'], volume: 0.4 }),
  lock: new Howl({ src: ['/audio/lock.mp3'], volume: 0.6 }),
  whoosh: new Howl({ src: ['/audio/whoosh.mp3'], volume: 0.3 }),
};

export function enableAudio() { 
  if (!sounds.ambient.playing()) {
    sounds.ambient.play();
  }
}

export function disableAudio() { 
  sounds.ambient.stop(); 
}

export function playTick() { 
  sounds.tick.play(); 
}

export function playLock() { 
  sounds.lock.play(); 
}

export function playWhoosh() { 
  sounds.whoosh.play(); 
}
