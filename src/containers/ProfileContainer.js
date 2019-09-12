import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PortfolioGraphChart from '../components/PortfolioGraphChart';
import StockCardContainer from './StockCardContainer'
import StockNews from '../components/StockNews'
import 'typeface-roboto';

const styles = {
    bar: {
        backgroundColor: '#eee',
        color: 'white'
    },
    newsBox:{
        marginTop: "2%",
        maxWidth: "100%"
    },
    graphBox:{
        marginTop: "5%",
        
    },
    stockBox:{
        marginTop:"2%",
        marginLeft:"8%",
        maxWidth: "85%"
       
    },
    header:{
        backgroundColor: '#f2ab38',
    },
    text:{
        paddingLeft: "2%",
        paddingTop:"0.5%"
    }

}

const stockAPIKEY = '08G151DEIUICTJ2K'




class ProfileContainer extends Component {
    constructor(){
        super()
        this.state = {
            stockCardData: [],
            stockGraphData: []
        }
    }

    componentDidMount(){
        this.iterate()
    }

    iterate = () => {
        this.setState({
          stockCardData: [],
          stockGraphData: []
        }, () => {
        this.props.portfolioStocks.forEach(stock => {
            this.fetchPortfolioStock(stock)
          })
        })
      }

      fetchPortfolioStock = (stock) => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.ticker}&apikey=${stockAPIKEY}`)
        .then(res => res.json())
        .then(data => {
            this.setStockCardData(data, stock.id)
            this.setStockGraphData(data)
        })
      }
  
    setStockCardData = (data, id) => {
      let ticker = data["Meta Data"]['2. Symbol']
      let prices = data["Time Series (Daily)"]
      let price = Object.entries(prices).slice(0,2)
      let price1 = Number(price[0][1]["4. close"])
      let price2 = Number(price[1][1]["4. close"])
      let obj = {}
      obj.id = id
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
    
    render() {
        return (
            <Grid container style={styles.bar} spacing={2}>
                <Grid item xs={12} xl={12}>
                    <Grid container justify='center' style={styles.graphBox}>
                        <Grid item xs={10}>
                            <Paper style={styles.header}>
                                <Typography align="left" gutterBottom variant="h5" style={styles.text}>
                                    {this.props.username}
                                </Typography>
                                <PortfolioGraphChart 
                                    username={this.props.username} 
                                    currentPortfolio={this.props.currentPortfolio} 
                                    stocks={this.state.stockGraphData} 
                                    stockTickerData={this.state.stockCardData} 
                                    portfolioOptions={this.props.portfolioOptions}
                                    setCurrentPortfolio={this.props.setCurrentPortfolio}
                                    handleAddPortfolio={this.props.handleAddPortfolio}
                                    deletePortfolio={this.props.deletePortfolio}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} xl={12}>
                    <Grid container justify='center' style={styles.stockBox}>
                        <Paper style={styles.header}>
                            <Typography align="left" gutterBottom variant="h5" style={styles.text}>
                                Your Portfolio
                            </Typography>
                            <StockCardContainer 
                                editPortfolioStocks={this.props.editPortfolioStocks}
                                deleteStockFetch={this.props.deleteStockFetch} 
                                handleSearch={this.props.handleSearch} 
                                stockCardData={this.state.stockCardData}
                            />
                        </Paper>
                        
                    </Grid>
                </Grid>

                <Grid item xs={12} xl={12} align="center">
                    <Grid container justify='center'  style={styles.newsBox}>
                        <Paper >
                            <Typography align='left' gutterBottom variant="h5" style={styles.text}>
                                Top Business News
                            </Typography>
                            <StockNews news={this.props.topBusNews}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileContainer;