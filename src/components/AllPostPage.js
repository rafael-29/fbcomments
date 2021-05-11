import React, {useState} from 'react'
import {Typography, Button, Grid, TextField} from '@material-ui/core';
import axios from 'axios'



const AllPostPage = ({allPosts}) => {


const [commentBox, setCommentBox] = useState('')


const submitComment = (post) => {
const commentData = {
    commentCreator: JSON.parse(localStorage.getItem('profile')).result?._id,
    commentCreatorName: JSON.parse(localStorage.getItem('profile')).result?.name,
    postId: post._id,
    comment: commentBox
}
axios.post('http://localhost:8080/posts/addcomment', commentData)
.then( (resu) => {
console.log(resu.data)
})
.catch(err => console.log(err))
}

return(
<Grid Container style={{paddingBottom: '100px',
display: 'flex', justifyContent: 'flex-start', alignItems:'flex-start', flexDirection: 'column-reverse'}}>
    {
        allPosts.map(post => (
        <Grid item key={post._id} style={{background: '#f5f5f5', padding: '16px',
        marginBottom: '20px', width: '300px' }}>
            <Typography variant="h5" gutterBottom>{post.creatorName}</Typography>
            <Typography variant="h6" color="textSecondary"
             gutterBottom>{post.content}</Typography>

            <div>
            <Button size="small">Like {post.likes.length}</Button>
            <Button size="small">Comment</Button>
            </div>

            <div>
            <TextField label="write comment" value={commentBox}
            onChange={e => setCommentBox(e.target.value)} variant="outlined"
            size="small" />{' '}
            <Button onClick={() => submitComment(post)} variant="contained" size="small"
            color="primary" >Submit</Button>
            </div>  
            {!post.comments ? <></> :
            <div>
                <h6>merong comment</h6>
            </div>}
        </Grid>
        ))
    }
</Grid>
)
}


export default AllPostPage;