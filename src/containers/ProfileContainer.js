import React, { Component } from 'react';
import UserDisplayContainer from './UserDisplayContainer'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GraphChart from '../components/GraphChart';
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'

const styles = {
    bar: {
        backgroundColor: '#ba68c8',
        color: 'white'
    }
}


class ProfileContainer extends Component {
    constructor(){
        super()
        
    }

    
    render() {
        console.log(this.state)
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Grid item>
                            <Paper>
                                
                                PlaceHolder
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='center'>
                        <Paper>
                            <Typography>
                                Hello
                                <br></br>
                                Hello
                                <br/>
                                Hello
                                <br/>
                                Hello
                                <br/>
                                Hello

                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container justify='center'>
                    <Paper>
                        <Typography>
                            Hello
                            <br></br>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello

                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileContainer;