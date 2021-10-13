require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');

(async()=>{
    connectDb();
    const app = express()
    const port = process.env.PORT || 5000;
    
    app.use('/api/auth', require('./routes/user.route'))
    let server = app.listen(port, ()=>{
        console.log(`server running on http://localhost:${port}`);
    });
    process.on("unhandledRejection",(error, promise)=>{
        console.log("Looger error", error);
        server.close(()=> process.exit(1));
    })
})()