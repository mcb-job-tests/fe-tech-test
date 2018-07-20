import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withTheme} from "@material-ui/core/styles/index";
import Tooltip from '@material-ui/core/Tooltip';
import Odds from './Odds';

class WinDrawWinOutcomes extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            marketId: props.marketId,
            outcomesArr: props.outcomesArr,
            fractional: props.fractional,
            odds: new Odds(props.outcomesArr, props.fractional)
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.marketId !== state.marketId || props.outcomesArr !== state.outcomesArr || props.fractional !== state.fractional) {
            return {
                marketId: props.marketId,
                outcomesArr: props.outcomesArr,
                fractional: props.fractional,
                odds : new Odds(props.outcomesArr, props.fractional)
            }
        }
        return null;
    }

    render() {

        const outcomeArray = this.state.outcomesArr;

        if (outcomeArray !== []){
            const homeOdds =  this.state.odds.getOddsString(0);
            const drawOdds =  this.state.odds.getOddsString(1);
            const awayOdds =  this.state.odds.getOddsString(2);

            return (
                    <Grid container spacing={8}>
                        <Grid item xs>
                            <Tooltip title={outcomeArray && homeOdds !== '-' ? outcomeArray[0].name : '' } placement="bottom">
                                <Button variant="contained" style={{textTransform: 'none'}} fullWidth={true} >
                                    <Grid container spacing={8}>
                                        <Grid item xs>
                                            <Typography color="primary" component="p" variant='body2'>
                                                Win
                                            </Typography>
                                        </Grid>
                                        <Grid item xs >
                                            <Typography color="secondary" component="p" variant='body2'>
                                                {homeOdds}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs>
                            <Button variant="contained" style={{textTransform: 'none'}} fullWidth={true} >
                                <Grid container spacing={8}>
                                    <Grid item xs>
                                        <Typography color="primary" component="p" variant='body2'>
                                            Draw
                                        </Typography>
                                    </Grid>
                                    <Grid item xs >
                                        <Typography color="secondary" component="p" variant='body2'>
                                            {drawOdds}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Tooltip title={outcomeArray && awayOdds !== '-' ? outcomeArray[2].name : '' } placement="bottom">
                                <Button variant="contained" style={{textTransform: 'none'}} fullWidth={true}>
                                    <Grid container spacing={8}>
                                        <Grid item xs>
                                            <Typography color="primary" component="p" variant='body2'>
                                                Win
                                            </Typography>
                                        </Grid>
                                        <Grid item xs >
                                            <Typography color="secondary" component="p" variant='body2'>
                                                {awayOdds}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
            )
        } else {
            return ( <Fragment/>)
        }
    }
}

WinDrawWinOutcomes.propTypes = {
    marketId: PropTypes.number.isRequired,
    outcomesArr: PropTypes.array.isRequired,
    fractional: PropTypes.bool.isRequired
};

export default withTheme()(WinDrawWinOutcomes);