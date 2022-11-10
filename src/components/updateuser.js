import { React, useEffect, useState } from "react";
import DashSrc from './dashsrc';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const mdTheme = createTheme();

export default function UpdateForm() {
    const [userdata, setUserdata] = useState({
        username: "",
        email: "",
        phoneNumber: ""

    });


    const navigate = useNavigate();

    const { id, name } = useParams();



    useEffect(() => {
        axios.get(`https://money-manager-app-0.herokuapp.com/api/user/${id}`).then(response => {
            setUserdata(response.data[0]);
        }).catch(err => {
            console.log('Error: ', err);
        })
    }, [id])

    const { register, handleSubmit, resetField } = useForm();



    const onSubmit = async (data) => {
        try {

            const response = await axios.put(`https://money-manager-app-0.herokuapp.com/api/user/${id}`, data);

            if (response.data.username === "") {
                navigate(`/update_user/${id}/${name}`)
            } else {

                navigate(`/dashboard/${response.data._id}/${response.data.username}`)
            }


            resetField('username');
            resetField('email');
            resetField('phoneNumber');

        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', height: " 95vh", }}>
                <DashSrc />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: " 90vh",
                        overflow: 'auto',

                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={1}>

                            {/* Chart */}
                            <Grid item xs={12} md={10} lg={10}></Grid>
                            <div className="form max-w-sm mx-auto w-96">

                                <h1 className='font-bold pb-4 text-xl'>Profile Update</h1>

                                <form id='form' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-4">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                {...register('username')}
                                                placeholder={`Name  : ${userdata.username}`}
                                                className='form-input'
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                {...register('email')}
                                                placeholder={`Email  : ${userdata.email}`}
                                                className='form-input'
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                {...register('phoneNumber')}
                                                placeholder={`PhoneNumber  : ${userdata.phoneNumber}`}
                                                className='form-input'
                                            />
                                        </div>
                                        <div className="submit-btn">
                                            <button className='border py-2 text-white bg-indigo-500 w-full'>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </Grid>

                    </Container>
                    <Toolbar />
                    <Toolbar />
                </Box>
            </Box>
        </ThemeProvider >
    )
}