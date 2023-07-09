import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useStyles from "../style/loginStyle";
import { Link } from "react-router-dom";
import { PALLETE } from "../config/config";
import { hover } from "@testing-library/user-event/dist/hover";
const Login: React.FC = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <h1>Log in to your account</h1>
          <h3>Enter your email address and password</h3>
          <div>
            <OutlinedInput
              placeholder="Email"
              id="email"
              sx={{ width: "20vw" }}
            />
          </div>
          <br />
          <OutlinedInput
            sx={{
              height: "8vh",
              "&:focus": {
                borderColor: "black",
              },
            }}
            id="outlined-adornment-password"
            className={classes.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
          <Button
            sx={{
              backgroundColor: PALLETE.YELLOW,
              width: "20vw",
              height: "6vh",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: PALLETE.YELLOW,
              },
            }}
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
          <h3>or sign in with</h3>
          <h3>Don't have an account yet?</h3>
          <Link className={classes.signIn} to={""}>
            Sign in
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
