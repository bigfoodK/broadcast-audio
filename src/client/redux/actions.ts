export const SET_AUDIO_QUEUE_BUFFER_SIZE = 'SET_AUDIO_QUEUE_BUFFER_SIZE' as const;
export const SET_AUDIO_CHUNK_COUNT = 'SET_AUDIO_CHUNK_COUNT' as const;

namespace Actions {
  export const setAudioQueueBufferSize = (size: number) => ({
    type: SET_AUDIO_QUEUE_BUFFER_SIZE,
    size,
  });

  export const setAudioChunkCount = (count: number) => ({
    type: SET_AUDIO_CHUNK_COUNT,
    count,
  });
}

export default Actions;

const actions = [
  Actions.setAudioQueueBufferSize,
  Actions.setAudioChunkCount,
] as const;

export type Action = ReturnType<typeof actions[number]>

