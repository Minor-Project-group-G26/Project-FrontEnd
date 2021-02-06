import { TextField, Button, Checkbox, FormControlLabel, withStyles, makeStyles, FormHelperText, FormControl } from '@material-ui/core'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
// import './Login.css'
// import { grey } from '@material-ui/core/colors';
import Axios from 'axios';
import { signStyle } from './Style';
// material ui stylesheet


// custom stylesheet for check-box

//............Sign Up Form Handler


//....................................main Function
function Login() {
    //............... state/variable initialization 
    const classes = signStyle()
    // check-box state
    const [state, setState] = useState({

        TC: false,
    });
    // New user state
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        
    })
    const [error, setError] = useState("")

    //........ ....... StateHandle
    // check-box handler
    const handleChange = (event) => {
        setState({ TC: event.target.checked });
    };
    // new user form input handler
    const SignupInputHandler = (e) => {
        switch (e.target.id) {
            case "email":
                setNewUser({
                    ...newUser,
                    email: e.target.value
                })
                break;
            case "pass":
                setNewUser({
                    ...newUser,
                    password: e.target.value
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

    const LoginFormHandler = (e) =>{
        e.preventDefault()
        console.log(newUser)
        const formdata = new FormData()
        formdata.append("email", newUser.email)
        formdata.append("password", newUser.password)
        Axios.post("http://127.0.0.1:5000/admin/Login", formdata)
        .then(res => (res.data))
        .then(data => {
            console.log(data);
            const {errors, success} = data;

            if(errors){
                let emailtext = "";
               
                const {email} = errors;
                if(email)
                emailtext = email;
    
                setError(emailtext)
                return false;
            }
            localStorage.setItem('AD_TOKEN', success.token);
            localStorage.setItem('AD_NAME', success.name);
            return window.location.href = "http://localhost:3000/admin/profile";
        })
    }

    return (
        <main className={classes.main}>

            <div className={classes.mainForm}>
                <form onSubmit={LoginFormHandler}>
                    <div className={classes.formHeader}>
                        <h1>Login</h1>
                    </div>
                    <div className={classes.formMain}>
                        <div className={classes.formInput}>
                        <FormControl fullWidth error={error.length > 0 ? true: false}>
                            <TextField id="email" fullWidth
                                autoComplete='off'
                                required
                                error = {error.length > 0 ? true: false}
                                onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="email-error-text"
                                label="Email" variant="filled" />
                                
                                <FormHelperText id="emai-error-text"> { error } </FormHelperText>
                        </FormControl>
                        </div>
                        <div className={classes.formInput}>
                            <TextField id="pass" fullWidth
                                type="password"
                                required
                                onChange={SignupInputHandler}
                                autoComplete='off'
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                label="Password" variant="filled" />
                        </div>
                        
                    </div>
                    <div className="form__submit">
                        
                        <Button variant="contained" fullWidth type='submit'
                            style={{ padding: '0.7rem 0' }} color="secondary" >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login
