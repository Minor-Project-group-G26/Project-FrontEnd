import React from 'react'
import { Link } from "react-router-dom"
import { Grid, makeStyles } from '@material-ui/core'
import "./Footer.css"

// material ui stylesheet
const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // background: "red"
  },
  footer:{
    width: '100%',
    padding: '4rem 0rem',
    backgroundColor: '#000',
    color: '#a19c9c',
    borderBottom: '8px solid #f50057',
    overflowX: 'hidden',
  },
  footerBox:{
    marginLeft: '2rem',
  },
  logo:{
    width: '100%',
    /* background-color: tomato; */
    color: '#ffffff',
    fontSize: '24px',
    marginLeft: '-1rem',
  },
  liLink:{
    textDecoration: 'none',
    listStyle: 'none',
    cursor: 'pointer',
    color: '#a19c9c',
    width: 'fit-content',
    marginTop: '0.35rem',
    fontWeight: 400,
    "&:hover":{
      color: 'rgb(221, 215, 215)',
      textDecoration: 'none',
    }
  },
  liList:{
    // fontSize:'12px',
    listStyle: 'none',
    color: '#eee',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'default',
    marginBottom: '1rem',
    // borderBottom: '1px solid #fff',
    letterSpacing: '2px',
    transition: 'all 0.5s ease',
  },
  liHeader:{
    borderBottom: '1px solid #fff',
    marginBottom: '0.75rem',
    width:'fit-content',
    fontSize: '18px',

  }

}))

function Footer() {
  const classes = useStyle()

  return (
    <div>
      <footer className={classes.footer}>
        <Grid container justify="space-around" className={classes.root} spacing={2}>
          <Grid className={classes.footerBox} item xs={4} md={2}>
            <ul className={classes.liList}>
              <li><h2 id="footer-logo" className="">Motion Pictures</h2></li>
              <li><p style={{fontSize:'16px',  color:'#333'}}>Enjoy Latest Movies and Web Series.</p></li>
            </ul>
          </Grid>
          <Grid className={classes.footerBox} item xs={4} md={2}>
            <div className="footer__menu">
              <ul className={classes.liList}>
                <li className={classes.liHeader}>Explore</li>
                <li><Link  to='/' className={classes.liLink}>Home</Link></li>
                <li><Link  to='/category' className={classes.liLink}>Category</Link></li>
                <li><Link  to='/about' className={classes.liLink}>About</Link></li>
                <li><Link  to='/support' className={classes.liLink}>Support</Link></li>
                <li><Link  to='/report' className={classes.liLink}>Report</Link></li>
              </ul>
            </div>
          </Grid>

          <Grid item md={2} xs={4} className={classes.footerBox}>
            <div className="footer__social">
              <ul className={classes.liList}>
                <li className={classes.liHeader}>Follow</li>
                <li><Link  to='/insta' className={classes.liLink}>Instagram</Link></li>
                <li><Link  to='/twitt' className={classes.liLink}>Twitter</Link></li>
                <li><Link  to='/fb' className={classes.liLink}>Facebook</Link></li>
                <li><Link  to='/Yt' className={classes.liLink}>Youtube</Link></li>
              </ul>
            </div>
          </Grid>
          <Grid item md={2} xs={4} className="footer__box">
            <div className="footer__social" >
              <ul className={classes.liList}>
                <li className={classes.liHeader}>Legal</li>
                <li><Link   to='/terms' className={classes.liLink}>Terms</Link></li>
                <li><Link   to='/privacy' className={classes.liLink}>Privacy</Link></li>
              </ul>
            </div>
          </Grid>

        </Grid>
      </footer>
    </div>
  )
}

export default Footer
