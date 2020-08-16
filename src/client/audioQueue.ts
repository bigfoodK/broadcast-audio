export class AudioQueue {
  private chunks: Array<AudioBufferSourceNode> = [];
  private isPlaying: boolean = false;
  private startTime: number = 0;
  private lastChunkOffset: number = 0;

  constructor(
    public readonly audioContext: AudioContext,
    public bufferSize: number = 4,
    private debug = true,
  ) { }

  private createChunk(arrayBuffer: Float32Array) {
    const audioBuffer = this.audioContext.createBuffer(2, 512, 48000);
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const nowBuffering = audioBuffer.getChannelData(channel);

      for (let i = 0; i < nowBuffering.length; i++) {
        nowBuffering[i] = arrayBuffer[i * audioBuffer.numberOfChannels + channel];
      }
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.onended = () => {
      this.chunks.splice(this.chunks.indexOf(source), 1);
      if (this.chunks.length == 0) {
        this.isPlaying = false;
        this.startTime = 0;
        this.lastChunkOffset = 0;
      }
    };
    source.connect(this.audioContext.destination);
    return source;
  }

  private log(data:string) {
      if (this.debug) {
          console.log(new Date().toUTCString() + " : " + data);
      }
  }

  public addChunk(data: Float32Array) {
      if (this.isPlaying && (this.chunks.length > this.bufferSize)) {
          this.log("chunk discarded");
          return;
      } else if (this.isPlaying && (this.chunks.length <= this.bufferSize)) {
          this.log("chunk accepted");
          const chunk = this.createChunk(data);
          chunk.start(this.startTime + this.lastChunkOffset);
          this.lastChunkOffset += chunk.buffer?.duration || 0;
          this.chunks.push(chunk);
      } else if ((this.chunks.length < (this.bufferSize / 2)) && !this.isPlaying) {
          this.log("chunk queued");
          const chunk = this.createChunk(data);
          this.chunks.push(chunk);
      } else {
          this.log("queued chunks scheduled");
          this.isPlaying = true;
          this.chunks.push(this.createChunk(data));
          this.startTime = this.audioContext.currentTime;
          this.lastChunkOffset = 0;
          this.chunks.forEach(chunk => {
            chunk.start(this.startTime + this.lastChunkOffset);
            this.lastChunkOffset += chunk.buffer?.duration || 0;
          });
      }
  }
}