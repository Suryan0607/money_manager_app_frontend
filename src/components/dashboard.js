import React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Graph from './graph';
import Form from './form';

import DashSrc from './dashsrc';

const mdTheme = createTheme();

export default function Dashboard() {


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex',height:" 95vh" }}>

        <DashSrc />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            hight:"auto",
            overflow: 'auto',
           
          }}
        >
          
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>

              {/* Chart */}
              <Grid item xs={12} md={6} lg={7}>

                <Graph />

              </Grid>


              {/* Transaction */}
              <Grid item xs={12} md={4} lg={5} >

                <Form />

              </Grid>

            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
























