import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Copyright from '@mui/styled-engine-sc';
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
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import EnterPage from './EnterPage';
import { useDispatch } from 'react-redux';
// import FormData from "";
const defaultTheme = createTheme();
const Signin = () => {
  const naving = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id = data.get('Id');
    let username = data.get('Username');
    let password = data.get('Password');
    let name = data.get('Name');
    let phone = data.get('Phone');
    let email = data.get('Email');
    let tz = data.get('Tz');
    const myData = { Id: id, Username: username, Password: password, Name: name, Phone: phone, Email: email, Tz: tz }
    axios.post(`http://localhost:8080/api/user/sighin`, myData)
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
                console.error(error)
              })
          }).catch(error => {
            console.log(error)
          });
        naving("/HomePage");
      }).catch(error => {
        if (error.response) {
          alert(error.response.data);
          naving("/Signin");
        }
      })
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <EnterPage />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth name="Id" label="Id" type="Id" id="Id" />
            <TextField margin="normal" required fullWidth name="Username" label="Enter Username" id="Username" autoComplete="Username" />
            <TextField margin="normal" required fullWidth name="Password" label="Password" type="Password" id="Password" autoComplete="current-password" />
            <TextField margin="normal" required fullWidth name="Name" label="Enter name" id="Name" autoComplete="Name" />
            <TextField margin="normal" required fullWidth name="Phone" label="Phone" type="Phone" id="Phone" />
            <TextField margin="normal" required fullWidth name="Email" label="Email" type="Email" id="Email" />
            <TextField margin="normal" required fullWidth name="Tz" label="Tz" type="Tz" id="Tz" />
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
export default Signin;