import React, { useState, useEffect } from 'react';
import styled, { css }  from "styled-components";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import CustomModal from '../../../Module/Modal/CustomModal';


const sharedStyles = css`
    background-color: #eee;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin:10px 0;
    padding: 20px;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Heebo', sans-serif;
`;
const StyledFormWrapper = styled.div`
    margin: 0 0 40px 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`;
const StyledForm = styled.form`

    margin:40px 30px;
    font-family: 'Heebo', sans-serif;
    width: 100%;
    max-width: 700px;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

    .Up{
        padding-top: 20px;
    }
    h2 {
        text-transform: uppercase;
        font-family: 'Fugaz One', cursive;
        text-align: center;
        color: black;
        font-size: 29px;
    }
    .movieposter{
        margin: 20px 0;
    }
    label.fontsize {
        letter-spacing: 1px;
        font-family: 'Oswald', sans-serif;
        font-size: 24px;
        font-weight: 900;
    }
    label.top {
        margin-top: 20px;
    }
    label.down{
        padding-bottom: 10px;
    }
    label.shift{
        text-align: center;
    }
    .multiselect{
        margin: 10px 0;
        font-size: 18px;
        font-weight: 500;
        font-family: 'Heebo', sans-serif;
        height: 40px;
    }
`;

const Finput = styled.input.attrs({ type: 'file' })`
        display: block;
        width: 100%;
        font-size: 20px;
        position: relative;
        margin:10px 0;
        text-align: center;
        font-family: 'Heebo', sans-serif;    
`;

const StyledInput = styled.input`
    display:block;
    width: 100%;
    ${sharedStyles}
`;
const StyledButton = styled.button`

    font-family: 'Heebo', sans-serif;    
    display:block;
    width: 100%;
    background-color: #020024;
    font-size: 1rem;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
    margin: 30px 0 0 0;
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

// const StyledFieldset = styled.fieldset`
//     border: 1px solid #ddd;
//     border-radius: 5px;
//     padding: 10px;
//     margin: 20px 0;

//     legend {
//         padding: 0 10px;
//     }
//     label {
//         font-family: 'Oswald', sans-serif;
//         font-size: 18px;
//     }
//     input {
//         margin-right: 10px;
//     }

// `;

// const StyledError = styled.div`
//     color: red;
//     font-weight: 800;
//     margin: 0 0 40px 0;

// `;

const StyledTextarea = styled.textarea.attrs({row:'50', cols:'40'})`
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #eee;
    display: block;
    padding: 10px 0 0 20px;
    margin: 10px 0 40px 0;
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Heebo', sans-serif;    

`;



function AddMovie2() {

    const LoginCheck =()=>{
        if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
        return true;
    }
    
    const [Modal, setModal] = useState(false)
    const [Movie, SetMovie] = useState({
        movieName:"",
        moviePoster: null,
        movieLink: "",
        movieType: "",
        movieCast: "",
        movieBlurb: "",
        movieDr: ""
    });

    const[Actor, SetActor] = useState();
    const[Director, SetDirector] = useState();
    const[Genres, SetGenres] = useState();

    const MovieSubmitHandler = async(e) =>{
        e.preventDefault();
        console.log(Movie)
        const boxes = document.querySelectorAll('.category');
        let Categoryselector= "";
        boxes.forEach((e)=>{
            if( e.Select){
                Categoryselector += e.target.value+','
            }
        })
        console.log(Categoryselector)
        const newMovie = new FormData();
        newMovie.append('Name', Movie.movieName);
        newMovie.append('Poster', Movie.moviePoster);
        newMovie.append('Link', Movie.movieLink);
        newMovie.append('Type', Movie.movieType);
        newMovie.append('Cast', Movie.movieCast);
        newMovie.append('Dr', Movie.movieDr);
        newMovie.append('Blurb', Movie.movieBlurb);
        const res = await Axios({
            url: `http://127.0.0.1:5000/movie`, 
            data: newMovie,
            method:'POST',
            headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(res);
        setModal(true);
    }

    useEffect(() => {
        LoginCheck();
    },[Movie])
    

    useEffect(() => {
        fetch("http://localhost:5000/casts")
          .then(res => res.json())
          .then(
            (result1) => {
              SetActor(result1);
            }
          )
      }, []);

    useEffect(() => {
        fetch("http://localhost:5000/directors")
          .then(res => res.json())
          .then(
            (result2) => {
              SetDirector(result2);
            }
          )
      }, []);


    useEffect(() => {
        fetch("http://localhost:5000/categories")
          .then(res => res.json())
          .then(
            (result4) => {
              SetGenres(result4);
            }
          )
      }, []);

    function customTheme(theme){
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#00bfb6',
                primary: '#020024',
            },
        };
    }

    const page = (
        <StyledFormWrapper>
            <StyledForm  onSubmit={MovieSubmitHandler}>
            <h2>Add New Movie</h2>
            <label className="fontsize" htmlFor="moviename">Name</label>
            <StyledInput required placeholder="Enter Movie Name" type="text"  onChange={(e) => SetMovie({...Movie, movieName: e.target.value})} name="moviename" />

            <label className="fontsize" htmlFor="movieposter">Poster</label>
              
            <div>
            <Finput required type="file" onChange={e => SetMovie({...Movie, moviePoster: e.target.files[0]})} accept="image/*" />
            </div>
            
            
            <label className="movielink fontsize" htmlFor="movielink">Link</label>
            <StyledInput required placeholder="Movie URL" type="text" onChange={(e) => SetMovie({...Movie, movieLink: e.target.value})} name="movielink" />
            
            
            <label className="fontsize down" htmlFor="moviecategory">Category</label>
            <Select
                className="multiselect" 
                components={makeAnimated()}
                options={Genres}
                theme={customTheme}
                
                placeholder="Select Category Name"
                noOptionsMessage={()=>"No Other Option :("}
                
                onChange={(selectedOption) => {
                    selectedOption.map(item =>item.value)
                    SetMovie({...Movie, movieType: selectedOption.map(item =>item.value).toString()})
                    console.log(`Category selected:`, selectedOption.map(item =>item.value).toString());
                  }}
                isSearchable
                isMulti
                
            />

            <label className="fontsize top" htmlFor="moviecast">Cast</label>
            <Select
                className="multiselect" 
                components={makeAnimated()}
                options={Actor}
                theme={customTheme}
                placeholder="Select Cast Name"
                noOptionsMessage={()=>"No Other Option :("}
                onChange={(selectedOption) => {
                    selectedOption.map(item =>item.value)
                    SetMovie({...Movie, movieCast: selectedOption.map(item =>item.value).toString()})
                    console.log(`Cast selected:`, selectedOption.map(item =>item.value).toString());
                  }}
                
                isSearchable
                isMulti
                
            />
           
            <label className="fontsize" htmlFor="moviecast">Director</label>
            <Select 
                className="multiselect"
                components={makeAnimated()}
                options={Director}
                theme={customTheme}
                placeholder="Select Director Name"
                noOptionsMessage={()=>"No Other Option :("}
                onChange={(selectedOption) => {
                    selectedOption.map(item =>item.value)
                    SetMovie({...Movie, movieDr: selectedOption.map(item =>item.value).toString()})
                    console.log(`Director selected:`, selectedOption.map(item =>item.value).toString());
                  }}
                isSearchable
                isMulti
                
            />
            
            <label className="fontsize Up" htmlFor="movieblurb">Blurb</label>
            <StyledTextarea required placeholder="Movie Brief Here" row={100} cols={100} type="text"  onChange={(e) => SetMovie({...Movie, movieBlurb: e.target.value})} name="movieblurb"></StyledTextarea>
            
            {/* <StyledError><p>Error message Here</p></StyledError> */}
            <StyledButton type="submit">Add Movie</StyledButton>       
            </StyledForm>
        </StyledFormWrapper>
    )
    

    return (
        <>
            {Modal?
            (<CustomModal 
                open={Modal}
                text="Successfully Inserted"
                icon="success"
                onClose={() => setModal(false)}
            />)
            :
            page
            }
        </>

    );
}

export default AddMovie2;
