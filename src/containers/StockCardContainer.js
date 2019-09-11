import React, { Component } from 'react';
import StockCard from '../components/StockCard'
import Grid from '@material-ui/core/Grid';


class StockCardContainer extends Component {

    createCards = () => {
        return this.props.stockCardData.map(stock => {
            return (
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item>
                        <StockCard deleteStockFetch={this.props.deleteStockFetch} stock={stock} handleSearch={this.props.handleSearch}/>
                    </Grid>
                </Grid>
            </Grid>
        )})
    }
    
    render() {

        return (
            <Grid container spacing={2}>
                {this.createCards()}
            </Grid>
        );
    }
}

export default StockCardContainer;