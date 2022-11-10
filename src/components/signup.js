import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { default as api } from '../store/apiSlice';


const Signup = () => {

    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })

    const [signupUser] = api.useSignupUserMutation()




    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
    })
    const onSubmit = async (values, props) => {
        try {
            setInitialValues(values)
            const response = await signupUser(values).unwrap()

            if (response) {
                alert(response.message)
                navigate('/signin');
            } else {
                alert("Invalid Input")
            }
            setTimeout(() => {
                props.resetForm()
                props.setSubmitting(false)
            }, 2000)

        } catch (error) {

            alert(error.data.message)

            setTimeout(() => {
                props.resetForm()
                props.setSubmitting(false)
            }, 2000)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                >
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>

                        {(props) => (
                            <Form>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} >
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            size='small'
                                            id="username"
                                            name="username"
                                            label='Username'
                                            value={props.values.username}
                                            placeholder="Enter Your Name"
                                            error={props.errors.username && props.touched.username}
                                            helperText={<ErrorMessage name="username" />} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            size='small'
                                            id="email"
                                            name="email"
                                            label='Email'
                                            value={props.values.email}
                                            placeholder="Enter Your Email"
                                            error={props.errors.email && props.touched.email}
                                            helperText={<ErrorMessage name="email" />} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            size='small'
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            label='PhoneNumber'
                                            value={props.values.phoneNumber}
                                            placeholder="Enter Your PhoneNumber"
                                            error={props.errors.phoneNumber && props.touched.phoneNumber}
                                            helperText={<ErrorMessage name="phoneNumber" />} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            size='small'
                                            id="password"
                                            name='password'
                                            type="password"
                                            label='Password'
                                            value={props.values.password}
                                            placeholder="Enter your password"
                                            error={props.errors.password && props.touched.password}
                                            helperText={<ErrorMessage name="password" />} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            size='small'
                                            id="confirmPassword"
                                            name='confirmPassword'
                                            type="password"
                                            label='Confirm Password'
                                            value={props.values.confirmPassword}
                                            placeholder="Re-enter your password"
                                            error={props.errors.confirmPassword && props.touched.confirmPassword}
                                            helperText={<ErrorMessage name="confirmPassword" />} />

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            fullWidth
                                            style={{ marginTop: '15px' }}
                                            size='small'
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={props.isSubmitting}
                                            color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}
                                        </Button>

                

                                    </Grid>
                                    <Grid item xs>
                                        <Button component={RouterLink} to='/' variant="text" >
                                            < HomeOutlinedIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button component={RouterLink} to="/signin" variant="text">
                                            Already have an account? Sign in
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Container>


    )
}

export default Signup;


