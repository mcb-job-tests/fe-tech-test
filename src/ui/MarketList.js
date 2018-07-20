import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Market from './Market.js';
import Divider from '@material-ui/core/Divider';
import { withTheme } from '@material-ui/core/styles';

class MarketList extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            markets: props.markets,
            outcomes: props.outcomes,
            eventId: props.eventId
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.eventId !== state.eventId || props.markets !== state.markets || props.outcomes !== state.outcomes) {
            return {
                markets: props.markets,
                outcomes: props.outcomes,
                eventId: props.eventId
            }
        }
        return null;
    }

    renderMarketList(){
        const style = {
            height: "4px",
            border: 0,
            boxShadow: "0 6px 6px -6px black inset"
        };

        return this.state.markets[this.state.eventId].map( ( market, index )=>(
            <Fragment key={ index } >
                < Market
                    eventId = { this.state.eventId }
                    market={ market }
                    outcomes={ this.state.outcomes }
                />
                <Divider style={ style } />
            </Fragment>
        ));
    };

    render(){
        if ( this.state.eventId &&  this.state.markets ) {
            return (
                <Fragment>
                    {this.renderMarketList()}
                </Fragment>
            );
        } else {
            return null

        }
    };
}


MarketList.propTypes = {
    markets: PropTypes.object,
    outcomes: PropTypes.object,
    eventId: PropTypes.string.isRequired
};

export default withTheme()(MarketList);