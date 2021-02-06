import React,{ useEffect, useState } from 'react'
import './Profile.css';
import { Grid, Avatar,TextField, Button,  FormHelperText, FormControl, makeStyles} from '@material-ui/core'
import { Save, Edit, Cancel } from '@material-ui/icons'
// import CustomModal from '../Module/Modal/CustomModal'
import Axios from 'axios';
import {useHistory} from 'react-router-dom'
import CustomModal from '../Module/Modal/CustomModal';
const useStyle = makeStyles((theme) =>({
    '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        span:{
            color:'#fff'
        }
    },
    inputField:{
        width: '80%'
    },
    button: {
        margin: theme.spacing(1),
    },
    root:{
        padding: '3rem 2rem',
        paddingTop: '8rem',
        minHeight: '100vh',
        // margin: "3rem auto", 
        color:'#eee',
    }, 
    left:{
        backgroundColor: '#333',
        padding:'3rem',
        borderRadius: '20px',
    },
    leftImg:{
        margin: '1rem 2rem',
    },
    leftInput:{
        opacity: '0',
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        outline: 'none',
    },
    Avatar:{
        pointerEvents: 'none',
        width: theme.spacing(12),
        height: theme.spacing(12),
        // pointerEvents: 'none'
    },
    plan:{
        color: '#fff',
        textAlign: 'center',
    },
    planType:{
        margin: '2rem auto',
        '@global': {
        span:{
            color:'#fff'
        }
    },
    },
    planHeader:{
        
        fontSize:  '24px',
        fontWeight: 600,
        fontFamily: "Roboto",
        fontStyle: 'italic',
        color : '#eb5a06',
        
    },
    planDate:{
        margin: '1rem 0',
        fontFamily: 'monospace',
    },
    planDateText:{
        '&:nth-child(2)':{
            fontWeight: 400,
            color: '#eb5a06',
        }
    },
    detail:{
        backgroundColor: 'rgba(11, 11, 12, 0.692)',
        padding: '2rem',
        borderRadius: '20px',
    },
    detailDate:{
        margin: '3rem auto'
    },
    header:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    }
}))

function Profile() {
    const classes = useStyle();

    const history = useHistory()

    const [Modal, setModal] = useState(false)
    const [save, setSave] = useState(true); 
    const [Update, setUpdate] = useState(false); 
    const [Error, setError] = useState({error: "", phone: ""}); 
    const [ProfileImage, setProfileImage] = useState(null)
    const [User, setUser] = useState({
        name: "",
        // password:"",
        image: "",
        email:"",
        phone:"",
        startDate:"",
        expireDate: "",
        plan:"",
    });
    const [EditedUser, setEditedUser] = useState({
        name: "",
        // password:"",
        // email:"",
        phone:"",
        image: ""
    });
    const LogInCheck = () =>{
        if(localStorage.getItem("USER_TOKEN") && localStorage.getItem("USER_NAME"))
        return true;
        return false;
    }
    const LogoutHandler = () =>{
        localStorage.clear();
        window.location.reload();
    }

    const PreviewHandler = async(e) =>{
        
        const reader = new FileReader();
        // console.log(imageRef.current.files[0])
        setProfileImage(e.target.files[0]);
        reader.onload = () =>{
            if(reader.readyState === 2)
            setEditedUser({...EditedUser, image: reader.result})
        }
        reader.readAsDataURL(e.target.files[0])
    }



    const FetchData = async() =>{
        Axios.get(`http://127.0.0.1:5000/user/profile/${localStorage.getItem("USER_TOKEN")}`)
        .then(res=> res.data)
        .then(data=>{
            // console.log(data);
            setUser({
                name:data.name,
                image: data.profileImage!= null?`http://127.0.0.1:5000/get-file/users/${data.profileImage}`: "",
                email: data.email,
                phone: data.phone,
                plan: (data.plan!= null? data.plan+'₹/'+data.per: "NA"),
                
                startDate: (data.start!= null? data.start: "NA"),
                expireDate: (data.expire!= null? data.expire: "NA")
            });
            setEditedUser({
                name:data.name,
                phone: data.phone,
                image: data.profileImage!= null?`http://127.0.0.1:5000/get-file/users/${data.profileImage}`: ""
            });
            
            setUpdate(true);
        })
      }

      const UpdateHandler = async() =>{
        console.log('changed');
        const formdata = new FormData();
        formdata.append('name', EditedUser.name);
        formdata.append('email', User.email);
        formdata.append('phone', EditedUser.phone);
        formdata.append('profileImage', ProfileImage);
        console.log(ProfileImage)
        console.log(formdata.get('name'), formdata.get('email'), formdata.get('phone'), formdata.get("profileImage"))
        const res = await Axios({ 
            method  : 'PUT', 
            url : `http://127.0.0.1:5000/user/profile/${localStorage.getItem("USER_TOKEN")}`, 
            data : formdata, 
            headers : {'Content-Type': "multipart/form-data"}
          })
        console.log(res);
        const { error, errorPhone } = res.data;
        if (error){
            return setError({...Error, error: error})
        }
        if (errorPhone){
            return setError({...Error, phone: errorPhone})
        }
        setModal(true)
      }

    useEffect(() => {
        if(!LogInCheck())
        return history.replace("signin");
        FetchData()
        
        if(save === true && (User.name !== EditedUser.name || User.phone !== EditedUser.phone|| User.image!== EditedUser.image)){
            UpdateHandler()
            setUpdate(false)
            // window.location.reload()
        }
        
        console.log(User)
        console.log(EditedUser)
    }, [save, Update])

    const ChangePasswordHandler = ()=>{
        
        console.log(User)
        const formdata = new FormData()
        formdata.append("email", User.email)
        formdata.append("phone", User.phone)
        Axios.put("http://127.0.0.1:5000/user/forget", formdata)
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

    const CheckEdit = ()=>{
        if(save)
        return (<Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={()=> setSave(false)}
            className={classes.button}
            startIcon={<Edit />}
        >
            Edit
        </Button>)
        return (<><Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={()=> setSave(true)}
            className={classes.button}
            startIcon={<Save />}
        >
            Save
        </Button><Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={()=> {setSave(true); setEditedUser({name: User.name, phone: User.phone, image: User.image}) }}
            className={classes.button}
            startIcon={<Cancel />}
        >Cancel
        </Button></>)
    }


    const profile = ()=> (
        <Grid container justify='space-around' className="profile__container">
                <Grid item className={classes.left}>
                    <div className="profie__image">
                        <h2 style={{textAlign: 'center'}}>Profile</h2>
                        <div className={classes.leftImg}>
                            <input type="file" onChange={PreviewHandler} disabled={save} className={classes.leftInput} value="" name="profileimage" id=""/>
                            <Avatar src={EditedUser.image} className={classes.Avatar}>{User.name[0]}</Avatar>
                        </div>
                       
                    </div>
                    <div className={classes.plan}>
                        <div className={classes.plan}>
                            <h2 className={classes.planHeader}>Plan</h2>
                            <h2>{User.plan}</h2>
                        </div>
                        <div className={classes.planDate}>
                            <h2 className={classes.planHeader}>Start Date</h2>
                            <h2>{User.startDate}</h2>
                        </div>
                        <div className={classes.planDate}>
                            <h2 className={classes.planHeader}>Expire Date</h2>
                            <h2>{User.expireDate}</h2>
                        </div>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.header}>
                        <h2><span className={classes.planHeader}>User:</span> {User.name}</h2>
                        <div>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={ChangePasswordHandler}
                            className={classes.button}
                        >
                            Change Password
                        </Button>
                        {CheckEdit()}
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={LogoutHandler}
                            className={classes.button}
                        >
                            Logout
                        </Button>
                        </div>
                    </div>
                    <Grid container className={classes.detail}>
                        <Grid sm={6} xs={12} className={classes.detailDate}>
                            <FormControl className={classes.inputField} >
                                <TextField id="name" fullWidth
                                type='text'
                                required
                                value={EditedUser.name}
                                // error = {(NewUserError.phone).length > 0? true: false}
                                disabled={save}
                                onChange={(e)=> setEditedUser({...EditedUser, name: e.target.value})}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' }}}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="name-error-text"
                                label="Name" variant="filled" />
                                <FormHelperText id='name-error-text'>  </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12} className={classes.detailDate}>
                            <FormControl className={classes.inputField} >
                                <TextField id="email" fullWidth
                                type='text'
                                value={User.email}
                                disabled
                                required
                                // error = {(NewUserError.phone).length > 0? true: false}

                                // onChange={SignupInputHandler}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="email-error-text"
                                label="Email" variant="filled" />
                                <FormHelperText id='email-error-text'>  </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12} className={classes.detailDate}>
                            <FormControl error={Error.phone.length > 0? true: false} className={classes.inputField} >
                                <TextField id="phone" fullWidth
                                type='text'
                                value={EditedUser.phone}
                                disabled={save}
                                required
                                error={Error.phone.length > 0? true: false}
                                // error = {(NewUserError.phone).length > 0? true: false}
                                onChange={(e)=> setEditedUser({...EditedUser, phone: e.target.value})}
                                InputProps={{ style: { backgroundColor: '#333', color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#8c8c8c' } }}
                                aria-describedby="phone-error-text"
                                label="Phone" variant="filled" />
                                <FormHelperText id='phone-error-text'> {Error.phone} </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid sm={6} xs={12} className={classes.detailDate}>
                            
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
    )

    return (
        <main id="main" className={classes.root}>
            {Modal? (
                <CustomModal
                open={Modal} 
                onClose={()=> setModal(false)}
                text="Updated Successfully"
                icon="update"
                />
            ):
            profile()}
        </main>
    )
}

export default Profile
