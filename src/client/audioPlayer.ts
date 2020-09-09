import { AudioQueue } from './audioQueue';

class AudioPlayer {
  private audioContext = new AudioContext();

  private audioQueue = new AudioQueue(this.audioContext, 8, false);

  constructor() {


  }

  public setAudioBufferSize(size: number) {
    this.audioQueue.bufferSize = size;
  }

  public addAudioChunk (chunk: Float32Array) {
    this.audioQueue.addChunk(chunk);
  }

  public resumeAudioContext() {
    this.audioContext.resume();
  }
}

const audioPlayer = new AudioPlayer();

export default audioPlayer;
