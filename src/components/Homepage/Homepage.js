import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { motion } from "framer-motion";

import Carosuel from '../Module/Carousel/Carosuel';
import { Typography } from '@material-ui/core';
import Axios from 'axios'; 
import {HomeStyles} from './Style'


const MovieData = [{
  Id: 0,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
},{
  Id: 1,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
},{
  Id: 2,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
},{
  Id: 3,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
},{
  Id: 4,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
},{
  Id: 5,
  Title: "React",
  discription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
}]


function Homepage({LoginUser}) {
  const classes = HomeStyles()
  const [DramaMovieData, setDramaMovieData] = useState([]);
  const [HorrorMovieData, setHorrorMovieData] = useState([]);
  const [ComedyMovieData, setComedyMovieData] = useState([]);
  const [ActionMovieData, setActionMovieData] = useState([]);

  const GetMovieData = async(Movie,type) =>{
    try {
      const res = await Axios.get(`http://localhost:5000/searchcat/${type}`)
      console.log(res.data)
      console.log(MovieData);
      Movie(res.data);
      return true;
    } catch (error) {
      return false;    
    }
    
  }
  useEffect(() => {
      
      GetMovieData(setActionMovieData,'Action');
      GetMovieData(setComedyMovieData,'Comedies');
      GetMovieData(setHorrorMovieData,'Horror');
      GetMovieData(setDramaMovieData,'Drama');
      // console.log()
  },[])
  return (
    <main>
      <div className={classes.banner}>
        <div className="header center">
          <h1>Watch Unlimited Movies, Shows and many more</h1>
        </div>
        <div className="normal center">
          <h3>Watch your favorite movies and shows anywhere anytime anyplace </h3>
        </div>
        <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
          <div className={("center", classes.getStarted)}>
            <Link to={LoginUser?"/movie":'/user/signup'} className={classes.getStartedBtn}>GET STARTED</Link>
          </div>
        </motion.div>

      </div>
      <div className={classes.slider}>
        <div className={classes.sliderHeader}>
        <Typography variant="h4" component="h2">
             Action Movies
        </Typography>
        </div>
        <Carosuel SlideData={ActionMovieData}  />
      </div>
      <div className={classes.slider}>
        <div className={classes.sliderHeader}>
        <Typography variant="h4" component="h2">
            Comedy Movies
        </Typography>
        </div>
        <Carosuel SlideData={ComedyMovieData}  />
      </div>
      <div className={classes.slider}>
        <div className={classes.sliderHeader}>
        <Typography variant="h4" component="h2">
             Horror Movies
        </Typography>
        </div>
        <Carosuel SlideData={HorrorMovieData}  />
      </div>
      <div className={classes.slider}>
        <div className={classes.sliderHeader}>
        <Typography variant="h4" component="h2">
             Drama Movies
        </Typography>
        </div>
        <Carosuel SlideData={DramaMovieData}  />
      </div>
    </main>
  )
}

export default Homepage
