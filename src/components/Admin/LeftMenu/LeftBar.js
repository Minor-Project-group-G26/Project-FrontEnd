import React from "react";
import { Link } from "react-router-dom";
import "./LeftBar.css";
import { LeftBarData } from "./LeftBarData";



function LeftBar() {

  const LoginCheck =()=>{

    if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
    return(
      
      <div className="Sidebar">
      <ul className="SidebarList">
        {LeftBarData.map((val, key) => {
          return (
            <Link style={{textDecoration: 'none'}} to={val.link}>
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                if(val.title.toUpperCase() === "LOG OUT") sessionStorage.clear();
                // window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
            </Link>
          );
        })}
      </ul>
    </div>
       
    )
    }
  
  return (
    <>
    {LoginCheck()}
    </>
  );
}

export default LeftBar;