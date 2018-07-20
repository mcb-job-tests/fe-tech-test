import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import WinDrawWinOutcomes from './market-outcomes/WinDrawWinOutcomes';
import StandardOutcomes from './market-outcomes/StandardOutcomes';
import CorrectScoreOutcomes from './market-outcomes/CorrectScoreOutcomes';

import {withTheme} from "@material-ui/core/styles/index";

import clone from 'clone';

class Outcomes extends Component {

    constructor ( props ) {
        super( props );

        const webSocket = new WebSocket("ws://localhost:8889");

        this.state = {
            market: props.market,
            outcomesArr: [],
            fractional: props.fractional,
            webSocket: webSocket
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.market !== state.market || props.fractional !== state.fractional) {
            return {
                market: props.market,
                fractional: props.fractional,
            }
        }
        return null;
    }

    componentDidMount() {
        const EVENT_MARKET_URL = "http://localhost:8888/sportsbook/market/" + this.state.market.marketId;

        let _this = this;
        fetch(EVENT_MARKET_URL)
            .then((resp) => resp.json())
            .then(function(data) {
                _this.setState({
                    outcomesArr: data.outcomes[_this.state.market.marketId]
                });
            });

        this.state.webSocket.addEventListener("open", function(event) {
            _this.state.webSocket.send(
                JSON.stringify({
                    type: "subscribe",
                    keys: ["m." + _this.state.market.marketId]
                })
            );
        });

        this.state.webSocket.addEventListener("message", m => {
            const obj = JSON.parse(m.data);
            console.log(obj);
            switch(obj.type){
                case "OUTCOME_STATUS":
                    console.log("OUTCOME_STATUS");
                    break;
                case "PRICE_CHANGE":
                    console.log("PRICE_CHANGE");
                    let outcomesArr = clone(_this.state.outcomesArr);
                    let outcomeIndex = outcomesArr.findIndex(outcome => outcome.outcomeId === obj.data.outcomeId);

                    outcomesArr[outcomeIndex].price = obj.data.price;
                    console.log(outcomesArr[outcomeIndex]);
                    _this.setState({
                        outcomesArr: outcomesArr
                    });
                    break;
                default:
                    console.log(obj.type);
                    break;
            }

        });
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
        this.state.webSocket.send(JSON.stringify({
            type: "unsubscribe",
            keys: ["m." + this.state.market.marketId]
        }));
    }

    render() {
        if (this.state.outcomes !== {}) {
            switch(this.state.market.type) {
                case 'win-draw-win':
                    return (
                        <WinDrawWinOutcomes
                            marketId={this.state.market.marketId}
                            outcomesArr={this.state.outcomesArr}
                            fractional={this.state.fractional}
                        />
                    );
                case 'standard':
                    return (
                        <Grid container direction={ 'column' }>
                            <StandardOutcomes
                                market={this.state.market}
                                outcomesArr={this.state.outcomesArr}
                                fractional={this.state.fractional}
                            />
                        </Grid>
                    );
                case 'correct-score':
                    return (
                            <CorrectScoreOutcomes
                                marketId={this.state.market.marketId}
                                outcomesArr={this.state.outcomesArr}
                                fractional={this.state.fractional}
                            />
                    );
                default:
                    return (<Fragment/>);
            }
        }
        else {
            return (<Fragment/>);
        }
    }
}

Outcomes.propTypes = {
    market: PropTypes.object.isRequired,
    fractional: PropTypes.bool.isRequired
};

export default withTheme()(Outcomes);