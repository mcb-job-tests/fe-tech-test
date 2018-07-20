import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Events from './Events.js';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';

import { withTheme } from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid"

class EventTypesOverview extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            events : this.props.events,
            eventTypes : this.props.eventTypes,
            expanded: -1,
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.events !== state.events || props.eventTypes !== state.eventTypes){
            return {
                events: props.events,
                eventTypes: props.eventTypes
            }
        }
        return null;
    }

    componentDidMount(){
        this.props.setHeader("Events Overview", "Football");
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : -1,
        });
    };

    renderEventTypesOverview(){
        const style = {
            height: "6px",
            border: 0,
            boxShadow: "0 6px 6px -6px black inset"
        };

        return this.state.eventTypes.map( ( eventType, index ) => (
                <Fragment key={ index }>
                    <ExpansionPanel CollapseProps={{ mountOnEnter:true, unmountOnExit: false }}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid item xs={12}>
                                <Typography component="p">
                                    {eventType}
                                </Typography>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container direction='column'>
                                < Events
                                    events={this.state.events}
                                    eventType={ eventType }
                                    expanded = { this.state.expanded }
                                    handleExpandedChange={ this.handleChange.bind(this) }
                                />
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Divider style={ style } />
                </Fragment>
        ));
    };

    render(){
        return (
            <Fragment >
                { this.renderEventTypesOverview() }
            </Fragment>
        )
    };
}


EventTypesOverview.propTypes = {
    events: PropTypes.array.isRequired,
    eventTypes:  PropTypes.array.isRequired,
    setHeader: PropTypes.func.isRequired
};

export default withTheme()(EventTypesOverview);