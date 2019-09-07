import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    bar: {
        backgroundColor: '#9c27b0',
    },
    icon: {
        marginLeft: '90%'
    }
}

class NavBar extends Component {
    render() {
        return (
            <div >
                <AppBar position="static" style={styles.bar}>
                    <Toolbar>
                    <IconButton edge="start"  aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        TICKR
                    </Typography>
                    <Button style={styles.icon} color="inherit">UserName</Button>
                    </Toolbar>
                </AppBar>
            </div>       
        );
    }
}

export default NavBar;