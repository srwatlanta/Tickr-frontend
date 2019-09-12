import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
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
      topBusNews: [],
      newPortfolio: null
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
      currentPortfolio: user.user.portfolios[0]
    }, localStorage.setItem("token", user.jwt)))
    .catch(error => alert(error))
  }

  fetchProfile = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {this.setState(prevState =>({
      stockCardData: [],
      stockGraphData: [],
      currentUser: data.user,
      currentPortfolio: prevState.currentPortfolio ? prevState.currentPortfolio : data.user.portfolios[0]
    }),
      () => this.state.currentUser ? this.filterStocks() : null
    )})
  }

  removeSearch = () => {
    this.setState({
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      },
      selectedStockInfo: null
    })
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
      },
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

  badSearch = () => {
    alert("Not a Valid Ticker!")
    this.setState({
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      },
      selectedStockInfo: null
    })
  }

  //Fetch Stock Data
  fetchSearchStockData = (stock) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
    .then(res => res.json())
    .then(data => {
      data['Error Message'] ? this.badSearch() : this.setSearchStockData(data)
    })
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

  //Functions for ProfileContainer
  

  

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
    .then(res => res.json())
    .then(stock => this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock.stock],
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      },
      selectedStockInfo: null
    }))
  }

  setCurrentPortfolio = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio,
      stockCardData: [],
      stockGraphData: [],
      portfolioStocks: []
    }, () => this.filterStocks())
  }

  //Add Daily Main Top News Stories to Portfolio Page
  fetchTopNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsAPIKEY}`)
    .then(res => res.json())
    .then(data => this.setState({
      topBusNews: data.articles
    }))
  }

  deletePortfolio = (id) => {
    fetch("http://localhost:3000/portfolios/" + id, {
      method: 'delete',
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        'Accepts': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => this.setState({
      currentUser: data.user
    }))
  }

  //Add a new Portfolio
  addPortfolio = (name) => {
    let userID = this.state.currentUser.id
    fetch("http://localhost:3000/portfolios", {
      method:"POST",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify({
        name: name,
        user_id: userID
      })
    })
    .then(this.setState({portfolioStocks: []}))
    .then(this.fetchProfile())
  }

  editPortfolioStocks = (id) => {
    let newArr = this.state.portfolioStocks.filter(stock => {
      return stock.id !== id
      })
    this.setState({
      portfolioStocks: newArr
    })
  }

  //Create a New User
  createUser = (state) => {
    fetch("http://localhost:3000/users", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            'Accepts': 'application/json'
        }, 
        body: JSON.stringify({
          user:{
            username: state.username,
            password: state.password,
            email: state.email,
            name: state.name,
            image_url: state.image_url,
            member_since: state.member_since
          }
        })
    })
    .then(res => res.json())
    .then(user => this.setState({
      currentUser: user.user,
      currentPortfolio: user.user.portfolios[0] 
    }, localStorage.setItem("token", user.jwt)))
  }

  render() {
    console.log(this.state)
    return (
      <Router >
        <NavBar removeSearch={this.removeSearch} user={this.state.currentUser} logOut={this.logOut} handleSearch={this.handleSearch}/>
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

        <Route exact path="/" component={()=> <LoginContainer handleSubmit={this.handleLoginSubmit} createUser={this.createUser}/>}/>
        <Route exact path="/profile" component={()=> {
          return this.state.currentUser && <ProfileContainer
            setCurrentPortfolio={this.setCurrentPortfolio}
            handleSearch={this.handleSearch}
            username={this.state.currentUser.username} 
            currentPortfolio={this.state.currentPortfolio}
            portfolioStocks={this.state.portfolioStocks}
            stockCardData={this.state.stockCardData}
            stockGraphData={this.state.stockGraphData}
            topBusNews={this.state.topBusNews}
            portfolioOptions={this.state.currentUser.portfolios}
            handleAddPortfolio={this.addPortfolio}
            editPortfolioStocks={this.editPortfolioStocks}
            deletePortfolio={this.deletePortfolio}
          /> 
           } 
           } /> 
        <Route exact path={`/stocks/${this.state.selectedStock.ticker}`} component={() => 
          <StockShowContainer
            removeSearch={this.removeSearch}
            stockInfo={this.state.selectedStockInfo} 
            stock={this.state.selectedStock}
            addStockToPortfolio={this.addStockToPortfolio}
          /> } />
      </Router>
    );
  }
}

export default App;
