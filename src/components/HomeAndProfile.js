import React, {useState,useEffect} from 'react'
import {Typography, Container, Button, TextField} from '@material-ui/core'
import axios from 'axios'

import AllPostPage from './AllPostPage.js'

const HomeAndProfile = ({user}) => {

const SECUREAUTH = axios.create({
baseURL: 'http://localhost:8080'
})

SECUREAUTH.interceptors.request.use( (req) => {

    req.headers.auth = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`

    return req;
})


const [message, setMessage] = useState('')

const [allPosts, setAllPosts] = useState()

/// ADD POST 
const postFunc = () => {

let postData = {
creator: user.result._id,
creatorName: user.result.name,
content: message
}

SECUREAUTH.post('/posts/addpost', postData)
.then( results => {
    console.log(results.data)
    fetchPosts()
})
.catch(err => {
    console.log(err)
    alert('Unable to Post for now ! Please Contact The Developer')
})

}

const fetchPosts = () => {
axios.get('http://localhost:8080/posts')
.then(results => {
setAllPosts(results.data)

})
.catch(err => {
alert('problem fetching the posts, CHECK USE,EFFECT ')
})
}


useEffect( () => {

fetchPosts();

}, [])

if(user === null){
return(
    <Container maxWidth="md" style={{marginTop: '8%'}}>
        <Typography align="center"
        variant="h3" color="textPrimary">Welcome to this world</Typography>

        <Typography align="center"
        variant="h5" color="textSecondary">play this wonderful app and make money online
        dont miss the fun start playing now</Typography>
    </Container>
)
}

return(
    <Container maxWidth="md" style={{marginTop: '8%'}}>
        <Typography align="center"
        variant="h3" color="textPrimary">Welcome Home {user.result.name}</Typography>

        <Typography align="center"
        variant="h5" color="textSecondary">Try to post something to start your day ?</Typography>


        <TextField variant="outlined" size="small" label="What's on your mind ?"
        value={message} onChange={e => setMessage(e.target.value)} />


        <Button color="primary"
        onClick={postFunc} variant="contained">Submit</Button>

        <Container maxWidth="sm" style={{marginTop: '50px'}}>
            {allPosts === undefined ? 
            <Typography align="center" variant="h4">Waiting to fetch data</Typography> : 
            <AllPostPage allPosts={allPosts} />}
        </Container>
    
    </Container>
)
}


export default HomeAndProfile;