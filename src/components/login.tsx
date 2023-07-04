import { Button, IconButton, Input, InputAdornment, OutlinedInput, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../style/Login.styles.css';
import { Link } from "react-router-dom";


const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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
          <input type="email"  className="name-field" placeholder='example@gmail.com' />
        
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
          <Link className="signIn" to={""}>Sign in</Link>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
