import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import { Box, Container, CssBaseline, Dialog, DialogContent, Grid, Link, Paper } from '@mui/material';
import present from './present.png'
import SignUpForm from './SignUpform';
import useStyles from './signUp.styles';


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SignUp() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    return (<>

<Link onClick={handleClickOpen}>sign Up</Link>
        <Dialog onClose={handleClose} fullWidth  maxWidth="md" PaperProps={{ sx: { width: "80%", height: "70%", } }} open={open}>
             <DialogContent className={classes.dialogContent} style={{width: "100%", height: "100%",padding: "{none}",backgroundColor:'red' }}>
                <Container maxWidth="md">
                    <Grid className={classes.mainGrid} container spacing={2}   style={{width: "100%", height: "100%" }}>
                        <CssBaseline />
                        <Grid item xs={8} style={{ backgroundColor:'blue', display: 'inline-block' }} >
                            <CssBaseline />

                            <h2>Set up your account</h2>
                            <SignUpForm></SignUpForm>

                        </Grid>
                        <Grid style={{ backgroundColor: 'rgb(198, 188, 188)' }}
                            item
                            xs={4}
                        >
                        
                            <img src='gifts.png' className={classes.pic} />
                            <h3 style={{ marginTop: '5px' }}>Fill in your details so you can login later</h3></Grid>
                    </Grid>
                    
                </Container>
            </DialogContent>
        </Dialog>
    </> 
    );
}

