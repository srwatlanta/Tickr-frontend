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

 //LOGIN AND SET USER FUNCTIONALITY

  //Initial Login Fetch
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

  //Token Fetch when User Info Updates
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

    //Helper Method to Set Portfolio Stocks upon Fteching Profile
  filterStocks = () => {
    let filteredStocks = this.state.currentUser.stocks.filter(stock => {
      return stock.portfolio_id === this.state.currentPortfolio.id
    })
    this.setState({
      portfolioStocks: filteredStocks
    })
  }

  //Fetches Profile upon re-render of App comnponent Using stored Token
  componentDidMount(){
    localStorage.getItem('token') && this.fetchProfile()
    this.fetchTopNews()
  }

 //Sign Out User and Clear Token
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

  //SEARCH FUNCTIONALITY

  //Where the search is submitted to, starts a chain of callback methods
  handleSearch = (query) => {
    this.setState(prevState => ({
      selectedStock: {...prevState.selectedStock, ticker: query}
    }), this.fetchShowInfo(query)
    )
  }

  //Calls two helpers methods to gather data for the Search Show Page
  fetchShowInfo = (query) => {
    this.fetchNewsData(query)
    this.fetchSearchStockData(query)
  }

//Sends alert if search query is invalid and keeps state from being set with bad query data.
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

//Clears search fields to move back to Profile Screen
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

  //NEWS API FUNCTIONALITY

  //Add Daily Main Top News Stories to Portfolio Page
  fetchTopNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsAPIKEY}`)
    .then(res => res.json())
    .then(data => this.setState({
      topBusNews: data.articles
    }))
  }

  //News API call and sets the Selected Stock with its news
  fetchNewsData = (query) => {
    fetch('https://newsapi.org/v2/everything?q=' + query + '&from=2019-09-10&sortBy=publishedAt&apiKey=' + newsAPIKEY)
    .then(res => res.json())
    .then(news => this.setState(prevState => ({
      selectedStock: {...prevState.selectedStock, news: news.articles}
    }))
  )}

  //Fetch Stock Data From API. Used for Search and multiple times for User Profile.
  fetchSearchStockData = (stock) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
    .then(res => res.json())
    .then(data => {
      data['Error Message'] ? this.badSearch() : this.setSearchStockData(data)
    })
  }

  //Sets the Ticker and Prices for a stock when given a ticker, Data used for Cards
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

  //Sets the Ticker and Prices for a stock when given a ticker, Data used for Graphs
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
  
  //STOCK ADD AND DELETE FUNCTIONS

  //Delete Stock From Current Portfolio
  deleteStockFromPortfolio = (id) => {
    fetch(`http://localhost:3000/stocks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(this.editPortfolioStocks(id))
    .then(this.setState({
      selectedStock: {
        ticker: null,
        todayPrice: null,
        yesterdayPrice: null,
        news: []
      },
      selectedStockInfo: null
    }))
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
    },() => this.fetchProfile()))
  }

  //PORTFOLIO CRUD COMPONENT FUNCTIONS

  //Set the State of Cuurent Portfolio as it is updated across the page
  setCurrentPortfolio = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio,
      stockCardData: [],
      stockGraphData: [],
      portfolioStocks: []
    }, () => this.filterStocks())
  }
  //Check to see if the current portfolio is the one being deleted. Helper method
  checkCurrentPortfolio = (id) => {
    return this.state.currentPortfolio.id === id ? 
    this.setState({
      currentPortfolio: this.state.currentUser.portfolios[0]
    })
    :
    null
  }

  //Delete a Portfolio from the database
  deletePortfolio = (id) => {
    this.checkCurrentPortfolio(id)
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
    .then(res => res.json())
    .then(data => this.setState({currentUser: data.user}))
  }

  //Edit the stocks that belong to the existing portfolio
  //Method is a helper that is actually called in the STOCK functions
  editPortfolioStocks = (id) => {
    let newArr = this.state.portfolioStocks.filter(stock => {
      return stock.id !== id
      })
    this.setState({
      portfolioStocks: newArr
    })
  }

  //RENDER

  render() {
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
            currentPortfolio={this.state.currentPortfolio}
            handleSearch={this.handleSearch}
            username={this.state.currentUser.username} 
            stockCardData={this.state.stockCardData}
            stockGraphData={this.state.stockGraphData}
            topBusNews={this.state.topBusNews}
            portfolioStocks={this.state.portfolioStocks}
            portfolioOptions={this.state.currentUser.portfolios}
            editPortfolioStocks={this.editPortfolioStocks}
            handleAddPortfolio={this.addPortfolio}
            deletePortfolio={this.deletePortfolio}
            deleteStockFetch={this.deleteStockFromPortfolio}
            />
        }}/> 
        <Route exact path={`/stocks/${this.state.selectedStock.ticker}`} component={() => 
          <StockShowContainer
            removeSearch={this.removeSearch}
            stockInfo={this.state.selectedStockInfo} 
            stock={this.state.selectedStock}
            portfolioStocks={this.state.portfolioStocks}
            deleteStockFetch={this.deleteStockFromPortfolio}
            addStockToPortfolio={this.addStockToPortfolio}
          /> 
        }/>
      </Router>
    );
  }
}

export default App;
