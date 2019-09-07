import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class LoginForm extends Component {
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
                    />
                    </div>

                </form>  
            </div>
        );
    }
}

export default LoginForm;