import { TextField, Button, Checkbox, FormControlLabel, withStyles, FormHelperText, FormControl } from '@material-ui/core'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './LoginPage.css';
import { grey } from '@material-ui/core/colors';
import Axios from 'axios';
import { signStyle } from './Style';
// material ui stylesheet


// custom stylesheet for check-box

//............Sign Up Form Handler


//....................................main Function
function ForgetPass() {
    //............... state/variable initialization 
    const classes = signStyle()
    // check-box state
    
    // New user state
    const [NewAdmin, setNewAdmin] = useState({
        email: '',
        phone: '',
        
    })
    const [error, setError] = useState("")

    //........ ....... StateHandle
    // check-box handler
    
    // new user form input handler
    const InputHandler = (e) => {
        switch (e.target.id) {
            case "email":
                setNewAdmin({
                    ...NewAdmin,
                    email: e.target.value
                })
                break;
            case "phone":
                setNewAdmin({
                    ...NewAdmin,
                    phone: e.target.value
                })
                break;
            default:
                break;
        }
    }

    // useEffect(() => {
    //     // document.getElementById;
    //     console.log(newUser);
    //     console.log(error);
    // }, [newUser])

    const ForgetFormHandler = (e) =>{
        e.preventDefault()
        console.log(NewAdmin)
        const formdata = new FormData()
        formdata.append("email", NewAdmin.email)
        formdata.append("phone", NewAdmin.phone)
        Axios.put("http://127.0.0.1:5000/admin/forget", formdata)
        .then(res => (res.data))
        .then(data => {
            console.log(data);
            const {errors, success} = data;

            if(errors){
                
                setError(errors)
                return false;
            }
            // localStorage.setItem('USER_TOKEN', success.token);
            // localStorage.setItem('USER_NAME', success.name);
            sessionStorage.setItem('tokenId', success);
            return window.location.replace("reset/"+success);
        })
    }

    return (
        <main>

            <div className={classes.mainForm}>
                <form onSubmit={ForgetFormHandler}>
                    <div className={classes.formHeader}>
                        <h1>Forget Password</h1>
                    </div>
                    <div className={classes.formMain}>
                        <div className={classes.formInput}>
                        <FormControl fullWidth error={error.length > 0 ? true: false}>
                            <TextField id="email" fullWidth
                                autoComplete='off'
                                required
                                error = {error.length > 0 ? true: false}
                                onChange={InputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="email-error-text"
                                label="Email" variant="filled" />
                                
                                <FormHelperText id="emai-error-text"> { error } </FormHelperText>
                        </FormControl>
                        </div>
                        <div className={classes.formInput}>
                            <TextField id="phone" fullWidth
                                type="text"
                                required
                                onChange={InputHandler}
                                autoComplete='off'
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                label="Phone Number" variant="filled" />
                        </div>
                        
                    </div>
                    <div className="form__submit">
                        <div className="option">
                            
                        </div>
                        <Button onClick={console.log(ForgetFormHandler)} variant="contained" fullWidth type='submit'
                            style={{ padding: '0.7rem 0', color: '#fff' }} color="secondary" >
                            <label style={{color: 'white'}}>Verify</label>
                        </Button>
                    </div>
                </form>
                
            </div>
        </main>
    )
}

export default ForgetPass
