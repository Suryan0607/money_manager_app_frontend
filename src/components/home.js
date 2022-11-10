import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import  Typography  from "@mui/material/Typography";
import Button  from '@mui/material/Button';
import {Link as RouterLink } from "react-router-dom";
import Divider from '@mui/material/Divider';



const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));


function Home() {
  return (
    <><div>
    <MuiAppBar position="fixed" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }} />
        <Typography
          variant="h6"
          underline="none"
          color="inherit"
          sx={{ fontSize: 32 }}
        >
          Money Manager
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link 
            component={RouterLink} 
            to="/signin"
            color="inherit"
            variant="h6"
            underline="none"
            href="#"
            sx={rightLink}
          >
            Sign In
          </Link>
          <Link 
            component={RouterLink} 
            to="/signup"
            variant="h6"
            underline="none"
            href="#"
            sx={{ ...rightLink, color: 'secondary.main' }}
          >
            {'Sign Up'}
          </Link>
        </Box>
      </Toolbar>
    </MuiAppBar>
    <Toolbar />
    <Typography 
     color="inherit"
     align="center" 
     variant="h3" 
     marked="center"
     style={{ margin: '50px' }}
     >
        Upgrade your Future
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Do not save what is left after spending, but spend what is left after saving.
      </Typography>
      
      <Divider light />
      
      <Button 
        style={{ margin: '50px' }}
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink} 
        to="/signup"
        sx={{ minWidth: 200 }}
      > 

            Register
          
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
  </div></>
  
    
  );
}

export default Home;


