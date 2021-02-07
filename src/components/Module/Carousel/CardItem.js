import React, { useEffect } from 'react';
import {BsStarFill} from 'react-icons/bs';
import {
  Card,
  CardActionArea,
  // CardActions,
  CardContent,
  CardMedia,
  // Button,
  Typography,
  // Icon,
} from '@material-ui/core';
import Logo from './logo.svg'
import { loadCSS } from 'fg-loadcss';
import { CaroStyles } from './Styles'
import { Link } from 'react-router-dom';



function CardItem({Data}) {
  const classes = CaroStyles();
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
    console.log(Data)
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <Link style={{textDecoration: 'none'}} to={"/movie/" + Data.Id} >
    <Card key={Data.Id} className={classes.root} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Data.Poster ? `http://localhost:5000/get-file/MoviePoster/${Data.Poster}` : Logo}
          title="Contemplative Reptile"
        />
        <CardContent style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>

          <Typography className={classes.movieName} style={{textAlign: 'left'}} variant="subtitle1" gutterBottom>
            {Data.Title}
          </Typography>
          <Typography className={classes.movieName} variant="subtitle1" gutterBottom>
            
            <BsStarFill style={{ stroke: "black", strokeWidth: "1"}} color="yellow"/>
            {Data.Rate? Data.Rate: "0.0"}
          </Typography>
          {/* <Typography  variant="body2" color="textSecondary" component="p">
            {data.discription}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

export default CardItem;
