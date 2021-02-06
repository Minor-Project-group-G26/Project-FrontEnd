import React,{useState} from 'react';
import { Link } from "react-router-dom";
import * as Icns from 'react-icons/go';
import * as Ai from 'react-icons/ai';
import {SidebarData} from './Sidebar';
import './Navbar.css';
import { IconContext } from "react-icons";

function Navbar() {

    const [sidebar,setSidebar] = useState(false)
    const showSidebar =()=>setSidebar(!sidebar)
   

    return(
        <>
        
        <IconContext.Provider  value={{color:'rgb(255, 128, 0)'}}>

            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <Icns.GoThreeBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" :"nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <Ai.AiOutlineClose/>
                        </Link>
                    </li>
                    <li style={{listStyleType:"none"}}>
                        <span style={{color:'white',fontFamily:'Roboto',fontSize:'20px'}}>Humpty Dumpty</span>
                    </li>
                    <li style={{listStyleType:"none"}}></li>
                    {SidebarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>   
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}
export default Navbar;