import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveTime(e) {
  let currentTime = e.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
}

const trotlledSaveTime = throttle((e) => saveTime(e), 1000);

player.on('timeupdate', trotlledSaveTime);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
