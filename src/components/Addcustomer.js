import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Addcustomer(props) {

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
    const [customer, setCustomer] = useState({
        firstname:'',lastname:'', email:'', phone:'', streetaddress:'',postcode:'',city:''
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value })
  }

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  }

    return (
        <div>
         <ThemeProvider theme={theme}> <Button variant="outlined" onClick={handleClickOpen}>
        Add new Customer
      </Button></ThemeProvider>  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert the information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name='firstname'
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            label="First name"
            fullWidth
                    />
                     <TextField
            margin="dense"
            name="lastname"
              value={customer.lastname}
              onChange={e => handleInputChange(e)}
            label="Last name"
            fullWidth
            />
            <TextField
            margin="dense"
            name="streetaddress"
              value={customer.streetaddress}
              onChange={e => handleInputChange(e)}
            label="Street address"
            fullWidth
            />
            <TextField
            margin="dense"
            name="postcode"
              value={customer.postcode}
              onChange={e => handleInputChange(e)}
            label="Postcode"
            fullWidth
            />
            <TextField
            margin="dense"
            name="city"
              value={customer.city}
              onChange={e => handleInputChange(e)}
            label="City"
            fullWidth
            />
            <TextField
            margin="dense"
            name="email"
              value={customer.email}
              onChange={e => handleInputChange(e)}
            label="Email"
            fullWidth
            />
            <TextField
            margin="dense"
            name="phone"
              value={customer.phone}
              onChange={e => handleInputChange(e)}
            label="Phone"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>

        </div>
    );

  
}