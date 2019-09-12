import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  button:{
    color: "blue"
  }
}));

export default function SimpleSnackbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const sayings = [
  "fuck you.", 
  "Should've thought about that before you created an account, huh? Idiot.",
  "Hey idiot, its probably the same one you use for everything.",
  "Use a password manager like a grown up.",
  "It's called LastPass, its 2019. Come on.",
  "You insult my intelligence by asking me this.",
  "Wah wah little baby forgot their password."
    ]

  const selectSaying = () =>{
    return sayings[Math.floor(Math.random()*sayings.length)];
  }

  function handleClick() {
    setOpen(true);
  }


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
        <IconButton variant="outlined" color="primary" onClick={handleClick}>
                <Typography>
                    Forgot Password?
                </Typography>
        </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{selectSaying()}</span>}
        action={[
          
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}