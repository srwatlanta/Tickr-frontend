
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

import React from 'react'


const NewUser = (props) => {
    const [open, setOpen] = React.useState(false);
    
    let state = {
        member_since: 2019
    }
    const handleClickOpen= () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleChange = (event) =>{
        state[event.target.name] = event.target.value
    }
    
        return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                Create a New Account
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Portfolio</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter new User Info
                </DialogContentText>
                <form id="addUser" >
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        id="name"
                        label="Username"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        id="email"
                        label="Email"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        id="name"
                        label="Name"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="image_url"
                        id="name"
                        label="Image_url"
                        fullWidth
                        onChange={handleChange}
                    />

                    
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button form="addUser" label="submit" onClick={()=> {
                    props.createUser(state)
                    handleClose()
                    }} 
                    color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
            </div>
    )
    
}

export default NewUser;