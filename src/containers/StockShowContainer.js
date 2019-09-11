import React, { Component } from 'react';
import StockNews from '../components/StockNews'
import GraphChart from '../components/GraphChart'

import Grid from '@material-ui/core/Grid';


  
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
    } ,
    graph:{
        marginTop: "2%"
    } 
}

class StockShowContainer extends Component {
    

    render() {
        return (
            <div style={styles.bar}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={styles.graph}>
                        <Grid container justify="center">
                            <GraphChart stockInfo={this.props.stockInfo} stock={this.props.stock} addStockToPortfolio={this.props.addStockToPortfolio}/>
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