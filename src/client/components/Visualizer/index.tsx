import React from 'react';
import { Grid, Card } from '@material-ui/core';
import ChunkDisplayer from './ChunkDisplayer';

export default function Visualizer() {
  return (
    <Grid item xs={12} md={6} xl={3}>
      <Card>
        <ChunkDisplayer />
      </Card>
    </Grid>
  );
}
