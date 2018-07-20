import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';
import {withTheme} from "@material-ui/core/styles/index";

import {OddsContext} from '../OddsContext';
import Outcomes from './Outcomes';

class Market extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            eventId: this.props.eventId,
            market: this.props.market,
            outcomes: this.props.outcomes
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.eventId !== state.eventId || props.market !== state.market || props.outcomes !== state.outcomes) {
            return {
                eventId: props.eventId,
                market: props.market,
                outcomes: props.outcomes
            }
        }
        return null;
    }

    isDisabled(){
        switch(this.state.market.type){
            case 'win-draw-win':
            case 'standard':
            case 'correct-score':
                return this.state.outcomes === 'undefined';
            default:
                return true;
        }
    }

    render() {
        const style = {
            textAlign: 'center',
        };

        return (
            <ExpansionPanel disabled={ this.isDisabled() } CollapseProps={{ mountOnEnter: true, unmountOnExit: true }} style={style}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography component="p" variant='body2'>
                        {this.state.market['name']}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    <OddsContext.Consumer>
                        {({fractional}) => (
                            <Outcomes
                                market={this.state.market}
                                outcomes={this.state.outcomes}
                                fractional={fractional}
                            />
                        )}
                    </OddsContext.Consumer>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        )
    }
}

Event.propTypes = {
    eventId: PropTypes.number.isRequired,
    market: PropTypes.object.isRequired,
    outcomes: PropTypes.object.isRequired
};

export default withTheme()(Market);