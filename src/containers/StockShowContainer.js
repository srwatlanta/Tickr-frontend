import React, { Component } from 'react';
import StockNews from '../components/StockNews'
import StockInfo from '../components/StockInfo'
import GraphChart from '../components/GraphChart'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SectorPieChart from '../components/PieChart';
import Grid from '@material-ui/core/Grid';
import StockCard from '../components/StockCard'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'


  
const styles = {
    bar: {
        backgroundColor: '#eee',
        },
    icon: {
        marginLeft: '85%'
        },
    button: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        backgroundColor: '#fb8c00'
    }  
}

class StockShowContainer extends Component {
    

    render() {
        return (
            <div style={styles.bar}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <GraphChart stockInfo={this.props.stockInfo} stock={this.props.stock}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <StockNews news={this.props.stock.news}/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default StockShowContainer;