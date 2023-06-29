import React from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Container, CssBaseline, IconButton, Input, InputAdornment, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import present from './present.png'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    // const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        async function signUpRequest() {
            try {
                const res = await axios.post(`http://localhost:4000/signIn`, obj);
                return (res.data);
                // navigate("/LandingPage")
            } catch (error) {
                console.log(error);
            }
        }
        console.log("signUpRequest");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj={
            fullName: data.get('fullName'),
            companyName: data.get('companyName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(obj);
        signUpRequest();  
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const [checkedValidations, setCheckedValidations] = React.useState(false);

    const halndleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkedFiedsValidations = () => {
        console.log("checkedFiedsValidations");
        setCheckedValidations(true);
    };

    return (
        <div>
           <p>SignUp Componnent</p>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${present})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ><h1 style={{ marginTop: '750px'}}>Fill in your details so you can login later</h1></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                    Set up your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="fullName" label="Full Name*" name="fullName" autoFocus onBlur={checkedFiedsValidations} />
                        <TextField margin="normal" required fullWidth id="companyName" label="Company Name*" name="companyName" autoFocus onBlur={checkedFiedsValidations} />
                        <TextField margin="normal" required fullWidth name="password" label="Password*" type="password" id="password" autoComplete="current-password" onBlur={checkedFiedsValidations} />
                        <TextField margin="normal" required fullWidth id="email" label="Email Address*" name="email" autoFocus onBlur={checkedFiedsValidations} />
                        {/* <Input fullWidth id="password" type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={halndleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> */}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label={<span>
                                I agree to the <a href="http://localhost:3000/">Tems of service</a> and <a href="http://localhost:3000/">Privacy Policy</a>
                            </span>}
                        />
                        {checkedValidations ? <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button> : <></>}
                    </Box>
                </Box>
            </Container>
        </Grid>
      </Grid>
        </div>
    );
};

export default SignUp;
