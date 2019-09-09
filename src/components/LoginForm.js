import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
const styles = {
    bar: {
        backgroundColor: '#ba68c8',
        color: 'white'
    }
}

class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        
        return (
            <div>
                <form>
                    <div>
                    <TextField
                        id="outlined-email-input"
                        label="username"
                        type="username"
                        name="username"
                        autoComplete="username"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    </div>
                    <div>
                    <TextField
                        id="outlined-password-input"
                        label="password"
                        type="password"
                        name="password"
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    </div>
                    <div>
                
                        <Button 
                            variant="outlined" 
                            style={styles.bar}
                            onClick={event => this.handleSubmit(event)}>
                            <NavLink to="/profile" exact>
                                Login
                            </NavLink>
                            
                        </Button>
                    
                    </div>
                </form>  
            </div>
        );
    }
}

export default LoginForm;