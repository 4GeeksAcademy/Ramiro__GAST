import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      employeeId: data.get('employeeId'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: '#2db734' }}>
          <Toolbar>
            {/* Empty Navbar */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CODEFUSION CAFE
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="EMPLOYEE ID"
                  label="EMPLOYEE ID"
                  type="EMPLOYEE ID"
                  id="EMPLOYEE ID"
                  autoComplete="EMPLOYEE ID"
                  autoFocus
                />
              </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Confirm Password"
                  label="Confirm Password"
                  name="Confirm Password"
                  autoComplete="family-name"
                />
              
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#2db734' }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
