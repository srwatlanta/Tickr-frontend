import React, { Component } from 'react';
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
                <GraphChart />
            </div>
        );
    }
}

export default StockShowContainer;