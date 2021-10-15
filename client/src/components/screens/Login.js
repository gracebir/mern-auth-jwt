import React, { useState, useEffect } from 'react'
import {Grid, Avatar, Paper, Button, TextField} from '@material-ui/core';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link ,Redirect } from 'react-router-dom';
import axios from 'axios';

// style for the login 
const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 300,
    margin: '20px auto'
}

const textfieldStyle = {
    margin:'10px'
}

const avatarStyle = {
    backgroundColor: '#2f7fad'
}


function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            return <Redirect to="/login" />
        }
    },[])

    
    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header :{
                "Content-type": "application/json"
            }
        }

       
        try {
            const { data } = await axios.post("/api/auth/login",{
                 email, password
            }, config);

            localStorage.setItem("authToken",data.accessToken);
            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() =>setError(""),5000)

        }
    }


    return (
        <div className="col-md-4 m-auto">
             <Grid>
                <Paper elevation={10} style={paperStyle}>
                <Grid item container  justifyContent="center">
                    <Avatar style={avatarStyle}>
                        <LockOpenIcon/>
                    </Avatar>
               
                </Grid>
            <form
            onSubmit={loginHandler}
            >
                {error && <span className="error-handle">{error}</span>}
               <TextField 
                    style={textfieldStyle}
                    type="email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    fullWidth 
                    placeholder="Email address" 
                    label="Email" 
                    required
                    variant="standard"
                />
                <TextField 
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password" 
                    fullWidth 
                    value={password}
                    placeholder="Password" 
                    label="Password" 
                    required
                    variant="standard"
                    style={textfieldStyle}
                />
               
               <Button type="submit" style={{marginTop:'20px'}} color="primary" variant="contained" fullWidth>Sign in</Button>
               <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
            </form>
            </Paper>
            </Grid>
        </div>
    )
}

export default Login
