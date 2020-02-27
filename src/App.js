import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import theme from './themes/default';
import Footer from './components/Footer';
import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
