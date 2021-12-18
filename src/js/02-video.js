import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveTime(e) {
  let currentTime = e.seconds;

  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
}

const trotlledSaveTime = throttle(e => saveTime(e), 1000);

player.on('timeupdate', trotlledSaveTime);

if (localStorage.getItem(CURRENT_TIME_KEY)) {
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY));
}
