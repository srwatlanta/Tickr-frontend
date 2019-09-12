import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserBar from './UserBar'
import { TextField, Fab } from '@material-ui/core'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import Grid from '@material-ui/core/Grid'
import FilledInput from '@material-ui/core/FilledInput';


const styles = {
    bar: {
        backgroundColor: '#fb8c00',
    },
    button: {
        marginLeft: "4%",
        marginTop: "5%",
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
            [event.target.name]: event.target.value
        })
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.props.handleSearch(this.state.search.toUpperCase())
        this.setState({
            search: ""
        })
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
                                    <UserBar removeSearch={this.props.removeSearch} user={this.props.user} logOut={this.props.logOut}/> 
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
                            {this.props.user ?
                                <form id="search-form">   
                                <TextField
                                    id="outlined-search"
                                    label="Search"
                                    margin="normal"
                                    variant="outlined"
                                    name="search"
                                    value={this.state.search}
                                    onChange={this.handleChange}
                                    />
                                    <Fab aria-label="add" onClick={this.handleSearch} style={styles.button} size="small">
                                        <SearchTwoToneIcon />
                                    </Fab>
                                </form>
                                :
                                null
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>       
        );
    }
}

export default NavBar;