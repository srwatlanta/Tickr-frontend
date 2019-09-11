import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
import UserBar from './components/UserBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const stockAPIKEY = 'CH447Y09NPSTFX3A'
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
    .then(data => {this.setState({
      currentUser: data.user,
      currentPortfolio: data.user.portfolios[0].id
    },localStorage.setItem("token", data.jwt))})
  }

  fetchProfile = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => { this.setState({
      currentUser: data.user, 
      currentPortfolio: data.user.portfolios[0].id
    }, () => this.state.currentUser ? this.filterStocks() : null
      )})
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
      return stock.portfolio_id === this.state.currentPortfolio
    })
    this.setState({
      portfolioStocks: filteredStocks
    })
  }

  componentDidMount(){
    localStorage.getItem('token') && this.fetchProfile()
  }

  fetchShowInfo = (query) => {
    this.fetchNewsData(query)
    this.fetchSearchStockData(query)
  }

  fetchNewsData = (query) => {
    fetch('https://newsapi.org/v2/everything?q=' + query + '&from=2019-09-11&sortBy=publishedAt&apiKey=' + newsAPIKEY)
    .then(res => res.json())
    .then(news => this.setState(prevState => ({
      selectedStock: {...prevState.selectedStock, news: news.articles}
    }))
  )}



  //Fetch Stock Data
  fetchSearchStockData = (stock) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
    .then(res => res.json())
    .then(data => this.setSearchStockData(data))
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

        <Route exact path="/" component={()=> 
          <LoginContainer handleSubmit={this.handleLoginSubmit}/>}
        />
        <Route exact path="/profile" component={()=> 
          <ProfileContainer 
            user={this.state.currentUser} 
            portfolioStocks={this.state.portfolioStocks} 
            portfolioId={this.state.portfolioId} 
            handlePortfolioChange={this.handlePortfolioChange}/>} 
          />
        <Route exact path={`/stocks/${this.state.selectedStock.ticker}`} component={() => 
          <StockShowContainer 
            stockInfo={this.state.selectedStockInfo} 
            stock={this.state.selectedStock}/> } 
          />
      </Router>
    );
  }
}

export default App;
