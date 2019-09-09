import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import StockShowContainer from './containers/StockShowContainer'
import { Component } from 'react';
import UserBar from './components/UserBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const UserUrl = 'http://localhost:3000/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      current_user: undefined,
      selected_stock: undefined,
      token: undefined,
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
    .then(user => this.setState({token: user.jwt}, ()=> {this.fetchProfile()}))
    
  }

  fetchProfile = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization :`Bearer ${this.state.token}`
      }
    })
    .then(res => res.json())
    .then(data => this.setState({current_user: data.user}))
  }


  render() {
    return (
      <Router >
        <NavBar user={this.state.current_user}/>
<<<<<<< HEAD
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
=======
          {this.state.current_user ? 
          <div>
            {this.state.selected_stock?  
            <Route exact path={`/stocks/${this.state.selected_stock}`} component={() => <StockShowContainer /> } />
            :
            <Route exact path="/profile" component={()=> <ProfileContainer user={this.state.current_user}/> } />
            }
          </div>
            :
          <Route exact path="/" component={()=> <LoginContainer handleSubmit={this.handleLoginSubmit}/>}/>
        }
        
      </Router>
>>>>>>> 248610412edceecbeb4dead4a67692d24d7e257d
    );
  }
}

export default App;
