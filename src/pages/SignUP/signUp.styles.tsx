import { makeStyles } from "@material-ui/styles";




const useStyles = makeStyles({
    mainDiv: {
        position: 'relative',
        width: '100%',
        margin: '0',
        height: '100%'
    },
    formtDiv: {
        marginLeft: '100px',
    },
    picDiv: {
        height: '100%',
        backgroundColor: 'rgb(228, 214, 214)',
        textAlign: 'center',

    },

    img: {
        width: '90%',
        height: '50%',
        marginTop: '40%',
    },
    input: {

        width: '80% ',
    },
    signInButton: {
        position: 'absolute',
        backgroundColor: 'primary',
        borderRadius: '10px',
    },
})

export default useStyles;