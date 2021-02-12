import React from 'react';
import styled from 'styled-components';

const Boss = styled.div`

    margin-top: 15px;
    width: 90%;
    background-color: rgba(0,0,0, 0.6);
    height: 100vh;
    border-radius: 14px;
    justify-content: center;
    align-items: center;

    .inner{
        padding-left: 40px;
        padding-right: 40px;
        text-align: center;
        margin-top: 15px;
        h1{
            color: #fff;
            margin-bottom: 40px;
            font-family: 'Paytone One', sans-serif;
            font-size: 45px;
            text-decoration: underline;
        }
        label{
            font-size: 24px;
            color: #fff;
            font-family: 'Hind Siliguri', sans-serif;
        }
    }

`;

function About() {
    return (
        <main>
        <Boss>
            <div className="inner">
                <h1>About Us</h1>
                <label>
                    The project named “Motion Picture” is a project written in React as a Front-End 
                    support managed by Flask and Sqlite from Back-End. The basic idea for this project
                    is to remove the unwanted questioning after a Review done by a User to get rating
                    of that Movie. Instead of that our team 
                    (Jeetesh Kumar Shaw, Gourav Singh, Ankur Majumdar, Nisha Ghosh) 
                    consulted with our Guide (Prof. Avik Chatterjee) to create an OTT platform that would 
                    generate a rating on the basis of Review given by a User. 
                </label>
            </div>
        </Boss>
        </main>
    )
}

export default About
