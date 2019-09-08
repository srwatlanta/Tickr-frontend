import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import { Container } from '@material-ui/core';



class LoginContainer extends Component {
    render() {
        return (
            <div>
                <Container maxWidth="xl">
                    <LoginForm handleSubmit={this.props.handleSubmit}/>
                </Container> 
            </div>
        );
    }
}

export default LoginContainer;