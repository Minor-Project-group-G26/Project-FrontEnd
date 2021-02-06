import { makeStyles } from "@material-ui/core";

export const signStyle = makeStyles(theme =>({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',

        }
    },
    mainForm:{
        "@media(max-width: 500px)":{
            width: '100%',
            padding: '1.85rem 1.5rem',
            paddingBottom: '5rem',
        },
        
        maxWidth: '500px',
        width: '80%',
        padding:' 2rem 4rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    formHeader:{
        color: 'white',
        fontWeight: 600,
        letterSpacing: '1.5px',
        wordSpacing: '2px',
        margin: '2rem',
        marginLeft: '0',
    },
    formInput:{
        "@media(max-width: 500px)":{
            width: '100%',
        },
        margin:'1rem 0',
    },
    formMain:{
        display: 'block',
        marginBottom: '2rem',
    },
    login:{
        padding: '0.5rem 0',
        color:'grey',
        fontSize: '16px',
    },
    link:{
        fontSize: '18px',
        letterSpacing: '1.5px',
        fontWeight: 600,
    }
}))
