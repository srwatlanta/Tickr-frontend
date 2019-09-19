import React from 'react';
import LoginForm from '../components/LoginForm'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NewUser from '../components/NewUser';
import { Container } from '@material-ui/core';
import ForgotPassword from '../components/ForgotPassword'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://tickr-stock.herokuapp.com/">
          Tickr
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

  
const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random/?business)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    box: {
      paddingTop: "5%"
    }
  }));


const LoginContainer = (props) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                
                <LoginForm handleSubmit={props.handleSubmit}/>
                
                <Grid container className={classes.box}>
                  <Grid item xs={6} align="center" justify="center">
                      <ForgotPassword />
                  </Grid>
                  <Grid item xs={6} align="center" justify="center" >
                    <NewUser createUser={props.createUser} id="newUserLink"/>
                    
                  </Grid>
                  
                </Grid>
                <Box mt={5} className={classes.box}>
                  <Copyright />
                </Box>
            </div>
          </Grid>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grid>
      );
    
}

export default LoginContainer;

{/* <Container maxWidth="xl">
    <LoginForm handleSubmit={this.props.handleSubmit}/>
</Container>  */}