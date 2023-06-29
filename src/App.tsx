import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from './components/routing';
import SimpleDialogDemo from './components/SignUP/SIgnUp';
import SimpleDialog from './components/SignUP/SIgnUp';
import { MyComponent } from './components/try';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import SignUp from './components/SignUP/SIgnUp';


function App() {
//   const theme = createTheme({
//     palette: { 
//     // orange: {
//     //     main:'#EB9F6E'
//     //   },
//       // white: {
//       //   main:'white'
//       // },
//     },
//     }
// )
  return (<>
  {/* <ThemeProvider theme={theme}></ThemeProvider> */}
   <Routing/>
 {/* <SignUp></SignUp> */}

  
  {/* <MyComponent></MyComponent> */}
 </> );
}

export default App;
