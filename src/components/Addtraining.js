import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Addtraining(props) {

    const theme = createTheme({
        status: {
          danger: '#e53e3e',
        },
        palette: {
          primary: {
            main: '#0971f1',
            darker: '#053e85',
          },
          neutral: {
            main: '#ffffff',
            contrastText: '#ffffff',
          },
        },
      });

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
      activity: '', date: '', duration: '', customer: (props.data.links[0].href) 
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value })
  }

  const addTraining = () => {   
   props.saveTraining(training);
    handleClose();
  }

    return (
        <div>
         <ThemeProvider theme={theme}> <Button size="small" variant="outlined" onClick={handleClickOpen}>
        New training
      </Button></ThemeProvider>  
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new training for customer {props.data.firstname} {props.data.lastname}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert the information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name='activity'
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity name"
            fullWidth
                    />
                     <TextField
            margin="dense"
              name="date"
              type="date"
              value={training.date}
              onChange={e => handleInputChange(e)}
            label=""
            fullWidth
            />
            <TextField
            margin="dense"
              name="duration"
              type="number"
              value={training.duration}
              onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
            />
            
            <TextField
            margin="dense"
            name="customer"
              value={props.data.links[0].href}
              onChange={e => handleInputChange(e)}
            label="customer"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>

        </div>
    );

  
}