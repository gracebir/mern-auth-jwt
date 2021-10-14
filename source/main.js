require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const errorhandler = require('./middleware/error');


//require('crypto').randomBytes(20).toString("hex")

(async()=>{
    connectDb();
    const app = express()
    app.use(express.json())
    const port = process.env.PORT || 5000;
    
    app.use('/api/auth', require('./routes/user.route'))
    app.use(errorhandler)
    let server = app.listen(port, ()=>{
        console.log(`server running on http://localhost:${port}`);
    });
    process.on("unhandledRejection",(error, promise)=>{
        console.log("Looger error", error);
        server.close(()=> process.exit(1));
    })
})()