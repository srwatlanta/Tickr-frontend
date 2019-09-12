import React, { Component } from 'react';
import StockCard from '../components/StockCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from "@material-ui/core/Paper"


class StockCardContainer extends Component {

    createCards = () => {
        return this.props.stockCardData.map(stock => {
            return (
            <Grid item xs={4} >
                <Grid container justify="center">
                        <StockCard key={`Stock card ${stock.id}`} deleteStockFetch={this.props.deleteStockFetch} stock={stock} handleSearch={this.props.handleSearch}/>  
                </Grid>
            </Grid>
        )})
    }
    
    render() {
        return (
            <Paper style={{maxHeight: 500, overflow: 'auto', paddingTop: '3%', maxWidth: 1701}}>
                <Grid container spacing={2} >
                    {this.createCards()}
                </Grid>
            </Paper>
        );
    }
}

export default StockCardContainer;