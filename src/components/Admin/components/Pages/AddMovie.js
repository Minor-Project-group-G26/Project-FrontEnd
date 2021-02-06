import React, { useState, useEffect } from 'react';
import styled, { css }  from "styled-components";
import Multiselect from 'multiselect-react-dropdown';
import Axios from 'axios';

// function addClass() { 
//     var v = document.getElementById("mobile"); 
//     v.className.append("col-sm-4");
// } 

const sharedStyles = css`
    background-color: #eee;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin:10px 0 20px 0;
    padding: 20px;
    box-sizing: border-box;
`;
const StyledFormWrapper = styled.div`
    margin: 0 0 40px 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;

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

    h2 {
        text-transform: uppercase;
        font-family: 'Fugaz One', cursive;
        text-align: center;
        color: black;
    }
    .movieposter{
        padding-bottom:10px;
    }
    label.fontsize {
        font-size: 20px;
    }
    legend{
        font-size: 18px;
    }

`;

const Finput = styled.input.attrs({ type: 'file' })`
        display: block;
        width: 100%;
        font-size: 17px;
        position: relative;
        margin-bottom:20px;
        font-family: 'Heebo', sans-serif;    
`;

const StyledInput = styled.input`
    display:block;
    width: 100%;
    ${sharedStyles}
`;
const StyledButton = styled.button`
    display:block;
    width: 100%;
    background-color: #020024;
    font-size: 1rem;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
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
const StyledFieldset = styled.fieldset`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin: 20px 0;

    legend {
        padding: 0 10px;
    }
    label {
        font-family: 'Oswald', sans-serif;
        font-size: 18px;
    }
    input {
        margin-right: 10px;
    }


`;
const StyledError = styled.div`
    color: red;
    font-weight: 800;
    margin: 0 0 40px 0;

`;

const StyledTextarea = styled.textarea.attrs({row:'50', cols:'40'})`
    background-color: #eee;
    width: 100%;
    min-height: 100px;
    resize: none;
    ${sharedStyles}
`;


function AddMovie() {
    
    const [Movie, SetMovie] = useState({
        movieName:"",
        moviePoster: null,
        movieLink: "",
        movieType: "",
        movieCast: "",
        movieBlurb: "",
        movieDr: "",
        moviePro: ""
    });

    const dba = [
        {Country :'India',id:1},
        {Country :'Pakistan',id:2},
        {Country :'Sri lanka',id:3},
        {Country :'Bangladesh',id:4},
        {Country :'Afganistan',id:5}
    ];
    

    const MovieSubmitHandler = async(e) =>{
        e.preventDefault();
        console.log(Movie)
        const boxes = document.querySelectorAll('.category');
        let Categoryselector= "";
        boxes.forEach((e)=>{
            if( e.checked){
                Categoryselector += e.value+','
            }
        })
        console.log(Categoryselector)
        const newMovie = new FormData();
        newMovie.append('Name', Movie.movieName);
        newMovie.append('Poster', Movie.moviePoster);
        newMovie.append('Link', Movie.movieLink);
        newMovie.append('Type', Categoryselector);
        newMovie.append('Cast', Movie.movieCast);
        newMovie.append('Dr', Movie.movieDr);
        newMovie.append('Pro', Movie.moviePro);
        newMovie.append('Blurb', Movie.movieBlurb);
        const res = await Axios({
            url: `http://127.0.0.1:5000/movie`, 
            data: newMovie,
            method:'POST',
            headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(res);
    }

    useEffect(() => {
        
    },[Movie])
    return (
        <>
        <StyledFormWrapper onSubmit={MovieSubmitHandler}>
            <StyledForm>
            <h2>Add New Movie</h2>
            <label className="fontsize" htmlFor="moviename">Name</label>
            <StyledInput placeholder="Enter Movie Name" type="text"  onChange={(e) => SetMovie({...Movie, movieName: e.target.value})} name="moviename" />

            <label className="movieposter fontsize" htmlFor="movieposter">Poster</label>
              
            <div>
            <Finput type="file" onChange={e => SetMovie({...Movie, moviePoster: e.target.files[0]})} accept="image/*" />
            </div>
            
            
            <label className="movielink fontsize" htmlFor="movielink">Link</label>
            <StyledInput placeholder="Movie URL" type="text" onChange={(e) => SetMovie({...Movie, movieLink: e.target.value})} name="movielink" />
            

            
            <label className="fontsize" htmlFor="moviecategory">Category</label>    
            <StyledFieldset>
                <legend>Choose From Here</legend>
            <div className='row'>
                <div id="mobile" className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="1" name="category" />
                Action
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="2" name="category" />
                Comedy
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="3" name="category" />
                Drama
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="4" name="category" />
                Fantasy
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="5" name="category" />
                Horror
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="6" name="category" />
                Mystery
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="7" name="category" />
                Romance
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="8" name="category" />
                Thriller
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="9" name="category" />
                Western
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="10" name="category" />
                Adventure
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="11" name="category" />
                Animation
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="12" name="category" />
                Crime
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="13" name="category" />
                Experimental
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="14" name="category" />
                Historical
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="15" name="category" />
                Science Fiction
                </label>
                </div>
                <div className='col col-md-3'>
                <label>
                <input className='category' type="checkbox" value="16" name="category" />
                Others
                </label>
                </div>
            </div>    
                
            </StyledFieldset>
            <label className="fontsize" htmlFor="moviecast">Cast</label>
            <StyledTextarea placeholder="Input Each Cast Name Separated By Comma(,) " row={100} cols={100} type="text"  onChange={(e) => SetMovie({...Movie, movieCast: e.target.value})} name="moviecast"></StyledTextarea>

           <div className='row'>

           <div className='col col-sm-6 col-xs-12'>
            <label className="fontsize" htmlFor="moviecast">Directors</label>
            <StyledInput placeholder="Seperate Each Name By Comma(,)" type="text"  onChange={(e) => SetMovie({...Movie, movieDr: e.target.value})} name="movieDr" />
            </div>

            <div  className='col col-md-6 col-sm-12'>
            <label className="fontsize" htmlFor="movieDipro">Producers</label>
            <StyledInput placeholder="Seperate Each Name By Comma(,)" type="text"  onChange={(e) => SetMovie({...Movie, moviePro: e.target.value})} name="moviePro" />
            </div>
           </div>


            <label className="fontsize" htmlFor="movieblurb">Blurb</label>
            <StyledTextarea placeholder="Movie Brief Here" row={100} cols={100} type="text"  onChange={(e) => SetMovie({...Movie, movieBlurb: e.target.value})} name="movieblurb"></StyledTextarea>
            
            <StyledError><p>Error message Here</p></StyledError>
            <StyledButton type="submit">Add Movie</StyledButton>       
        </StyledForm>
        </StyledFormWrapper>
        </>
    );
}

export default AddMovie;
