import React from 'react'

function CommentCard({Comment}) {
    return (
        <div className={"commentCard"} style={{ display: 'flex', flexDirection: 'column', padding: 16, borderTop: '1px solid #666666', borderBottom: '1px solid #666666' }}>
            <div className="header" style={{ fontSize: 26, padding: 8, borderBottom: '1px solid #a6a6a6', display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
               <h3>{Comment.username} </h3>
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
