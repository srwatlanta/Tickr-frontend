import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserBar from './UserBar'
import { TextField, Fab } from '@material-ui/core'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import Grid from '@material-ui/core/Grid'

const styles = {
    bar: {
        backgroundColor: '#fb8c00',
    },
    button: {
        marginLeft: "7%",
        marginTop: "4%",
        backgroundColor: "#bdbdbd"
    }
}

class NavBar extends Component {
    constructor(){
        super()
        this.state = {
            search: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value.toUpperCase()
        })
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.props.handleSearch(this.state.search)
    }

    render() {
        return (
            <Grid container >
                <AppBar position="static" style={styles.bar}>
                    <Toolbar>
                        <Grid item xs={4}>
                            <Grid container align="center">
                                <IconButton edge="start"  aria-label="menu">
                                    {this.props.user &&
                                    <UserBar user={this.props.user} logOut={this.props.logOut}/> 
                                    }    
                                </IconButton>
                                <Typography variant="h3" justify="center">
                                    TICKR
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>

                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <form>   
                                <TextField
                                    id="outlined-email-input"
                                    label="search"
                                    type="search"
                                    name="search"
                                    autoComplete="search"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}/
                                >
                                <Fab aria-label="add" onClick={this.handleSearch} style={styles.button}>
                                    <SearchTwoToneIcon />
                                </Fab>
                            </form>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>       
        );
    }
}

export default NavBar;