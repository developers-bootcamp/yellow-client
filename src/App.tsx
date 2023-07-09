import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from './components/routing';
import LandingPage from './pages/landingPage';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PALLETE } from './config/config';
function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main:`${PALLETE.ORANGE}`,
      },
      secondary: {
        main:`${PALLETE.WHITE}` ,
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

  return (<>
  <ThemeProvider theme={theme}>
    <Routing/>
    </ThemeProvider>
 </> );
}

export default App;
