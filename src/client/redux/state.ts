import { Record } from 'immutable';

export class State extends Record<{
  audioQueueBufferSize: number;
}>({
  audioQueueBufferSize: 8,
}) {};
