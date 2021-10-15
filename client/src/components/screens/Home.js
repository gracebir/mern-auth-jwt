import React from 'react'
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem("authToken");
        history.push('/login');
    }
    return (
        <div style={{margin:'20px'}}>
            <button onClick={logout}>Logout</button>
            <div className="container">
                <h1>home</h1>
\            </div>
        </div>
    )
}

export default Home
