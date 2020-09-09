export const SET_AUDIO_QUEUE_BUFFER_SIZE = 'SET_AUDIO_QUEUE_BUFFER_SIZE' as const;

namespace Actions {
  export const setAudioQueueBufferSize = (size: number) => ({
    type: SET_AUDIO_QUEUE_BUFFER_SIZE,
    size,
  });
}

export default Actions;

const actions = [
  Actions.setAudioQueueBufferSize,
] as const;

export type Action = ReturnType<typeof actions[number]>

