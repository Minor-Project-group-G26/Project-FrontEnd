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
    display: flex;

    .inner{
        justify-content: center;
        align-items: center;
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

function Report() {
    return (
        <main>
        <Boss>
            <div className="inner">
                <h1> This Page is Under Construction !!</h1>
                <label>
                    
                </label>
            </div>
        </Boss>
        </main>
    )
}

export default Report
