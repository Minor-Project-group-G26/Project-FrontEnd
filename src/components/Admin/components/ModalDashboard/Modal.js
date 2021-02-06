import React,{useRef,useEffect,useCallback, useState} from 'react';
import { useSpring,animated  } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import VisibilityIcon from '@material-ui/icons/Visibility';

const Background = styled.div`
width:100%;
height:100%;
z-index: 10000;
position:relative;
display:flex;
justify-content:center;
align-items:center;
`;

const ModalWrapper = styled.div`

width:800px;
height:500px;
box-shadow:0 5px 16px rgba(0,0,0,0.2);
background:#fff;
color:#000;
display:flex;
/* grid-template-columns:1fr 1fr; */
position:absolute;
left: -800px;
top: 16px;
z-index:1000;
border-radius:10px 0 0 10px;


`;

const ModalContent = styled.div`
position: relative;

max-width: 500px;
text-align: left;
margin: 29px 10px 10px 10px;
padding: 0;
color:#141414;

span{
    word-wrap: break-word;
}

label{
    padding: 19px 0 40px 10px;
    font-size: 25px;
    font-weight: 900;
}

p{
    position: relative;
    color: blue;
    word-wrap: break-word;
}

p.details{  
    cursor: context-menu;
    margin-right: 3rem;
    font-size: 20px;
    padding: 60px 0 25px 10px;
}
p.down{
    font-size: 20px;
    padding-top: 25px;
    padding-left: 10px;
    padding-bottom: 25px;
}
p.FONT{
    font-family: 'Heebo', sans-serif;
}
button{
    padding:10px 24px;
    background:blue;
    color:#fff;
    border:none;
    border-radius:6px;
}
`;

const CloseModalButton = styled(MdClose)`
cursor:pointer;
position:absolute;
top:20px;
right:20px;
width:32px;
height:32px;
z-index:10000;
`;

function Modal( {showModalData} ) {
   
    const [showModal,setShowModal] =  useState(false)
    const [Data, setData] =  useState(null)

    const modalRef = useRef();

    const animation = useSpring({
        config:{
            duration:250
        },
        opacity:showModal?1:0,
        transform:showModal?`translateY(0%)`:`translateY(-100%)`
    });

    const closeModal = e =>{
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    };

    const keyPress = useCallback(e=>{
        if(e.key === 'Escape'&& showModal){
            setShowModal(false);
        }
    },[showModal]);
    useEffect(()=>{
        setData(showModalData);
        console.log("Data",Data);
        console.log("ShowModal",showModalData);
document.addEventListener('keydown',keyPress);
return()=>document.removeEventListener('keydown',keyPress);
        
    },[keyPress]);

    const openModal=(e)=>{
        setShowModal(prev=>!prev);
        
    }

    return (
        <>
        <button style={{background:'white', borderRadius:'5px'}} onClick={openModal} > <VisibilityIcon /> </button>
        
          {showModal?(
              <Background ref={modalRef} onClick={closeModal}>
                  <animated.div style={animation}>
                  <ModalWrapper showModal={showModal}>
                      {/* <ModalImg src={require('./Admin.jpg')} alt="Image"/> */}
                        <div>
                            <img alt="Poster" style={{borderRadius:"10px 0 0 10px"}} src={Data.Poster!= null? `http://127.0.0.1:5000/get-file/MoviePoster/${Data.Poster}`: ""} height={"500px"} width={"300px"}/>
                        </div>
                        <ModalContent>
                            <label>Movie Details</label>
                            <p className="details FONT">Link :-{Data.Link}</p>
                            <p className="down FONT">Actor :-{Data.Actor}</p>
                            <p className="down FONT">Directors :-{Data.Director}</p>
                            {/* <p className="down FONT">Producers :-<span> {Data.Producer.toString()} </span></p> */}
                            
                        </ModalContent>
                        <CloseModalButton aria-label='Close modal' onClick={()=>setShowModal(prev=>!prev)} /> 
                  </ModalWrapper>
                  </animated.div>
              </Background>
          ):null}
        </>
    );
}

export default Modal;
