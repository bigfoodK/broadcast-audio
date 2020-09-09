import React, { useEffect } from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import ConfigurationInput from './ConfigurationInput';
import { useSelector } from 'react-redux';
import { State } from '../../redux/state';
import { dispatch } from '../../redux/store';
import Actions from '../../redux/actions';
import audioPlayer from '../../audioPlayer';

type ConfigurationProps = {};

export default function Configuration(props: ConfigurationProps) {
  const audioQueueBufferSize = useSelector((state: State) => state.audioQueueBufferSize);

  useEffect(() => audioPlayer.setAudioBufferSize(audioQueueBufferSize), [audioQueueBufferSize]);

  return (
    <Grid item xs={12} md={6} xl={3}>
      <Card>
        <CardContent>
          <ConfigurationInput
            fullWidth
            inputType="number"
            label="Audio Buffer Size"
            value={audioQueueBufferSize.toString()}
            onChange={value => dispatch(Actions.setAudioQueueBufferSize(parseInt(value)))}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
