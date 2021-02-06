import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import Correct from './Asset1.svg'
import { Close } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({

  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position:'fixed',
    width: '100%',
    height: '100vh'
  },
  paper: {
    backgroundColor: "#fff",
    border: '2px solid #000ff',
    color:'#333',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    Width: '80%',
    Height: '80%',
    maxWidth: 400,
    maxHeight: 400
  },
  iconDiv:{
    display: 'flex',
    position: 'relative',
    justifyContent:'center',
    alignItem:'center',
    width:'100%',
    zIndex: 10,
    padding: '2rem 3rem'
  },
  icon:{
    width: 200,
    height: 200,
    cursor:'pointer'
    
  },
  close:{
    float: 'right',
  },
  text:{
    textAlign: 'center'
  }
}));

export default function CustomModal({text="Hello there", icon="fail", open=true, onClose}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);


  

  useEffect(() => {
    document.querySelector('body').style.padding= "0";
  })
  return (
    <div style={{position: 'fixed', width:'100%', height:'100vh', left: 0, top: 0}}>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.close}>
              <Close onClick={onClose} />
            </div>
            <div className={classes.iconDiv}>
              <img className={classes.icon} src={`/Icons/${icon}.svg`} alt="modal" />
            </div> 
            <div className={classes.text}>
              <h3>{text}</h3>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
