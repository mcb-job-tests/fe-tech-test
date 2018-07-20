import React, { Fragment, Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {HeaderContext} from '../HeaderContext';

class PageHeader extends Component {
    render(){
        return (
            <List component="nav">
                <ListItem>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item xs={12} >
                            <HeaderContext.Consumer>
                                {({header, subHeader}) => (
                                    <Fragment>
                                        <Typography variant="headline" align={'center'}>
                                            {header}
                                        </Typography>
                                        <Typography variant="subheading" align={'center'}>
                                            {subHeader}
                                        </Typography>
                                    </Fragment>
                                )}
                            </HeaderContext.Consumer>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider/>
            </List>
        )
    };
}

export default withTheme()(PageHeader);