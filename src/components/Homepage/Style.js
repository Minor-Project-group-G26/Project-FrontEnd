import { makeStyles } from "@material-ui/core";

export const HomeStyles = makeStyles(theme=>({
    
    banner:{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80vh',
    },
    getStarted:{
        margin: '3rem 0',
    },
    getStartedBtn:{
        padding: '1rem 2rem',
        backgroundColor: 'rgba(23, 23, 24, 0.719)',
        border:'none',
        cursor: 'pointer',
        fontSize: '8px',
        color: '#fff',
        outlineColor: 'blue',
        fontWeight: 600,
        letterSpacing: '1.5px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover':{
            backgroundColor: 'transparent',
            border: '1px solid rgb(255, 255, 255)',
        },
    },
    slider:{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: '100%',
        height: '800px',
    },
    sliderHeader:{
        padding: '0 4rem',
        color: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '1rem',
        marginTop: '2rem',
        
    }

}))