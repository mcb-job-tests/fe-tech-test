import React, { Fragment, Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

class EventTypeName extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            linkedEventTypeName: ''
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.linkedEventTypeName !== state.linkedEventTypeName) {
            return {
                linkedEventTypeName: props.linkedEventTypeName,
            }
        }
        return null;
    }

    render(){
        return (
            <Fragment >
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant="subheading">
                            {this.state.linkedEventTypeName}
                        </Typography>
                    </Grid>
                </Grid>
            </Fragment>
        )
    };
}


EventTypeName.propTypes = {
    linkedEventTypeName: PropTypes.string,
};

export default withTheme()(EventTypeName);