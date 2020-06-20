import { RtAudio, RtAudioApi, RtAudioFormat, RtAudioStreamFlags } from 'audify';
import WebSocket from 'ws';

export default class AudioBroadcaster {
  constructor() {

    const rtAudio = new RtAudio(RtAudioApi.LINUX_PULSE);    
    rtAudio.openStream(
      null,
      {
        deviceId: rtAudio.getDefaultInputDevice(),
        nChannels: 2,
      },
      RtAudioFormat.RTAUDIO_FLOAT32,
      48000,
      1920,
      "MyStream",
      pcm => this.sendAudio(pcm),
      null,
      RtAudioStreamFlags.RTAUDIO_NONINTERLEAVED,
    );
    rtAudio.start();
    this.rtAudio = rtAudio;
  }
  private rtAudio: RtAudio;

  private websockets: Set<WebSocket> = new Set();

  public sendAudio(buffer: Buffer) {
    this.websockets.forEach(websocket => websocket.send(buffer));
  }

  public subscribe(websocket: WebSocket) {
    console.log('open');
    this.websockets.add(websocket);
    websocket.addEventListener('close', () => {
      console.log('close');
      this.websockets.delete(websocket);
    });
    websocket.addEventListener('error', error => console.error(error));
  }
}
