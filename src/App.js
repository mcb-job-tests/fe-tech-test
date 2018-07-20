import React, { Fragment, Component } from 'react';
import Router from './Router';
import EventsAppBar from './ui/EventsAppBar';
import PageHeader from './ui/PageHeader';

import { withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {OddsContext} from "./OddsContext";
import {HeaderContext} from "./HeaderContext";

import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        const webSocket = new WebSocket("ws://localhost:8889");

        this.toggleOdds = () => {
            this.setState({
                fractional: !this.state.fractional
            });
        };

        this.setHeader = (newHeader, newSubHeader) => {
            this.setState({
                header: newHeader,
                subHeader: newSubHeader
            })
        };

        this.state = {
            events: [],
            eventTypes: [],
            markets: null,
            outcomes: null,
            header: '',
            subHeader: '',
            setHeader: this.setHeader,
            fractional: true,
            toggleOdds: this.toggleOdds,
            webSocket: webSocket
        };

    }

    componentDidMount() {
        const LIVE_FOOTBALL_EVENTS_URL = "http://localhost:8888/football/live?primaryMarkets=true";
        let _this = this;
        fetch(LIVE_FOOTBALL_EVENTS_URL)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                data.events.sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
                _this.setState({
                    events: data.events,
                    markets: data.markets,
                    outcomes: data.outcomes,
                    eventTypes: App.getEventTypeSet(data.events)
                });
            });
    }

    static getEventTypeSet(events){
        return [...new Set(events.map(event=> event.linkedEventTypeName || event.typeName))];
    }

    render(){
        return (
            <HeaderContext.Provider value={this.state}>
                <OddsContext.Provider value={this.state}>
                    <Fragment>
                        <CssBaseline />
                        <EventsAppBar />
                        <PageHeader
                        />
                        <main >
                            <Router
                                events={this.state.events}
                                markets={this.state.markets}
                                outcomes={this.state.outcomes}
                                eventTypes={this.state.eventTypes}
                            />
                        </main>
                    </Fragment>
                </OddsContext.Provider>
            </HeaderContext.Provider>
        );
    }
}

export default withTheme()(App);