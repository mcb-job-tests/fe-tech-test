import React, { Fragment, Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

class EventTitle extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            competitors: props.competitors,
            home : '',
            away : ''
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.competitors !== state.competitors) {
            return {
                competitors: props.competitors,
                home: props.competitors[0].name,
                away: props.competitors[1].name
            }
        }
        return null;
    }

    render(){
        return (
            <Fragment >
                <Grid container alignItems='center' direction='column'>
                    <Grid item >
                        <Typography variant="title">
                            {this.state.home}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="title">
                            v
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="title">
                            {this.state.away}
                        </Typography>
                    </Grid>
                </Grid>
            </Fragment>
        )
    };
}


EventTitle.propTypes = {
    competitors: PropTypes.array,
};

export default withTheme()(EventTitle);