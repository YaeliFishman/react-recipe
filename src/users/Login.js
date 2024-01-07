import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import { ImportExportTwoTone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
// import EnterPage from './EnterPage';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const defaultTheme = createTheme();
const Login = () => {
    const dispatch = useDispatch();
    const naving = useNavigate();
    const nav = () => {
        naving("/HomePage");
    }
    const nav2 = () => {
        naving("/Signin");
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('Username');
        let password = data.get('Password');
        const myData = { Username: name, Password: password };
        axios.post(`http://localhost:8080/api/user/login`, myData)
            .then(res => {
                console.log(res.data)
                dispatch({ type: "SET_USER", user: res.data });
                axios.get(`http://localhost:8080/api/recipe`)
                    .then(res => {
                        const fatchData = res.data;
                        console.log(fatchData);
                        dispatch({ type: "GET_RECIPIES", data: fatchData })
                        axios.get(`http://localhost:8080/api/category`).then(res => {
                            const fatchData = res.data;
                            console.log(fatchData);
                            dispatch({ type: "GET_CATEGORY", category: fatchData });
                        })
                        axios.get(`http://localhost:8080/api/bay/${res.data.Id}`)
                            .then(res => {
                                dispatch({ type: "GET_LIST", data: res.data })
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }).catch(error => {
                        console.log(error);
                    });
                nav();
            }).catch(error => {
                if (error.response) {
                    alert(error.response.data);
                    nav2();
                }
            })
    }
    return (

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {/* <EnterPage /> */}
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="name" label="Enter name" name="Username" autoComplete="name" />
                        <TextField margin="normal" required fullWidth name="Password" label="Password" type="password" id="Password" autoComplete="current-password" />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                        <Grid container>
                            <Grid item xs> <Link href="#" variant="body2"> Forgot password? </Link> </Grid>
                            <Grid item> <Link href="#" variant="body2"> {"Don't have an account? Sign Up"} </Link> </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default Login;