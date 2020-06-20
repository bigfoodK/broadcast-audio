import { AudioQueue } from "./audioQueue";

const websocket = new WebSocket(`ws://${document.location.host}/audio/1`);
websocket.binaryType = 'arraybuffer';
const audioContext = new AudioContext({ sampleRate: 48000 });
const audioQueue = new AudioQueue();

function createAudioBuffer(arrayBuffer: Float32Array) {
  const audioBuffer = audioContext.createBuffer(2, 1920, audioContext.sampleRate);
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    const nowBuffering = audioBuffer.getChannelData(channel);
    
    for (let i = 0; i < audioBuffer.length; i++) {
      nowBuffering[i] = arrayBuffer ? arrayBuffer[i] || 0 : 0;
    }
  }
  return audioBuffer;
}

async function audioTick() {
  const source = audioContext.createBufferSource();

  const audioBuffer = audioQueue.shift() || null;

  source.buffer = audioBuffer;

  source.onended = () => {
    audioTick();
  };
  source.connect(audioContext.destination);
  source.start();
}

websocket.addEventListener('open', () => {
  console.log('connected');

  audioQueue.on('ready', audioTick)
  
  websocket.addEventListener('close', () => console.log('closed'));
  websocket.addEventListener('error', error => console.error(error));
  websocket.addEventListener('message', event => {
    const arrayBuffer = event.data as ArrayBuffer;
    
    const audioBuffer = createAudioBuffer(new Float32Array(arrayBuffer));
    audioQueue.push(audioBuffer);
  });
});

const buttonElement = document.createElement('div');
buttonElement.style.cursor = 'pointer';
buttonElement.onclick = () => audioContext.resume();
buttonElement.innerText = 'start';
document.body.appendChild(buttonElement);
