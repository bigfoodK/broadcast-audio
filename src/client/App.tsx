import React, { Component } from 'react';
import { Grid, Dialog, Button } from '@material-ui/core';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import Configuration from './components/Configuration';
import audioPlayer from './audioPlayer';
import Visualizer from './components/Visualizer';

type AppProps = {
} & WithSnackbarProps;

type AppStates = {
  startDialogOpen: boolean;
};

class App extends Component<AppProps, AppStates> {
  private websocket?: WebSocket;

  private shouldConnect = false;

  private reconnectTimeout = setTimeout(() => {}, 0);

  public constructor(props: AppProps) {
    super(props);
    this.state = {
      startDialogOpen: true,
    };
  }

  private connect() {
    const websocket = new WebSocket(`ws://${document.location.host}/audio/1`);
    websocket.binaryType = 'arraybuffer';

    websocket.addEventListener('open', () => {
      clearTimeout(this.reconnectTimeout);
      this.props.enqueueSnackbar('connected', { variant: 'success' });

      websocket.addEventListener('close', () => {
        this.props.enqueueSnackbar('disconnected', { variant: 'info' });
        if(!this.shouldConnect) {
          return;
        }

        this.props.enqueueSnackbar('retry in 5 second', { variant: 'info' });
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = setTimeout(() => this.connect(), 5000);
      });

      websocket.addEventListener('error', error => this.props.enqueueSnackbar(`error ${error}`, { variant: 'error' }));
      websocket.addEventListener('message', event => {
        const arrayBuffer = event.data as ArrayBuffer;
        audioPlayer.addAudioChunk(new Float32Array(arrayBuffer));
      });
    });
    
    this.websocket = websocket;
  }

  public render() {
    const {
      startDialogOpen,
    } = this.state;
  
    return (
      <Grid container spacing={2}>
        <Configuration />
        <Visualizer />
        <Dialog open={startDialogOpen}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              this.shouldConnect = true;
              audioPlayer.resumeAudioContext();
              this.connect();
              this.setState({
                startDialogOpen: false,
              });
            }}
          >Connect</Button>
        </Dialog>
      </Grid>
    );
  }
}

export default withSnackbar(App);
