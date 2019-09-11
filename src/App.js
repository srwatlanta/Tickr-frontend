import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
import StockNews from './components/StockNews'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const stockAPIKEY = '08G151DEIUICTJ2K'
const newsAPIKEY = '85216af2d9e046409f238846c9947b25'


class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      currentPortfolio: null,
      portfolioStocks: [],
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      },
      selectedStockInfo: null,
      stockCardData: [],
      stockGraphData: [],
      topBusNews: []
    }
  }

  handleLoginSubmit = (data) => {
    fetch("http://localhost:3000/", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify({
        login_form: data
      })
    })
    .then(res => res.json())
    .then(user => this.setState({
      currentUser: user.user,
      currentPortfolio: data.user.portfolios[0]
    }, localStorage.setItem("token", user.jwt)))
  }

  fetchProfile = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {this.setState({
      currentUser: data.user,
      currentPortfolio: data.user.portfolios[0]
    },
      () => this.state.currentUser ? this.filterStocks() : null
    )})
    .then(()=>this.iterate())
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      currentUser: null,
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      }
    })
  }

  filterStocks = () => {
    let filteredStocks = this.state.currentUser.stocks.filter(stock => {
      return stock.portfolio_id === this.state.currentPortfolio.id
    })
    this.setState({
      portfolioStocks: filteredStocks
    })
  }

  componentDidMount(){
    localStorage.getItem('token') && this.fetchProfile()
    this.fetchTopNews()
  }

  fetchShowInfo = (query) => {
    this.fetchNewsData(query)
    this.fetchSearchStockData(query)
  }

  fetchNewsData = (query) => {
    fetch('https://newsapi.org/v2/everything?q=' + query + '&from=2019-09-10&sortBy=publishedAt&apiKey=' + newsAPIKEY)
    .then(res => res.json())
    .then(news => this.setState(prevState => ({
      selectedStock: {...prevState.selectedStock, news: news.articles}
    }))
  )}

  //Fetch Stock Data
  fetchSearchStockData = (stock) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
    .then(res => res.json())
    .then(data => {this.setSearchStockData(data)})
  }

  setSelectedStockData = (data) => {
    let prices = data["Time Series (Daily)"]
    let price = Object.entries(prices).slice(0,2)
    let price1 = Number(price[0][1]["4. close"])
    let price2 = Number(price[1][1]["4. close"])
    let objcopy = {...this.state.selectedStock}
    objcopy.todayPrice = price1
    objcopy.yesterdayPrice = price2
    
    this.setState({selectedStock: objcopy
    })
  }

  setSelectedStockInfo = (data) => {
    let ticker = data["Meta Data"]['2. Symbol']
    let prices = data["Time Series (Daily)"]
    let tenEntries = Object.entries(prices).slice(0, 10)
    let dataArr = []
    tenEntries.forEach(entry => {
      let obj = {"date": entry[0], 
                 [ticker]: Number(entry[1]["4. close"])}
      dataArr.unshift(obj)
    })
    this.setState({selectedStockInfo: dataArr}) 
  }

  //Handle Stock Fetch
  setSearchStockData = (data) => {
    this.setSelectedStockData(data)
    this.setSelectedStockInfo(data)
  }

  handleSearch = (query) => {
    this.setState(prevState => ({
      selectedStock: {...prevState.selectedStock, ticker: query}
    }), this.fetchShowInfo(query)
    )
  }


    // handlePortfolioChange = (id) => {
  //   this.setState({
  //     currentPortfolio: id
  //   })
  // }

  //Functions for ProfileContainer
  iterate = () => {
    this.state.portfolioStocks.forEach(stock => {
        this.fetchPortfolioStock(stock)
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

  //Add Stock to Current Portfolio
  addStockToPortfolio = () => {
    let portfolio = this.state.currentPortfolio.id
    let stockToAdd = this.state.selectedStock.ticker
    fetch("http://localhost:3000/stocks", {
      method:"POST",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify({
        ticker: stockToAdd,
        portfolio_id: portfolio
      })
    })
  }

  //Add Daily Main Top News Stories to Portfolio Page
  fetchTopNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsAPIKEY}`)
    .then(res => res.json())
    .then(data => this.setState({
      topBusNews: data.articles
    }))
  }


  render() {
    return (
      <Router >
        <NavBar user={this.state.currentUser} logOut={this.logOut} handleSearch={this.handleSearch}/>
          {localStorage.getItem("token") ?
          <React.Fragment>
            {this.state.selectedStockInfo ?  
            <Redirect to={`/stocks/${this.state.selectedStock.ticker}`} />
            :
            <Redirect to="/profile" />
            }
            </React.Fragment>
            :
            <Redirect to="/"/>
          }

        <Route exact path="/" component={()=> <LoginContainer handleSubmit={this.handleLoginSubmit}/>}/>
        <Route exact path="/profile" component={()=> {
          return this.state.currentUser && <ProfileContainer 
            handleSearch={this.handleSearch}
            username={this.state.currentUser.username} 
            portfolioName={this.state.currentPortfolio.name}
            portfolioStocks={this.state.portfolioStocks}
            stockCardData={this.state.stockCardData}
            stockGraphData={this.state.stockGraphData}
            topBusNews={this.state.topBusNews}
          /> 
           } 
           } /> 
        <Route exact path={`/stocks/${this.state.selectedStock.ticker}`} component={() => 
          <StockShowContainer 
            stockInfo={this.state.selectedStockInfo} 
            stock={this.state.selectedStock}
            addStockToPortfolio={this.addStockToPortfolio}
          /> } />
      </Router>
    );
  }
}

export default App;
