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

export default function SignUp({ onClose }: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    return (<>
        <DialogContent style={{ padding: '0' }}>
            <div className={classes.mainDiv} style={{ display: 'flex' }}>
                <CssBaseline />
                <div className={classes.formtDiv} style={{ width: '70%' }} >
                    <h1> Set up your account</h1>
                    <SignUpForm></SignUpForm>
                </div>
                <div className={classes.picDiv} style={{ width: '30%' }}>
                    <img className={classes.img} src="gifts.png" alt="dsf" />
                    <h4 >Fill in your details so you can log in later</h4>
                </div>

            </div></DialogContent>
    </>
    );
}

