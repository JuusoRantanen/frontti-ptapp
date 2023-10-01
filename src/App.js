
import './App.css';
import { CSVLink } from "react-csv";
//import * as React from 'react';
import React, {  useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
const pages = ['Traininglist', 'Customerlist'];





function App() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [customers, setCustomers] = useState([]);
    

  useEffect(() =>
    fetchData()
    
  , [])

  const fetchData = () => {
      fetch('http://traineeapp.azurewebsites.net/api/customers')
          .then(response => response.json())
        .then(data => setCustomers(data.content))
    
  }

  /* const headers = [
    { label: 'firstname', key: (customers.content.firstname) },
    { label: 'lastname', key: (customers.content.lastname) },
    { label: 'streetaddress', key: (customers.content.streetaddress) },
  ]; */
  
  return (
    <div className="App">
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
                  >
            PT APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    
                      <Typography textAlign="center">
                          <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                          {page}
                          </Link>
                          </Typography>
                         
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
                  PT APP
                      
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>{page}</Link>
                        
              </Button>
            ))}
          </Box>
          <Stack
        divider={<Divider orientation="vertical" flexItem />}
        direction="row" spacing={5}
        justifyContent="center"
              alignItems="center">
             
             <Button size='small'><CSVLink data={customers}>Download customerlist</CSVLink></Button>
             
    </Stack>
        </Toolbar>
      </Container>
      </AppBar>
    </div>
   
  );
}

export default App;
