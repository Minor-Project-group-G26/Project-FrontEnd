import React from 'react';
import * as Ai from 'react-icons/ai';

export  const SidebarData =[
    {
        title:'Add Movie',
        path:'/add',
        icon : <Ai.AiTwotoneDatabase/>,
        cName:'nav-text'
    },
    {
        title:'Edit Movie',
        path:'/edit',
        icon : <Ai.AiOutlineFileAdd/>,
        cName:'nav-text'
    },
    {
        title:'Database',
        path:'/db',
        icon : <Ai.AiOutlineFileAdd/>,
        cName:'nav-text'
    }
]