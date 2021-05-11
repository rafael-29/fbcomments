import React from 'react'
import {Typography, AppBar, Avatar, Button, Grid} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'


import HomeAndProfile from './HomeAndProfile.js'

const Home = ({user, setUser}) => {

const history = useHistory()

const logoutFunc = () => {
    localStorage.clear()
    setUser(JSON.parse(localStorage.getItem('profile')))
    history.push('/')
}

const renderProfileNavBar = () => (
    <React.Fragment>
        <Avatar src={user.result.profilePic} alt="asd">{user.result.name.charAt(0)}</Avatar>
        <Button onClick={logoutFunc}
        variant="contained" color="secondary">Log out</Button>
    </React.Fragment>
)



return(
<React.Fragment>
    <AppBar position="static" color="inherit" style={{padding: '6px 20px'}}>
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Button component={Link} to="/"
                ><Typography variant="h4" >This Logo</Typography></Button>
            </Grid>
            <Grid item style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px'}}>
                {user === null ? <Button component={Link} to="/signin"
                style={{color: 'red'}}>Sign in</Button> : 
                renderProfileNavBar()}
            </Grid>
        </Grid>
    </AppBar>

    <HomeAndProfile user={user} />

</React.Fragment>
)
}

export default Home;