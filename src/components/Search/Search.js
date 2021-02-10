import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsStarFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

const Card = styled.div`

    position: relative;
    margin: 110px 20px 110px 50px;
    float: left;
    height: 450px;
    width: 340px;
    background-color: white;
    border-radius: 8px;
    .left{
        margin: 0 13px;
        text-align: left;
    }
    span{
        padding-top: -10px;
    }
    .lol{
        margin-left: 10px;
    }
    .Down{
        width: 100%;
        position: absolute; 
        bottom: 0px; 
    }
`;

const Img = styled.div`
    height: 280px;
    margin: 5px;
    border-radius: 8px 8px 0 0;
`;

const Mlabel = styled.label`
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    color: black;

`;

const StyledButton = styled.button`

    font-family: 'Heebo', sans-serif;    
    display:block;
    width: 90%;
    background-color: #020024;
    font-size: 1rem;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
    margin: 10px 20px 20px 15px;
    cursor: pointer;
    text-decoration:none;
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


function Search(props) {

    const { query } = useParams();
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/movie/search/" + query)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    setItems(result);
                })
            .catch(e => setItems([]))

    });

    const Film = () => items.length == 0 ?
        (<h1 style={{ color: "#eee", fontSize: 28 }}>Movie Not found</h1>) :
        items.map((data) => {
            return (
                <Card>
                    <Img>
                        <img style={{ borderRadius: '8px 8px 0 0' }} src={data.Poster != null ? `http://127.0.0.1:5000/get-file/MoviePoster/${data.Poster}` : ""} height="280px" width="330px" alt={data.Title} />
                    </Img>
                    <div className="left">
                        <Mlabel>{data.Title}</Mlabel>
                    </div>
                    <div>
                        <div className="lol">
                            <BsStarFill style={{ stroke: "black", strokeWidth: "1" }} size={17} color="yellow" />
                            <span style={{ paddingTop: 0, fontSize: 24 }}>{data.Rate}</span>
                        </div>
                        <div className="Down">
                            <a style={{ textDecoration: 'none' }} href={"../../movie/" + data.Id}><StyledButton >Watch</StyledButton></a>
                        </div>
                    </div>

                </Card>
            );

        });

    return (
        <main>
            <div>{Film()}</div>
        </main>
    )
}

export default Search;
