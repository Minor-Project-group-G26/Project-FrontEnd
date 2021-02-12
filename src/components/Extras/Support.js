import React from 'react';
import styled from 'styled-components';

const Boss = styled.div`

    margin-top: 15px;
    width: 90%;
    background-color: rgba(0,0,0, 0.6);
    min-height: 70vh;
    border-radius: 14px;
    justify-content: center;
    align-items: center;

    .inner{
        padding: 40px 20px;
        margin-top: 15px;
        h1{
            font-style: oblique;
            font-weight: 800;
            text-align: left;
            color: red;
            margin-bottom: 40px;
            font-family: 'Paytone One', sans-serif;
            font-size: 45px;
            text-decoration: underline;
        }
        label{
            text-align: left;
            font-size: 20px;
            color: #fff;
            font-family: 'Hind Siliguri', sans-serif;
        }
    }

    @media (max-width: 540px){
        width: 100%;
    }

`;

function Support() {
    return (
        <main>
        <Boss>
            <div className="inner">
                <h1>Support</h1>
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

export default Support
