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
      current_user: null,
      selected_stock: null,
      selected_stock_info: null,
      user_stocks: []
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
    .then(user => this.setState({current_user: user.user}, localStorage.setItem("token", user.jwt)))
  }

  fetchProfile = () => {

    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => this.setState({current_user: data.user}))
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      current_user: null,
      selected_stock: null
    })
    
  }

  componentDidMount(){
    this.fetchProfile()
  }

  //Fetch Stock Data
  fetchSearchStockData = (stock) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${stockAPIKEY}`)
    .then(res => res.json())
    .then(data => this.setSearchStockData(data))
  }

  //Handle Stock Fetch
  setSearchStockData = (data) => {
  
    let ticker = data["Meta Data"]['2. Symbol']
    let prices = data["Time Series (Daily)"]
    let tenEntries = Object.entries(prices).slice(0, 10)
    let dataArr = []
    tenEntries.forEach(entry => {
      let obj = {"date": entry[0], 
                 [ticker]: Number(entry[1]["4. close"])}
      dataArr.unshift(obj)
    })
    this.setState({selected_stock_info: dataArr}) 
  }

  handleSearch = (query) => {
    this.setState({
      selected_stock: query
    })
    this.fetchSearchStockData(query)
  }

  render() {
    return (
      <Router >
        <NavBar user={this.state.current_user} logOut={this.logOut} handleSearch={this.handleSearch}/>
          {localStorage.getItem("token") ?
          <React.Fragment>
            {this.state.selected_stock ?  
            <Redirect to={`/stocks/${this.state.selected_stock}`} />
            :
            <Redirect to="/profile" />
            }
          </React.Fragment>
            :
            <Redirect to="/"/>
          }

          <Route exact path="/" component={()=> <LoginContainer handleSubmit={this.handleLoginSubmit}/>}/>
        <Route exact path={`/stocks/${this.state.selected_stock}`} component={() => <StockShowContainer stockInfo={this.state.selected_stock_info} stockName={this.state.selected_stock}/> } />
        <Route exact path="/profile" component={()=> <ProfileContainer user={this.state.current_user} fetchProfile={this.fetchProfile} /> } /> 
      </Router>
    );
  }
}

export default App;
