import React, { useEffect, useState } from 'react';
import { CardContent, LinearProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/state';

export default function ChunkDisplayer() {
  const audioQueueBufferSize = useSelector((state: State) => state.audioQueueBufferSize);
  const audioChunkCount = useSelector((state: State) => state.audioChunkCount);

  const [halfChunkCount, sethalfChunkCount] = useState(Math.floor((audioQueueBufferSize / 2)));

  useEffect(() => sethalfChunkCount(Math.floor((audioQueueBufferSize / 2))), [audioQueueBufferSize]);

  const audioBufferUsage = (audioChunkCount / audioQueueBufferSize) * 100

  return (
    <CardContent>
      <Typography>Audio Buffer Usage</Typography>
      <LinearProgress
        variant="determinate"
        color={audioChunkCount < halfChunkCount ? 'secondary' : 'primary'}
        value={audioBufferUsage}
      />
    </CardContent>
  );
}
