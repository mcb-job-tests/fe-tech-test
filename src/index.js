import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-roboto";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

const AppWrapper = () => (
    < MuiThemeProvider theme={ theme } >
            <App/>
    </ MuiThemeProvider >
);


ReactDOM.render( <AppWrapper />, document.getElementById( 'root' ) );
registerServiceWorker();
