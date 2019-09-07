import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import NavBar from '../components/NavBar'
import { Container } from '@material-ui/core';


class LoginContainer extends Component {
    render() {
        return (
            <div>
                <Container maxWidth="xl">
                    <NavBar />
                    <LoginForm />
                </Container> 
            </div>
        );
    }
}

export default LoginContainer;