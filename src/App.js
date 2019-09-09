import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
import UserBar from './components/UserBar';
import StockCard from './components/StockCard'

const UserUrl = 'http://localhost:3000/profile'

class App extends Component {
  constructor() {
    super()
    this.state = {
      current_user: undefined,
      selected_stock: undefined,
      token: undefined,
      login_form: {
        username: '',
        password: ''
      }
    }
  }

  handleLoginSubmit = (formInfo) => {
    this.setState({
      login_form: formInfo
    })
  }

  componentDidMount(){
    fetch(UserUrl)
    .then(res => res.json())
    .then(data => this.setState({current_user: data.user}))
  }

  render() {
    return (
      <div className="App">
        {this.state.current_user ? 
        <div>
        <NavBar user={this.state.current_user}/>
          {this.state.selected_stock?  
            <StockShowContainer /> 
          :
          <div>
            <ProfileContainer />
            <StockCard />
          </div>
          }
        </div>
          :
        <LoginContainer handleSubmit={this.handleLoginSubmit}/>
      }

      </div>
    );
  }
}

export default App;
