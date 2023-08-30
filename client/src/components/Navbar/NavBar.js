import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import memories from '../../images/memories.png';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
// import Auth from '../Auth/Auth';

const NavBar = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')));

    // console.log(user);
    // logout a user
    const logOut = () => {
        dispatch({type: 'LOGOUT'});

        navigate('/');

        setUser(null);
    }

    useEffect(() => {
        //check google sign up if it exists
        const token = user?.access_token;

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);



    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'> Memories </Typography>
                <img className={classes.image} src={memories} alt='memories' height="60" />
            </div>
            <Toolbar className={classes.toolBar}>
                {
                    user  ? (
                        <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )
                }
            </Toolbar>

        </AppBar>
    )
}

export default NavBar
