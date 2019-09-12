import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

const AddPortfolio = (props)=> {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen= () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) =>{
    state = event.target.value
  }

  let state
  
  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a Portfolio <AddRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new portfolio name
          </DialogContentText>
          <form id="addPortfolio" >
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Portfolio Name"
                
                fullWidth
                onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            form="addPortfolio" 
            label="submit" 
            color="primary"
            onClick={() => {
              props.handleAddPortfolio(state)
              handleClose()
              }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddPortfolio;