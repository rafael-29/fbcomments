import React, {useState} from 'react'
import { AppBar, Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'



const Signin = ({user, setUser}) => {

const history = useHistory()

const [formLoad, setFormLoad] = useState({
username: '', password: ''
})

const authFunc = () => {
if(formLoad.username === '' || formLoad.password === '') return alert('Complete the form')

axios.post(`http://localhost:8080/users/auth`, formLoad)
.then( results => {
    const data = results.data
    localStorage.setItem('profile', JSON.stringify(data))
    setUser(JSON.parse(localStorage.getItem('profile')))
    history.push('/')
})
.catch(err => {
console.log(err)
alert('invalid username or password')
setFormLoad({
    username: '', password: ''
    })
})

}

if(user){
 history.push('/')
}

return(
<React.Fragment>
    <AppBar position="static" color="inherit"
    style={{display: 'flex', justifyContent: 'space-between', padding: '20px'}}>
        <Typography variant="h4" style={{textDecoration: 'none'}}
        component={Link} to="/">Back to home</Typography>
    </AppBar>
    <br />
    <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>Login User</Typography>
        <Grid container style={{flexDirection: 'column', gap: '20px'}}>
            <Grid item>
                <TextField onChange={e => setFormLoad({...formLoad, username: e.target.value})}
                value={formLoad.username} 
                type="text" variant="outlined" label="Enter Username"
                fullWidth />
            </Grid>

            <Grid item>
                <TextField onChange={e => setFormLoad({...formLoad, password: e.target.value})}
                value={formLoad.password} 
                type="password" variant="outlined" label="Enter Password"
                fullWidth />
            </Grid>

            <Button onClick={authFunc}
            size="large" variant="contained">Login</Button>
        </Grid>
    </Container>
</React.Fragment>
)
}

export default Signin;