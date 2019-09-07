import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      current_user: undefined,
      selected_stock: undefined,    
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.current_user ? 
        <div>
          {this.state.selected_stock?  
            <StockShowContainer /> 
          :
            <ProfileContainer />
          }
        </div>
          :
        <LoginContainer />
      }

      </div>
    );
  }
}

export default App;
