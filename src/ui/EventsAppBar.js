import React, { Fragment, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withTheme} from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import OddsFormatSwitcher from './OddsFormatSwitcher';


class EventsAppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            direction: 'row',
            justify: 'space-between',
            alignItems: 'center',
        };
    }

    render() {
        const { alignItems, direction, justify } = this.state;
        return (
            <Fragment >
                <AppBar position="sticky">
                    <Toolbar>
                            <Grid
                                item xs={12}
                                container
                                alignItems={alignItems}
                                direction={direction}
                                justify={justify}
                            >
                                <Grid item xs={4} >
                                    <OddsFormatSwitcher />
                                </Grid>
                                <Grid item xs={4} style={{textAlign:'center'}}>
                                    <Typography variant="title" color="inherit" >
                                        Football Events
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <IconButton color="inherit" aria-label="Menu" style={{float:'right'}}>
                                        <MenuIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

EventsAppBar.propTypes = {
};

export default withTheme()(EventsAppBar);
