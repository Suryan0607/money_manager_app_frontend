import React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import 'boxicons';
import { default as api } from '../store/apiSlice';
import DashSrc from './dashsrc';


const mdTheme = createTheme();
const History = () => {
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery()
    const [deleteTransaction] = api.useDeleteTransactionMutation()

    let Transactions;


    const handlerClick = (e) => {
        if (!e.target.dataset.id) return 0;
        deleteTransaction({ _id: e.target.dataset.id })
    }

    if (isFetching) {
        Transactions = <div>Fetching</div>;
    } else if (isSuccess) {
        Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
    } else if (isError) {
        Transactions = <div>Error</div>
    }


    return (
        <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
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
                <Grid container spacing={3}>

                    {/* Chart */}
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="flex flex-col py-6 gap-3">
                            <h1 className='py-4 font-bold text-xl'>History</h1>
                            {Transactions}
                        </div>
                    </Grid>
                </Grid>
            </Container>
            </Box>
      </Box>
    </ThemeProvider>
       


    )
}

function Transaction({ category, handler }) {
    if (!category) return null;
    return (

        <div className="item flex justify-center bg-gray-50 width-500 py-2 rounded-r" style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ''} color={category.color ?? "#e5e5e5"} size="15px" name="trash" ></box-icon></button>
            <span className='block w-full'>{category.name ?? ''}</span>
            <span className='block w-full'>{category.amount ?? ''}</span>
            <span className='block w-full'>{category.date ?? ''}</span>
        </div>
    )
}

export default History


