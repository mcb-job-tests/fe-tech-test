import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withTheme} from "@material-ui/core/styles/index";
import Divider from '@material-ui/core/Divider';
import Odds from './Odds';

class StandardOutcomes extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            market: props.market,
            outcomesArr: props.outcomesArr,
            fractional: props.fractional,
            odds: {}
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.market !== state.market || props.fractional !== state.fractional || props.outcomesArr !== state.outcomesArr) {
            return {
                market: props.market,
                outcomesArr: props.outcomesArr,
                fractional: props.fractional,
                odds: new Odds(props.outcomesArr, props.fractional)
            }
        }
        return null;
    }

    static capitalizeFirstCharacterOfString(str){
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    getOutcomeLabel(outcome){
        if ( this.state.market.name.includes("Under/Over") ) {
            const lineValueStr = '(' + this.state.market.lineValue + ')';
            return StandardOutcomes.capitalizeFirstCharacterOfString(outcome.type) + ' ' + lineValueStr;
        } else {
            return outcome.name;
        }
    }

    render() {
        let outcomesArray = this.state.outcomesArr;

        if ( outcomesArray !== [] ) {

            return outcomesArray.map((outcome, index) => (
                <Fragment key={index} >
                    <Grid container direction='row' justify='space-between' alignItems='center' >
                        <Grid item xs={8}>
                            <Typography style={{padding:8}} color="primary" component="p" variant='body2' align='left'>
                                {this.getOutcomeLabel(outcome)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <Button variant="contained" style={{textTransform: 'none'}} fullWidth={true} >
                                <Typography color="secondary" component="p" variant='body2' align='right'>
                                    {this.state.odds.getOddsString(index)}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider />
                </Fragment>
                )
            )
        } else {
            return (
                <Fragment/>
            )
        }
    }
}

StandardOutcomes.propTypes = {
    market: PropTypes.object.isRequired,
    outcomesArr: PropTypes.array.isRequired,
    fractional: PropTypes.bool.isRequired
};

export default withTheme()(StandardOutcomes);