import React, {Component, Fragment} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {OddsContext} from '../OddsContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiFormControlLabel: {
            label: {
                color: 'white',
            },
        },
    },
});

class OddsFormatSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Fragment>
                <FormGroup >
                    <OddsContext.Consumer>
                        {({fractional, toggleOdds}) => (
                            <MuiThemeProvider theme={theme}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={fractional}
                                            onChange={toggleOdds}
                                        />
                                    }
                                    label={fractional ? 'Fractional' : 'Decimal'}
                                />
                            </MuiThemeProvider>
                        )}
                    </OddsContext.Consumer>
                </FormGroup>
            </Fragment>
        );
    }
}

OddsFormatSwitcher.propTypes = {
};

export default OddsFormatSwitcher;
