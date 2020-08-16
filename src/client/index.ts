import { AudioQueue } from './audioQueue';

const websocket = new WebSocket(`ws://${document.location.host}/audio/1`);
websocket.binaryType = 'arraybuffer';
const audioContext = new AudioContext();
const audioQueue = new AudioQueue(audioContext, 8, false);

websocket.addEventListener('open', () => {
  console.log('connected');

  websocket.addEventListener('close', () => console.log('closed'));
  websocket.addEventListener('error', error => console.error(error));
  websocket.addEventListener('message', event => {
    const arrayBuffer = event.data as ArrayBuffer;
    
    audioQueue.addChunk(new Float32Array(arrayBuffer));
  });
});

const buttonElement = document.createElement('div');
buttonElement.style.cursor = 'pointer';
buttonElement.onclick = () => audioContext.resume();
buttonElement.innerText = 'start';
document.body.appendChild(buttonElement);
