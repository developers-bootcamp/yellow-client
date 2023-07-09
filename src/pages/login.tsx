import { Link, Button, Dialog, IconButton, Input, InputAdornment, OutlinedInput, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../style/Login.styles.css';
import SignUp from "./SignUP/SIgnUp";





const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='container'>
        <Paper className='paper'>
          <h1>Log in to your account</h1>
          <h3>Enter your email address and password</h3>
          <input type="email" className="name-field" placeholder='example@gmail.com' />

          <br />

          <OutlinedInput
            placeholder="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <Button variant="contained" color="primary" id='logIn-button'>Log in</Button>
          <h3>or sign in with</h3>
          <h3>Don't have an account yet?</h3>
          {/* <Link className="signIn" to={"/signUp"}>Sign in</Link> */}
          <Link onClick={handleClickOpen}>sign Up</Link>
          <Dialog onClose={handleClose} fullWidth maxWidth={'md'} open={open} PaperProps={{ sx: { width: "80%", height: "80%", padding: '0', margin: '0' } }}>
            <SignUp onClose={handleClose} />

          </Dialog>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
