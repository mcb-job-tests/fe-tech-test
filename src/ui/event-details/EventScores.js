import React, { Fragment, Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

class EventScores extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            scores: props.scores,
            competitors: props.competitors,
            homeScore: '',
            awayScore: '',
            homeTeam: '',
            awayTeam: '',
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.scores !== state.scores || props.competitors !== state.competitors) {
            return {
                scores: props.scores,
                competitors: props.competitors,
                homeScore: props.scores.home,
                awayScore: props.scores.away,
                homeTeam: props.competitors[0].name.substr(0,3).toUpperCase(),
                awayTeam: props.competitors[1].name.substr(0,3).toUpperCase()
            }
        }
        return null;
    }

    render(){
        return (
            <Fragment >
                <Grid container >
                    <Grid item xs={6}>
                        <Grid container >
                            <Grid item xs={9}>
                                <Typography variant="display1" align='right'>
                                    {this.state.homeTeam}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} >
                                <Typography variant="display1" align='center'>
                                    {this.state.homeScore}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container >
                            <Grid item xs={3} >
                                <Typography variant="display1" align='center'>
                                    {this.state.awayScore}
                                </Typography>
                            </Grid>
                            <Grid item xs={9} >
                                <Typography variant="display1" align='left'>
                                    {this.state.awayTeam}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    };
}


EventScores.propTypes = {
    scores: PropTypes.object,
    competitors: PropTypes.array,
};

export default withTheme()(EventScores);