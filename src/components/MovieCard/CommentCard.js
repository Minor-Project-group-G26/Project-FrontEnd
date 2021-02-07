import { Avatar, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) =>({
    Avatar:{
        pointerEvents: 'none',
        width: theme.spacing(6),
        height: theme.spacing(6),
        // pointerEvents: 'none'
    },
}))

function CommentCard({Comment}) {
    const classes = new useStyle();
    return (
        <div className={"commentCard"} style={{ display: 'flex', flexDirection: 'column', padding: 16, borderTop: '1px solid #666666', borderBottom: '1px solid #666666' }}>
            <div className="header" style={{ fontSize: 26, padding: 8, borderBottom: '1px solid #a6a6a6', display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent:"flex-start", alignItems: 'center' }}>
                <Avatar src={`http://127.0.0.1:5000/get-file/users/${Comment.userProfile}`} className={classes.Avatar}>{Comment.userProfile[0]}</Avatar>
                <h3>{Comment.username} </h3>
            </div>
                <p> Rating: {Comment.rating}</p>
            </div>
            <div className="comment" style={{ fontSize: 18, color: '#eee', padding: 8 }}>
                <p>{Comment.comment}</p>
            </div>
            <div className="DOC">
                <p style={{ float: 'right' }}>{Comment.doc}</p>
            </div>
        </div>
    )
}

export default CommentCard
