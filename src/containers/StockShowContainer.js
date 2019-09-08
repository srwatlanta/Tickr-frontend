import React, { Component } from 'react';
import UserBar from '../components/UserBar'
import StockNews from '../components/StockNews'
import StockInfo from '../components/StockInfo'
import GraphChart from '../components/GraphChart'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



  
class StockShowContainer extends Component {
    

    render() {
        return (
            <div>
                <Paper>
                <Typography variant="h5" component="h3">
                This is a sheet of paper.
                </Typography>
                <Typography component="p">
                Paper can be used to build surface or other elements for your application.
                </Typography>
                </Paper>
            </div>
        );
    }
}

export default StockShowContainer;