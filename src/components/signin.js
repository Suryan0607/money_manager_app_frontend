import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useNavigate } from 'react-router-dom';
import {default as api} from '../store/apiSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


const Signin = ({setLoginUser}) => {


  const navigate = useNavigate();
  
  const[initValues,setInitValues ] =useState( {
    email: '',
    password: '',
  })

  const [signinUser]=api.useSigninUserMutation()


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  
      
  const onSubmit = async (values, props) => {
    try{

        setInitValues(values)
        
        const response = await signinUser(values).unwrap()

        if(response){
          
          alert(` hello ${response.user.username} ! Welcome My App ! `)

          setLoginUser(response.user)

          navigate(`/dashboard/${response.user._id}/${response.user.username}`);
        }
        setTimeout(() => {
          props.resetForm()
          props.setSubmitting(false)
      }, 2000);

      }
      catch(error){
        alert(`User Doesn't Exist...or ${error.data.message}`)    
        setTimeout(() => {
          props.resetForm()
          props.setSubmitting(false)
      }, 2000)
      }
       
    };
    

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        
          <Formik initialValues={initValues}
           validationSchema={validationSchema} 
           onSubmit={onSubmit}>
           
           {(props) => (
              <Form>
                 <Grid container spacing={2} >
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    size='small'
                    id="email"
                    type="email"
                    name="email"
                    label='Email'
                    placeholder="Enter your email"
                    value={props.values.email}
                    error={props.errors.email && props.touched.email}
                    helperText={<ErrorMessage name="email" />} />
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
                    placeholder="Enter your password"
                    value={props.values.password}
                    error={props.errors.password && props.touched.password}
                    helperText={<ErrorMessage name="password" />} />
                </Grid>
          
                <Grid item xs={12}>
                <Button       
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{marginTop:'15px'}}
                  size='small'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In

                </Button> 
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <Button component={RouterLink} to='/' href="#" variant="text" >
                      < HomeOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={RouterLink} to='/signup' href="#" variant="text" >
                      {"Don't have an account? Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
                </Grid>
              </Form>
             )}
          </Formik>
        
      </Container>

  );
}

export default Signin;

