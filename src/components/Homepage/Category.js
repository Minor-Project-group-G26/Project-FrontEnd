import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Carosuel from '../Module/Carousel/Carosuel'
import { Typography, makeStyles } from '@material-ui/core'
import { HomeStyles } from './Style'
import Axios from 'axios'; 
const useStyles = makeStyles(theme =>({
    slider:{
        marginTop: '4rem',
    },
    slideLink:{
        marginLeft: '2rem',
    },
    linkBtn:{
        color: '#eee',
        padding: '0.75rem 2rem',
        fontSize: '24px',
        textDecoration: 'none',
        fontWeight: 600,
        fontFamily: 'Roboto',
        letterSpacing: '2px',
        background:'#b40303',
        transition: 'all 0.5s ease',
        border: 'transparent',
        borderRadius: '10px',
        '&:hover':{
            background: '#8b0606',
        }
    }
}))


function Category() {
    const classes = useStyles()
    const homeStyle = HomeStyles()

    const [ActionMovieData, setActionMovieData] = useState([]);
    const [DramasMovieData, setDramasMovieData] = useState([]);
    const [ComediesMovieData, setComediesMovieData] = useState([]);
    const [FantasyMovieData, setFantasyMovieData] = useState([]);
    const [HorrorMovieData, setHorrorMovieData] = useState([]);
    const [MusicMovieData, setMusicMovieData] = useState([]);
    const [RomanceMovieData, setRomanceMovieData] = useState([]);
    const [ThrillerMovieData, setThrillerMovieData] = useState([]);
    const [DocumentariesMovieData, setDocumentariesMovieData] = useState([])
    const [AdventureMovieData, setAdventureMovieData] = useState([]);
    const [AnimeMovieData, setAnimeMovieData] = useState([]);
    const [FaithMovieData, setFaithMovieData] = useState([]);
    const [SportsMovieData, setSportsMovieData] = useState([]);
    const [SciFiMovieData, setSciFiMovieData] = useState([]);
    const [ChildrenMovieData, setChildrenMovieData] = useState([]);
    const [FamilyMovieData, setFamilyMoviesData] = useState([]);
    const [StandUpMovieData, setStandUpMovieData] = useState([]);
    const [InternationalMovieData, setInternationalMovieData] = useState([]);
    const [CultMovieData, setCultMovieData] = useState([]);
    const [IndependentMovieData, setIndependentMovieData] = useState([]);
    const [SpiritualityMovieData, setSpiritualityMovieData] = useState([]);
    const [LGBTQMovieData, setLGBTQMovieData] = useState([]);
    const [ClassicMovieData, setClassicMovieData] = useState([]);

  const GetMovieData = async(Movie,type) =>{
    try {
      const res = await Axios.get(`http://localhost:5000/searchcat/${type}`)
      console.log(res.data);
      Movie(res.data);
      return true;
    } catch (error) {
      return false;    
    }
    
  }
  useEffect(() => {
    console.log("Action")
    GetMovieData(setActionMovieData,'Action');
    console.log("Drama")
    GetMovieData(setDramasMovieData,'Drama');
    console.log("Comedies")
    GetMovieData(setComediesMovieData,'Comedies');
    console.log("Fantasy")
    GetMovieData(setFantasyMovieData,'Fantasy');
    console.log("Horror")
    GetMovieData(setHorrorMovieData,'Horror');
    console.log("Music")
    GetMovieData(setMusicMovieData,'Music');
    console.log("Romance")
    GetMovieData(setRomanceMovieData,'Romantic');
    console.log("Thriller")
    GetMovieData(setThrillerMovieData,'Thriller');
    console.log("Documentaries")
    GetMovieData(setDocumentariesMovieData,'Documentaries');
    console.log("Adventure")
    GetMovieData(setAdventureMovieData,'Adventure');
    console.log("Anime")
    GetMovieData(setAnimeMovieData,'Anime');
    console.log("Faith")
    GetMovieData(setFaithMovieData,'Faith');
    console.log("Sports")
    GetMovieData(setSportsMovieData,'Sports');
    console.log("Sci-fi")
    GetMovieData(setSciFiMovieData,'Sci-Fi');
    console.log("Children")
    GetMovieData(setChildrenMovieData,'Children');
    console.log("FAMILY")
    GetMovieData(setFamilyMoviesData,'Family');
    console.log("STAND")
    GetMovieData(setStandUpMovieData,'Stand-Up');
    console.log("INTERNATIONAL")
    GetMovieData(setInternationalMovieData,'International');
    console.log("CULT")
    GetMovieData(setCultMovieData,'Cult');
    console.log("INDI")
    GetMovieData(setIndependentMovieData,'Independent');
    console.log("SPIRIT")
    GetMovieData(setSpiritualityMovieData,'Spirituality');
    console.log("LGBTQ")
    GetMovieData(setLGBTQMovieData,'LGBTQ');
    console.log("Classic")
    GetMovieData(setClassicMovieData,'Classic');
    //   // console.log()
  },[])

    
  

     

    return (
        <main>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Action
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Action' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={ActionMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Horror
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Horror' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={HorrorMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Drama
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Drama' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={DramasMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Comedy
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Comedies' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={ComediesMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={(homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Fantasy
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Fantasy' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={FantasyMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Musical
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Musical' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={MusicMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Romance
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Romance' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={RomanceMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Thriller
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Thriller' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={ThrillerMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Sports
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Sports' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={SportsMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Adventure
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Adventure' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={AdventureMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Anime
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Anime' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={AnimeMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Documentaries
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Documentries' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={DocumentariesMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Faith
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Faith' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={FaithMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                     Family
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Family' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={FamilyMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                       Science Fiction
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Sci' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={SciFiMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Children
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Children' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={ChildrenMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Stand-Up
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Stand' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={StandUpMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        International
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/International' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={InternationalMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Cult Movies
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Cult' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={CultMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Independent
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Independent' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={IndependentMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Spiritual
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Spiritual' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={SpiritualityMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                     LGBTQ
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/LGBTQ' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={LGBTQMovieData} />
            </div>
            <div className={(classes.slider, homeStyle.slider)}>
                <div className={( homeStyle.sliderHeader)}>
                    <Typography variant="h4" component="h2">
                        Classic
                    </Typography>
                    <div className={classes.slideLink}>
                        <Link to='/categories/Classic' className={classes.linkBtn}>All</Link>
                    </div>
                </div>
                <Carosuel SlideData={ClassicMovieData} />
            </div>
        </main>
    )
}

export default Category

