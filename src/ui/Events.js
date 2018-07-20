import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Event from './Event.js';
import Divider from '@material-ui/core/Divider';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"

class Events extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            events: this.props.events,
            eventType: this.props.eventType,
            expanded: -1,
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.events !== state.events || props.eventType !== state.eventType){
            return {
                events: props.events,
                eventType: props.eventType
            }
        }
        return null;
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : -1,
        });
    };

    getFilteredEvents(){
        let filteredEvents = [];
        const eventsList = this.state.events;
        for (let i = 0; i < eventsList.length; i++) {
            if (eventsList[i].linkedEventTypeName){
                if ( eventsList[i].linkedEventTypeName === this.state.eventType){
                    filteredEvents.push(eventsList[i]);
                }
            } else if (eventsList[i].typeName === this.state.eventType){
                filteredEvents.push(eventsList[i])
            }
        }
        return filteredEvents;
    }

    renderEvents(){
        const style = {
            height: "2px",
            border: 0,
            boxShadow: "0 6px 6px -6px black inset"
        };

        const filteredEvents = this.getFilteredEvents();

        return filteredEvents.map( ( event, index ) => (
            <Grid key={ index }>
                < Event
                    index={ index }
                    event={ event }
                    expanded = { this.state.expanded }
                    handleExpandedChange={ this.handleChange.bind(this) }
                />
                <Divider style={ style } />
            </Grid>
        ));
    };

    render(){
        return (
            <Fragment >
                { this.renderEvents() }
            </Fragment>
        )
    };
}


Events.propTypes = {
    events: PropTypes.array.isRequired,
    eventType: PropTypes.string.isRequired
};

export default withTheme()(Events);