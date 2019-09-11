import React, { Component } from 'react';
import StockCard from '../components/StockCard'
import Grid from '@material-ui/core/Grid';


class StockCardContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.stockCardData
        }
    }

    deleteStockFetch = (id) => {
        fetch(`http://localhost:3000/stocks/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization :`Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then(this.updatePortfolioStocks(id))
      }

    updatePortfolioStocks = (id) => {
        let newArray = this.state.data.filter(stock => {
          return stock.id !== id
        })
        this.setState({
          data: newArray
        })
      }

    createCards = () => {
        return this.state.data.map(stock => {
            return (
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item>
                        <StockCard key={`Stock card ${stock.id}`} deleteStockFetch={this.deleteStockFetch} stock={stock} handleSearch={this.props.handleSearch}/>
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