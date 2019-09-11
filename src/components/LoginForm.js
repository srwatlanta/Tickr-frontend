import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
    bar: {
        backgroundColor: '#fb8c00',
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
                    <TextField
                        id="outlined-email-input"
                        label="username"
                        type="username"
                        name="username"
                        required
                        fullWidth
                        autoComplete="username"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="password"
                        type="password"
                        name="password"
                        required
                        fullWidth
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <div>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            style={styles.bar}
                            onClick={event => this.handleSubmit(event)}>
                                Login
                        </Button>
                    </div>
                </form>  
            </div>
        );
    }
}

export default LoginForm;