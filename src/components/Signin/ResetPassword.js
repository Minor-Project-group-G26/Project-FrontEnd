import { TextField, Button, FormHelperText, FormControl } from '@material-ui/core'
import React, { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import './Signin.css'
import Axios from 'axios';
import { signStyle } from './Style';
// material ui stylesheet


// custom stylesheet for check-box


//............Sign Up Form Handler


//....................................main Function
function ResetPassword() {

    const {tokenId} = useParams()
    //............... state/variable initialization 
    const classes = signStyle()

    // New user state
    const [User, setUser] = useState({
        password: '',
        cpassword: '',
        tokenId: tokenId,
        
    })
    const [error, setError] = useState("")

    //........ ....... StateHandle
    // check-box handler
    
    // new user form input handler
    const ResetInputHandler = (e) => {
        switch (e.target.id) {
            case "pass":
                setUser({
                    ...User,
                    password: e.target.value
                })
                break;
            case "cpass":
                setUser({
                    ...User,
                    cpassword: e.target.value
                })
                break;
            default:
                break;
        }
    }
    if(!sessionStorage.getItem('tokenId')){
        alert("Invalid Token");
        return window.location.replace("/user/signin")
    }

    // useEffect(() => {
    //     // document.getElementById;
    //     console.log(User);
    //     console.log(error);
    // }, [User])

    const SignInFormHandler = (e) =>{
        e.preventDefault()
        console.log(User)
        if(User.password !== User.cpassword)
        return 0;
        const formdata = new FormData()
        formdata.append("tokenId", User.tokenId)
        formdata.append("newPassword", User.password)
        Axios.put("http://127.0.0.1:5000/user/reset", formdata)
        .then(res => (res.data))
        .then(data => {
            console.log(data);
            const {errors} = data;

            if(errors){
                
    
                setError(errors)
                return false;
            }
            alert("password change successful")
            sessionStorage.clear();
            return window.location.replace("/user/signin");
        })
    }

    return (
        <main>

            <div className={classes.mainForm}>
                <form onSubmit={SignInFormHandler}>
                    <div className={classes.formHeader}>
                        <h1>Reset</h1>
                    </div>
                    <div className={classes.formMain}>
                        <div className={classes.formInput}>
                        <FormControl fullWidth error={error.length > 0 ? true: false}>
                            <TextField id="pass" fullWidth
                                autoComplete='off'
                                required
                                type="password"
                                error = {error.length > 0 ? true: false}
                                onChange={ResetInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="email-error-text"
                                label="New Password" variant="filled" />
                                
                                <FormHelperText id="emai-error-text"> { error } </FormHelperText>
                        </FormControl>
                        </div>
                        <div className={classes.formInput}>
                            <TextField id="cpass" fullWidth
                                type="password"
                                required
                                onChange={ResetInputHandler}
                                autoComplete='off'
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                label="Confirm Password" variant="filled" />
                        </div>
                        
                    </div>
                    <div className="form__submit">
                        <div className="option">
                            
                        </div>
                        <Button variant="contained" fullWidth type='submit'
                            style={{ padding: '0.7rem 0', color: '#fff' }} color="secondary" >
                            <label style={{color: 'white'}}>Reset</label>
                        </Button>
                    </div>
                </form>
                <div className={classes.login}>
                    <p className={classes.login}> User! <Link to='/user/signin' className='link' >Sign in</Link></p>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword
