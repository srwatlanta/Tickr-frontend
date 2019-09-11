import React, { Component } from 'react';
import StockCard from '../components/StockCard'

class StockCardContainer extends Component {

    createCards = () => {
        return this.props.stockCardData.map(stock => {
            return <StockCard stock={stock} />
        })
    }
    
    render() {
        return (
            <div>
                {this.createCards()}
            </div>
        );
    }
}

export default StockCardContainer;