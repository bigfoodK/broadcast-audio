import { EventEmitter } from "events";

export declare interface AudioQueue {
  on(eventName: 'ready', listener: Function): this;
  emit(eventName: 'ready'): boolean;
}

export class AudioQueue extends EventEmitter {
  private ready: boolean = false;

  private queue: AudioBuffer[] = [];

  public push(audioBuffer: AudioBuffer) {
    this.queue.push(audioBuffer);
    if (this.queue.length > 5) {
      this.queue.splice(5);
    }
    if (!this.ready && this.queue.length > 2) {
      this.ready = true;
      this.emit('ready');
    }
  };

  public shift() {
    return this.queue.shift();
  }
}
