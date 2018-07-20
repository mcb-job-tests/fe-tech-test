import React, { Component } from 'react';
import MarketList from './MarketList.js';
import { withTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";

class Markets extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            eventId: props.match.params.eventId,
            markets: props.markets,
            outcomes: props.outcomes,
        };
    };

    componentDidMount() {
        const LIVE_FOOTBALL_EVENTS_URL = "http://localhost:8888/sportsbook/event/"+ this.state.eventId;
        let _this = this;
        fetch(LIVE_FOOTBALL_EVENTS_URL)
            .then((resp) => resp.json())
            .then(function(data) {
                _this.setState({
                    event: data.event,
                    markets: data.markets,
                    outcomes: data.outcomes
                });
                _this.props.setHeader( "Markets", data.event.name );
            });
    }

    render(){
        return (
            < MarketList
                eventId={ this.state.eventId }
                event={ this.state.event }
                markets={ this.state.markets }
                outcomes={ this.state.outcomes }
            />
        )
    };
}

Markets.propTypes = {
    markets: PropTypes.object,
    outcomes: PropTypes.object
};

export default withTheme()(Markets);