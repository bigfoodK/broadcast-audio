import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: blueGrey[900],
      paper: blueGrey[800],
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('root'));
