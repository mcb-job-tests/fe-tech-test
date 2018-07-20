import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withTheme} from "@material-ui/core/styles/index";

class CorrectScoreOutcomeCell extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            cellContents: props.cellContents
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.cellDisplay !== state.cellDisplay) {
            return {
                cellDisplay: props.cellDisplay,
            }
        }
        return null;
    }


    render() {
        const cellContents = this.state.cellContents;
        return (
            <Grid item xs>
                <Button variant="contained" style={{textTransform: 'none'}} fullWidth={true} >
                    <Grid container spacing={8} direction='row'>
                        <Grid item xs={6}>
                            <Typography color="primary" component="p" variant='body2' align='right'>
                                { cellContents.displayOdds !== '-' ? cellContents.displayScore : '-' }
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color="secondary" component="p" variant='body2' align='left'>
                                { cellContents.displayOdds !== '-' ? cellContents.displayOdds : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        )
    }
}

CorrectScoreOutcomeCell.propTypes = {
    cellContents: PropTypes.object.isRequired
};

export default withTheme()(CorrectScoreOutcomeCell);