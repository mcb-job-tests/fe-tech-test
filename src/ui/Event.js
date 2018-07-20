import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {withTheme} from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Event extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            event: this.props.event,
            expanded: PropTypes.number.isRequired,
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.event !== state.event || props.expanded !== state.expanded){
            return {
                expanded: props.expanded,
                event: props.event
            }
        }
        return null;
    }

    render() {
        const startTime = new Date(this.state.event.startTime);
        return (
                <ExpansionPanel CollapseProps={{ unmountOnExit: true }} expanded={this.state.expanded === this.props.index} onChange={this.props.handleExpandedChange(this.props.index)} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container spacing={8}>
                            <Grid item xs={3}>
                                <Typography component="p">
                                    {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography component="p" >
                                    {this.state.event.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={8} alignItems={'center'} justify={'space-between'}>
                            <Grid item style={{textAlign: 'center'}} xs={6}>
                                <Link to={`/events/${this.state.event.eventId}`}>
                                    <Button variant="outlined">
                                        Full Details
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item style={{textAlign: 'center'}} xs={6}>
                                <Link to={`/markets/${this.state.event.eventId}`}>
                                    <Button variant="outlined">
                                        View Markets
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        )
    }
}

Event.propTypes = {
    index: PropTypes.number.isRequired,
    event: PropTypes.object.isRequired,
    expanded: PropTypes.number.isRequired,
    handleExpandedChange: PropTypes.func.isRequired
};

export default withTheme()(Event);