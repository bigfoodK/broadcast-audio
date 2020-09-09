import { AudioQueue } from './audioQueue';
import Actions from './redux/actions';
import { dispatch } from './redux/store';

class AudioPlayer {
  private audioContext = new AudioContext();
  private audioQueue = new AudioQueue(this.audioContext, 8, false);
  private previousChunkCount: number = 0;

  constructor() { }

  public setAudioBufferSize(size: number) {
    this.audioQueue.bufferSize = size;
  }

  public addAudioChunk (chunk: Float32Array) {
    const chunkCount = this.audioQueue.addChunk(chunk);
    if (chunkCount !== this.previousChunkCount) {
      this.previousChunkCount = chunkCount;
      dispatch(Actions.setAudioChunkCount(chunkCount));
    }
  }

  public resumeAudioContext() {
    this.audioContext.resume();
  }
}

const audioPlayer = new AudioPlayer();

export default audioPlayer;
