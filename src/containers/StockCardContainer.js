import React, { Component } from 'react';
import StockCard from '../components/StockCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from "@material-ui/core/Paper"
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
                <Grid container spacing={2} justify="center">
                    
                        <StockCard key={`Stock card ${stock.id}`} deleteStockFetch={this.deleteStockFetch} stock={stock} handleSearch={this.props.handleSearch}/>
                    
                </Grid>
            </Grid>
        )})
    }
    
    render() {
        return (
            <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                <Grid container spacing={5}>
                    {this.createCards()}
                </Grid>
            </Paper>
        );
    }
}

export default StockCardContainer;