import React, { useState, useEffect } from 'react';
import styled, { css }  from "styled-components";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import {useParams} from 'react-router-dom'
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
// const sharedStyles = css`
//     background-color: #eee;
//     height: 40px;
//     border-radius: 5px;
//     border: 1px solid #ddd;
//     margin:10px 0 20px 0;
//     padding: 20px;
//     box-sizing: border-box;
// `;
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

const StyledError = styled.div`
    color: red;
    font-weight: 800;
    margin: 0 0 40px 0;

`;

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




function EditMovie() {

    // Login Check

    const LoginCheck =()=>{
        if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
        return true;
    }

    // Id of movie from url
    
    const {id} = useParams()
    console.log(id);
    //  Setting useStates 

    const [Modal, setModal] = useState(false)
    const[Actor, SetActor] = useState();
    const[Director, SetDirector] = useState();
    const[Genres, SetGenres] = useState();
    const [Movie, SetMovie] = useState({
        movieId:id,
        movieName:"",
        moviePoster: null,
        movieLink: "",
        movieType: "",
        movieCast: "",
        movieBlurb: "",
        movieDr: ""
    });

     //Fetching and Storing in State 
    const LocalData =async()=>{
        await fetch("http://localhost:5000/casts")
         .then(res => res.json())
         .then(
           (result1) => {
             SetActor(result1);
           }
         )
 
        await fetch("http://localhost:5000/directors")
           .then(res => res.json())
           .then(
             (result2) => {
               SetDirector(result2);
             }
           )
 
          await fetch("http://localhost:5000/categories")
           .then(res => res.json())
           .then(
             (result4) => {
               SetGenres(result4);
             }
           )
     }

     //UseEffects
     
     useEffect(() => {
        LocalData();
        LoginCheck();
      }, []);

    useEffect(() => {
        FetchData();
      }, [Genres, Actor, Director]);


     const FetchData = async()=>{
        // console.log(props.match.params.id);

        await fetch("http://localhost:5000/movie/"+Movie.movieId)
        .then(res => res.json())
        .then(
        res => {
            SetMovie({movieId:id,
            movieName:res.Title,
            moviePoster: res.Poster,
            movieLink: res.Link,
            movieType: Gen2(res.Category, Genres),
            movieCast: Gen2(res.Actor, Actor),
            movieBlurb: res.Blurb,
            movieDr: Gen2(res.Director, Director)
            });
            console.log("Helo",res);
            // console.log(MovieId());
        }
     
    )
 
}



    //Function to convert string to array  
    function Gen2(arr, gen){
        let iodex=[];               
        if(gen != null){
            if(arr.length > 0){
            arr.forEach((d)=>{
                gen.forEach((names)=>{
                    if (names.label === d) {
                        iodex.push({
                            value:names.value,
                            label:names.label
                        })        
                    }
                });
            })
            }
        }
        return iodex
    }

   // Submit Handler
    const MovieSubmitHandler = async(e) =>{
        e.preventDefault();
        // console.log("Before"+ Movie)
        const boxes = document.querySelectorAll('.category');
        let Categoryselector= "";
        boxes.forEach((e)=>{
            if( e.Select){
                Categoryselector += e.target.value+','
            }
        })
        console.log(Categoryselector)
        const newMovie = new FormData();
        newMovie.append('Id',Movie.movieId);
        newMovie.append('Name', Movie.movieName);
        newMovie.append('Poster', Movie.moviePoster);
        newMovie.append('Link', Movie.movieLink);
        newMovie.append('Type', Movie.movieType.map(e => e.value).toString());
        newMovie.append('Cast', Movie.movieCast.map(e => e.value).toString());
        newMovie.append('Dr', Movie.movieDr.map(e => e.value).toString());
        newMovie.append('Blurb', Movie.movieBlurb);
        console.log(Movie)
        const res = await Axios({
            url: `http://127.0.0.1:5000/movieupdate`, 
            data: newMovie,
            method:'POST',
            headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(res);
        setModal(true);
    }
    


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
            <h2>Edit Movie</h2>
            <label className="fontsize" htmlFor="moviename">Name</label>
            <StyledInput required placeholder="Enter Movie Name" type="text" value={Movie.movieName} onChange={(e) => SetMovie({...Movie, movieName: e.target.value})} name="moviename" />

            <label className="movieposter fontsize" htmlFor="movieposter">Poster</label>
              
            <div>
            <Finput required type="file" onChange={e => SetMovie({...Movie, moviePoster: e.target.files[0]})} accept="image/*" />
            </div>
            
            
            <label className="movielink fontsize" htmlFor="movielink">Link</label>
            <StyledInput required placeholder="Movie URL" value={Movie.movieLink} type="text" onChange={(e) => SetMovie({...Movie, movieLink: e.target.value})} name="movielink" />
            

            
            <label className="fontsize down" htmlFor="moviecategory">Category</label>
            <Select 
                className="multiselect"
                components={makeAnimated()}
                options={Genres}
                value={Movie.movieType}
                theme={customTheme}
                placeholder="Select Category Name"
                noOptionsMessage={()=>"No Other Option :("}
                onChange={(e) => {
                    if(!e)
                    return SetMovie({...Movie, movieType: []});
                    const data = e.map(i=> ({label: i.label, value: i.value}))
                    console.log(data);
                    SetMovie({...Movie, movieType: data});

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
                value={Movie.movieCast}
                placeholder="Select Cast Name"
                noOptionsMessage={()=>"No Other Option :("}
                onChange={(e) => {
                    if(!e)
                    return SetMovie({...Movie, movieCast: []});
                    const data = e.map(i=> ({label: i.label, value: i.value}))
                    console.log(data);
                    SetMovie({...Movie, movieCast: data});

                  }}
                isSearchable
                isMulti
                
            />


            <label className="fontsize" htmlFor="moviecast">Directors</label>
            <Select 
                className="multiselect"
                components={makeAnimated()}
                options={Director}
                theme={customTheme}
                value={Movie.movieDr}
                placeholder="Select Director Name"
                noOptionsMessage={()=>"No Other Option :("}
                onChange={(e) => {
                    if(!e)
                    return SetMovie({...Movie, movieDr: []});
                    const data = e.map(i=> ({label: i.label, value: i.value}))
                    console.log(data);
                    SetMovie({...Movie, movieDr: data});

                  }}
                isSearchable
                isMulti
                
            />

            <label className="fontsize Up" htmlFor="movieblurb">Blurb</label>
            <StyledTextarea required value={Movie.movieBlurb} placeholder="Movie Brief Here" row={100} cols={100} type="text"  onChange={(e) => SetMovie({...Movie, movieBlurb: e.target.value})} name="movieblurb"></StyledTextarea>
            
            {/* <StyledError><p>Error message Here</p></StyledError> */}
            <StyledButton type="submit">UPDATE</StyledButton>       
            </StyledForm>
        </StyledFormWrapper>
    )
    
    
    return (
        <>
            {Modal?
            (<CustomModal 
                open={Modal}
                text="Successfully Updated"
                icon="update"
                onClose={() => setModal(false)}
            />)
            :
            page
            }
        </>
    );
}

export default EditMovie;
