import React, { Component } from 'react';
import StockNews from '../components/StockNews'
import GraphChart from '../components/GraphChart'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';


  
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

    alreadyExists = () =>{
        let x = undefined
        this.props.portfolioStocks.forEach(stock =>{
            if(stock.ticker === this.props.stock.ticker){
                return x = stock.id
            }}
        )
        return x
    }

    render() {
        console.log(this.props)
        return (
            <div style={styles.bar}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={styles.graph}>
                        <Grid container justify="center">
                            <GraphChart deleteStockFetch={this.props.deleteStockFetch} alreadyExists={this.alreadyExists} stockInfo={this.props.stockInfo} stock={this.props.stock} addStockToPortfolio={this.props.addStockToPortfolio}/>
                        </Grid>
                    </Grid >
                    <Grid item xs={12} style={styles.news}>
                        <Grid container justify="center">
                            <Paper>
                                <StockNews news={this.props.stock.news}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default StockShowContainer;