import React, { Fragment, Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import EventTitle from './EventTitle';
import EventTypeName from './EventTypeName';
import EventScores from './EventScores';

class EventDetails extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            eventId: this.props.match.params.eventId,
            event: {}
        };
    };

    componentDidMount() {
        const SPORTSBOOK_EVENT_URL = "http://localhost:8888/sportsbook/event/" + this.state.eventId;

        let _this = this;
        fetch(SPORTSBOOK_EVENT_URL)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                _this.setState({
                    event: data.event
                });
                _this.props.setHeader( "Full Details", '' );
            });
    }

    render(){
        return (
            <Fragment >
                <Grid container >
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item>
                            <EventTypeName
                                linkedEventTypeName={this.state.event.linkedEventTypeName || this.state.event.typeName}
                            />
                        </Grid>
                        <Grid item>
                            <EventTitle
                                competitors={this.state.event.competitors}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        ' '
                    </Grid>
                    <EventScores
                        scores={this.state.event.scores}
                        competitors={this.state.event.competitors}
                    />
                </Grid>
            </Fragment>
        )
    };
}

export default withTheme()(EventDetails);