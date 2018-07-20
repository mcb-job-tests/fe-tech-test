import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import EventTypesOverview from './ui/EventTypesOverview';
import Markets from './ui/Markets';
import EventDetails from './ui/event-details/EventDetails';
import {HeaderContext} from "./HeaderContext";

class Router extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            events: props.events,
            eventTypes: props.eventTypes,
            markets: props.markets,
            outcomes: props.outcomes
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.events !== state.events || props.markets !== state.markets || props.outcomes !== state.outcomes || props.eventTypes !== state.eventTypes){
            return {
                events: props.events,
                eventTypes: props.eventTypes,
                markets: props.markets,
                outcomes: props.outcomes
            }
        }
        return null;
    }

    handleOnExpandChange( event, expanded ){
        let eventList = this.state.events;
        eventList[ event.eventId ].expanded = expanded;
        this.setState({
            events: eventList,
        })
    }

    render(){
        return (
            <HeaderContext.Consumer>
                {({setHeader}) => (
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' render={() => (
                                <EventTypesOverview
                                    events={ this.state.events }
                                    eventTypes={ this.state.eventTypes }
                                    onExpandChange={this.handleOnExpandChange.bind(this)}
                                    setHeader={ setHeader }
                                />
                            )}/>
                            <Route path='/events/:eventId'
                                   render={(props) => (
                                       <EventDetails
                                           {...props}
                                           setHeader={ setHeader }
                                       />
                                )}
                           />
                            <Route path='/markets/:eventId'
                                   render={(props) => (
                                        <Markets
                                            {...props}
                                            markets={ this.state.markets }
                                            outcomes={ this.state.outcomes }
                                            setHeader={ setHeader }
                                        />
                                    )}
                            />
                        </Switch>
                    </BrowserRouter>
                )}
            </HeaderContext.Consumer>
        )
    };
}


Router.propTypes = {
    events: PropTypes.array.isRequired,
    eventTypes: PropTypes.array.isRequired,
    markets: PropTypes.object,
    outcomes: PropTypes.object,
};

export default withTheme()(Router);