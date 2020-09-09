import { Record } from 'immutable';

export class State extends Record<{
  audioQueueBufferSize: number;
  audioChunkCount: number;
}>({
  audioQueueBufferSize: 8,
  audioChunkCount: 0,
}) {};
