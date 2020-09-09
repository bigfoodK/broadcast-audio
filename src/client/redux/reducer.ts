import { Action, SET_AUDIO_QUEUE_BUFFER_SIZE } from './actions';
import { State } from './state';

export default function reducer(state: State = new State(), action: Action) {
  switch (action.type) {
    case SET_AUDIO_QUEUE_BUFFER_SIZE: {
      return state.set('audioQueueBufferSize', action.size);
    } break;

    default: {
      return state;
    } break;
  }
}
