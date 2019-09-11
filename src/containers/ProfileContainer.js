import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PortfolioGraphChart from '../components/PortfolioGraphChart';
import StockCardContainer from './StockCardContainer'


const styles = {
    bar: {
        backgroundColor: '#ba68c8',
        color: 'white'
    }
}

const stockAPIKEY = 'XLWWWNITJQV4H0KC'
const newsAPIKEY = '85216af2d9e046409f238846c9947b25'



class ProfileContainer extends Component {
    constructor(){
        super()
        this.state = {
            stockCardData: [],
            stockGraphData: []
        }
    }

    iterate = () => {
        this.props.portfolioStocks.forEach(stock => {
            this.fetchPortfolioStock(stock.ticker)
        })
    }

    fetchPortfolioStock = (stock) => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
        .then(res => res.json())
        .then(data => {
            this.setStockCardData(data)
            this.setStockGraphData(data)
        })
      }

    setStockCardData = (data) => {
        let ticker = data["Meta Data"]['2. Symbol']
        let prices = data["Time Series (Daily)"]
        let price = Object.entries(prices).slice(0,2)
        let price1 = Number(price[0][1]["4. close"])
        let price2 = Number(price[1][1]["4. close"])
        let obj = {}
        obj.ticker = ticker
        obj.todayPrice = price1
        obj.yesterdayPrice = price2
    
        this.setState({
            stockCardData: [...this.state.stockCardData, obj]
        })
    }

    setStockGraphData = (data) => {
        let ticker = data["Meta Data"]['2. Symbol']
        let prices = data["Time Series (Daily)"]
        let tenEntries = Object.entries(prices).slice(0, 10)
        let dataArr = []
        tenEntries.forEach(entry => {
          let obj = {"date": entry[0], 
                     [ticker]: Number(entry[1]["4. close"])}
          dataArr.unshift(obj)
        })
        this.setState({
            stockGraphData: [...this.state.stockGraphData, dataArr]
        })
      }

    componentDidMount(){
        this.iterate()
    }
    
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Grid item>
                            <Paper>
                                {/* <PortfolioGraphChart 
                                stocks={this.state.stockGraphData} 
                                stockTickerData={this.state.stockCardData}
                                portfolioId={this.props.portfolioId}
                                // handlePortfolioChange={this.props.handlePortfolioChange}
                                user={this.props.user}
                                /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='center'>
                        <Paper>
                            <Typography>
                                <StockCardContainer stockCardData={this.state.stockCardData}/>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container justify='center'>
                    <Paper>
                        <Typography>
                            Hello
                            <br></br>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello

                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileContainer;