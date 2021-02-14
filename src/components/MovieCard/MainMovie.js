import React,{useState,useEffect, useRef} from 'react'
import styled from 'styled-components';
import {BsStarFill} from 'react-icons/bs';
import {useHistory, useParams} from 'react-router-dom';
import Axios from "axios";
import CustomModal from "../Module/Modal/CustomModal"
import CommentCard from './CommentCard';
import { Button, makeStyles } from '@material-ui/core';
import Carosuel from '../Module/Carousel/Carosuel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Poster = styled.div`
    position: relative;
    height:510px;
    margin: 20px auto 20px auto;
    width: 450px;
    border-radius:12px;
    
    
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background: linear-gradient(90deg, rgba(2,0,.6,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212, 255, 1) 100%); */
    background-color: rgba(0,0,0,0.8);

    .TopPush{
        width: 100%;
        padding: 5rem 0;
        background: rgba(0,0,0,0.8);
        
    }

    .box div{
        position: absolute;
        width: 60px;
        height: 60px;
        background-color: transparent;
        border: 6px solid rgba(255,255,255,0.8);
    }
    .box div:nth-child(1){
        top: 12%;
        left: 42%;
        animation: animate 10s linear infinite;
    }
    .box div:nth-child(2){
        top: 70%;
        left: 50%;
        animation: animate 7s linear infinite;
    }
    .box div:nth-child(3){
        top: 17%;
        left: 6%;
        animation: animate 9s linear infinite;
    }
    .box div:nth-child(4){
        top: 20%;
        left: 60%;
        animation: animate 10s linear infinite;
    }
    .box div:nth-child(5){
        top: 67%;
        left: 10%;
        animation: animate 6s linear infinite;
    }
    .box div:nth-child(6){
        top: 80%;
        left: 70%;
        animation: animate 12s linear infinite;
    }
    .box div:nth-child(7){
        top: 60%;
        left: 80%;
        animation: animate 15s linear infinite;
    }
    .box div:nth-child(8){
        top: 32%;
        left: 25%;
        animation: animate 16s linear infinite;
    }
    .box div:nth-child(9){
        top: 90%;
        left: 25%;
        animation: animate 9s linear infinite;
    }
    .box div:nth-child(10){
        top: 20%;
        left: 80%;
        animation: animate 5s linear infinite;
    }

    @keyframes animate{
        0%{
            transform: scale(0) translateY(0) rotate(0);
            opacity: 1;
        }
        100%{
            transform: scale(1.3) translateY(-90px) rotate(360deg);
            opacity: 0;
        }
    }

    .parent{
        display: flex;
        position: relative;
        width: 100%;
        background-color: white;
        /* padding: 10px 10px 10px 30px;   */
        label{
            font-family: 'Acme', sans-serif;
            font-size: 34px;
        }
        label.Mname{
            color: #140005;
        }
        h3{
            color: #00203FFF;
            /* font-family: 'Rubik', sans-serif; */
            font-family: 'Josefin Sans', sans-serif;
            font-size: 21px;
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .fade{
            color: rgba(0,0,0,0.8);
            font-size: 26px;
        }
        .Mdata{
            font-family: 'Josefin Sans', sans-serif;
            color: #00203FFF;
        }
        .Down{
            margin-bottom: 10px;
        }

        .title{
            flex: 4;
        }
        .rating{
            flex: 1;
        }
        .both{
            width: 50%;
            float: left;
            padding: 20px;
        }
    }
    .Yt{
        padding: 20px 100px;
        position: relative;
        background-color: white;
    }
    .cmnt{
        padding: 20px 100px;
        position: relative;
        background-color: white;
    }
    .CmntLb{
        letter-spacing: 1px;
        font-family: 'Oswald', sans-serif;
        font-size: 26px;
        text-decoration: underline;
        font-weight: 900;
    }

`;

const StyledTextarea = styled.textarea.attrs({row:'50', cols:'40'})`
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #eee;
    display: block;
    padding: 10px 0 0 20px;
    margin: 20px 0 40px 0;
    width: 100%;
    min-height: 140px;
    resize: none;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Heebo', sans-serif;    

`;

const StyledButton = styled.button`

    right: 0;
    font-family: 'Heebo', sans-serif;    
    display:block;
    background-color: #020024;
    font-size: 1rem;
    border-radius: 5px;
    height: 40px;
    padding: 5px 20px;
    cursor: pointer;
    box-sizing:border-box;

    color: ${props => (props.primary ? 'violet' : '#00bfb6')};
    border: ${props =>
    props.primary ? '2px solid #040447' : '2px solid #00bfb6'};

&:hover {
    color: white;
    background-color: ${props =>
      props.primary ? '#040447' : '#00bfb6'};
  }
`;

const useStyles = makeStyles((theme) => ({

    showmore: {
        backgroundColor: '#020024',
        width: '100%',
        color: '#00bfb6',
        border: '2px solid #00bfb6', 

        '&:hover': {
            backgroundColor: "#00bfb6",
            color: '#fff',
        }
    }

}));


function MainMovie(props) {

    const classes = useStyles();
    const [Modal, setModal] = useState(false)
    const [Recom, setRecom] = useState([])

    const history = useHistory()

    const {id} = useParams() 
    const [Page, setPage] = useState(1)
//Use States

const [Mdata, setMdata] = useState({
    movieId:id,
    movieRate:"",
    movieName:"",
    moviePoster: null,
    movieLink: "",
    movieType: "",
    movieCast: "",
    movieBlurb: "",
    movieDr: "",
    moviePro:""
})
const CommentField = useRef()
const [Comments, setComments] = useState([])

const CommentAddHandler = async() =>{
    const comment = CommentField.current.value;
    console.log(comment);
    if(comment.length < 1)
    return console.log("Comment empty");
    const formdata = new FormData();
    formdata.append("comment", comment);
    formdata.append("token", localStorage.getItem('USER_TOKEN'));
    await Axios({
        method: 'POST',
        url: `http://localhost:5000/movies/${id}/comments/${Page}`,
        data: formdata
    }).then(res =>{
        console.log(res);
        MovieComments();
    })
}

const MovieComments = async()=>{
    await Axios({
        method: 'GET',
        url: `http://localhost:5000/movies/${id}/comments/${Page}`
    }).then(res =>{
        console.log(res);
        setComments(res.data)
    });
}



const ecom = async()=>{
    GetRecomData(setRecom, Mdata.movieName);
}

const GetRecomData = async(Movie,t) =>{
    try {
      const res = await Axios.get(`http://localhost:5000/recom/${t}`)
      console.log(res.data);
      Movie(res.data);
      return true;
    } catch (error) {
      return false;    
    }
    
  }

const DataDisplay = async()=>{
await fetch("http://localhost:5000/movieuser/"+id)
.then(res => res.json())
.then(
res => {
    setMdata({movieId:id,
    movieRate:res.Rate, 
    movieName:res.Title,
    moviePoster: res.Poster,
    movieLink: res.Link,
    movieType: res.Category,
    movieCast: res.Actor,
    movieBlurb: res.Blurb,
    movieDr: res.Director,
    moviePro: res.Producer,
   });
   console.log(res);
})
}

const LogInCheck = () =>{
    if(localStorage.getItem("USER_TOKEN") && localStorage.getItem("USER_NAME"))
    return true;
    return false;
}

const PlanVerifyHandler = async() =>{
    Axios.get("http://localhost:5000/users/verify/plan/"+localStorage.getItem("USER_TOKEN"))
    .then(res => 
        res.data.planActive? 
        "":
        setModal(true)
        )
}


useEffect(() => {
console.log("Page" +Page);
console.log("What :",id);
if(!LogInCheck()) 
return history.push("/user/signin");
DataDisplay();
MovieComments();
PlanVerifyHandler();
},[id, Page]);

useEffect(()=>{
    if(Mdata.movieName !== "")
ecom();
},[Mdata]);


    const PageXML = (
        <main style={{ marginTop: 0, paddingTop: 0}}>
            <Content>
                
                <div className="TopPush"></div>
                <Poster>
                        <img style={{borderRadius: '12px'}} src={Mdata.moviePoster!== null? `http://127.0.0.1:5000/get-file/MoviePoster/${Mdata.moviePoster}`: ""} height="510px" width="450px" alt={Mdata.Title} />                            
                </Poster>              
                <div className="parent">
                    <div className="title both">
                        <label className="Mname">{Mdata.movieName}</label>
                        <h3>{Mdata.movieBlurb}</h3>
                        <div className="Down">
                            <label className="fade">
                                Category :&ensp; <span className="Mdata" >{Mdata.movieType.toString()}</span>
                            </label>
                            
                        </div>
                        <div className="Down">
                            <label className="fade">
                               Directed By :&ensp; <span className="Mdata" >{Mdata.movieDr.toString()}</span>
                            </label>
                            
                        </div>
                        <div className="Down">
                            <label className="fade">
                                Staring :&ensp; <span className="Mdata" >{Mdata.movieCast.toString()}</span>
                            </label>
                            
                        </div>
                    </div>

                    <div className="rating both" 
                    style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <label>
                            <BsStarFill style={{ stroke: "black", strokeWidth: "1"}} size={25} color="yellow"/>
                            &nbsp;Rated&nbsp;{Mdata.movieRate}
                        </label>
                    </div>

                </div>
                <div className="Yt">
                    <iframe style={{margin:'0 auto'}} width="100%" height="750" src={Mdata.movieLink} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>

                    </iframe>
                    
                </div>
                {/* <form> */}
                <div className="cmnt">
                    <label className="CmntLb">Comment Here</label>
                    <div>
                    <StyledTextarea placeholder="Please Share Your Reviews" row={100} 
                    cols={100} type="text" name="movieblurb" ref={CommentField}>

                    </StyledTextarea>
                    <StyledButton onClick={CommentAddHandler} type="submit">Comment</StyledButton>
                    </div>
                    <div className="CardList" style={{display:'flex', flexDirection: 'column', margin:"2rem 0", background: 'grey'}}>
                   {Comments?.map((comment)=>(
                        <CommentCard Comment = {comment} />
                   ))}
                
                    </div>
                    <Button
                        className={classes.showmore}
                        variant="contained"
                        color="default"
                        disabled={Page*5 === Comments.length?false:true}
                        onClick={()=> setPage(Page+1)}
                        startIcon={<ArrowDropDownIcon />}
                    >
                        Show More
                    </Button> 
                </div>
                
                <div style={{margin: '2.5rem auto'}}>
                    <div style={{margin: '2rem 4rem'}}>
                        <h1 style={{color:'#fff'}}>
                        You May Like !
                        </h1>  
                    </div>
                    <Carosuel SlideData={Recom} />
                </div>
                {/* </form> */}
                
            </Content>
            </main>
    )

    
    return (
            <>
                { Modal?
                (<main><CustomModal icon="fail" text="No Plan Activate" onClose={()=>{
                    setModal(false);
                    history.push("/user/profile")
                }} /></main>)
                :
                PageXML
                }
            </>
    )
}

export default MainMovie;
