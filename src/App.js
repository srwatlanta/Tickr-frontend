import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
import UserBar from './components/UserBar';

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

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.state.current_user ? 
        <div>
          {this.state.selected_stock?  
            <StockShowContainer /> 
          :
            <ProfileContainer />
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
