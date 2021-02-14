import { TextField, Button, Checkbox, FormControlLabel, withStyles, FormControl, FormHelperText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Signin.css'
import { grey } from '@material-ui/core/colors';
import Axios from 'axios';
import { signStyle } from './Style';


// material ui stylesheet
// const signStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',

//         },
//     },
// }));

// custom stylesheet for check-box
const GreyCheckbox = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: grey[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


//............Sign Up Form Handler


//....................................main Function
function Signup() {
    //............... state/variable initialization 
    const classes = signStyle()
    // check-box state
    const [state, setState] = useState({

        TC: false,
    });
    // New user state
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        phone: ''
    })
    const [NewUserError, setNewUserError] = useState({
        email: '',
        password:'',
        cpassword:'',
        phone: '',
        
    })

    //........ ....... StateHandle
    // check-box handler
    const handleChange = (event) => {
        setState({ TC: event.target.checked });
    };
 
    
    // new user form input handler
    const SignupInputHandler = (e) => {
        switch (e.target.id) {
            case "name":
                setNewUser({
                    ...newUser,
                    name: e.target.value
                })
                break;
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
            case "cpass":
                setNewUser({
                    ...newUser,
                    cpassword: e.target.value
                })
                break;
            case "phone":
                setNewUser({
                    ...newUser,
                    phone: e.target.value
                })
                break;

            default:
                break;
        }
    }
    

    useEffect(() => {
        // document.getElementById('')
        console.log(NewUserError);
        console.log(newUser)
        if(newUser.password !== newUser.cpassword){
            console.log("Password doesn't match");
            setNewUserError({
                ...NewUserError,
                cpassword: "password not match"
            })
            
        }
        
        
        return () =>{
            setNewUserError({
                email: '',
                password:'',
                cpassword:'',
                phone: '',
            })
        }
    },[newUser])

    const SignUpFormHandler = async (e) =>{
        
        e.preventDefault();
        console.log("Click")
        console.log(newUser)
        setNewUserError({
            ...NewUserError,
            cpassword: ""
        })
        if (newUser.cpassword !== newUser.password){
            console.log("Password doesn't match");
            setNewUserError({
                ...NewUserError,
                cpassword: "password not match"
            })
            return false;
        }
        const formdata = new FormData();
        formdata.append("name", newUser.name);
        formdata.append("email", newUser.email.toLowerCase());
        formdata.append("password", newUser.password);
        formdata.append("cpassword", newUser.cpassword);
        formdata.append("phone", newUser.phone);
        Axios.post("http://127.0.0.1:5000/user/signup", formdata)
        .then(res => (res))
        .then(res => {
            console.log(res);
            const {data} = res;
            const {errors, success} = data;
            if(errors){
                let emailtext = "";
                let phonetext = "";
                const {email, phone} = errors;
                if(email)
                emailtext = email;
                if(phone)
                phonetext = phone;
    
                setNewUserError({
                    ...NewUserError,
                    email: emailtext,
                    phone : phonetext
                })
                return false;
            }
            // console.log(success.token)
            localStorage.setItem('USER_TOKEN', success.token);
            localStorage.setItem('USER_NAME', success.name);
            return (window.location.href = "http://localhost:3000/user/profile");
        })
        
        
    }


    return (
        <main>

            <div className={classes.mainForm}>
                <form onSubmit={SignUpFormHandler}>
                    <div className={classes.formHeader}>
                        <h1>Sign Up</h1>
                    </div>
                    <div className={classes.formMain}>
                        <div className={classes.formInput}>
                            <TextField id="name" fullWidth
                                // error
                                // helperText="Incorrect entry."
                                required
                                onChange={SignupInputHandler}
                                autoComplete='off'
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                label="Full Name" variant="filled" />
                        </div>
                        <div className={classes.formInput}>
                            <FormControl error={(NewUserError.email).length > 0? true: false} fullWidth >
                                <TextField id="email" fullWidth
                                type='email'
                                required
                                error = {(NewUserError.email).length > 0? true: false}
                                onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="email-error-text"
                                label="Email" variant="filled" />
                                <FormHelperText id='email-error-text'> { NewUserError.email } </FormHelperText>
                            </FormControl>
                            
                        </div>
                        <div className={classes.formInput}>
                            <FormControl error={(NewUserError.password).length > 0? true: false} fullWidth >
                                <TextField id="pass" fullWidth
                                type='password'
                                required
                                error = {(NewUserError.password).length > 0? true: false}
                                onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="pass-error-text"
                                label="Password" variant="filled" />
                                <FormHelperText id='pass-error-text'> { NewUserError.password } </FormHelperText>
                            </FormControl>
                        </div>
                        <div className={classes.formInput}>
                        <FormControl error={(NewUserError.cpassword).length > 0? true: false} fullWidth>
                                <TextField id="cpass" fullWidth
                                type='password'
                                required
                                error = {(NewUserError.cpassword).length > 0? true: false}
                                onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="cpass-error-text"
                                label="Confirm Password" variant="filled" />
                                <FormHelperText id='cpass-error-text'> {NewUserError.cpassword } </FormHelperText>
                            </FormControl>

                        </div>
                        <div className={classes.formInput}>
                        <FormControl error={(NewUserError.phone).length > 0? true: false} fullWidth >
                                <TextField id="phone" fullWidth
                                type='text'
                                required
                                error = {(NewUserError.phone).length > 0? true: false}

                                onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="phone-error-text"
                                label="Phone" variant="filled" />
                                <FormHelperText id='phone-error-text'> { NewUserError.phone } </FormHelperText>
                            </FormControl>

                        </div>
                    </div>
                    <div className="form__submit">
                        <div className="option">
                            <FormControlLabel
                                style={{color:'#555'}}
                                control={<GreyCheckbox checked={ state.TC } required onChange={handleChange} name="TC" />}
                                label="Agree Term and Condition"
                            />
                        </div>
                        <Button variant="contained" fullWidth
                            type='submit'
                            style={{padding: '0.7rem 0' }} 
                            color="secondary" >
                            <label style={{color: 'white'}}>Sign Up</label>
                        </Button>
                    </div>
                </form>
                <div className={classes.login}>
                    <p className={classes.login}>If already have a Account! <Link  to='/user/signin' className='link' >Log in</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Signup
