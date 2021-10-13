const express = require('express');


(async()=>{
    const app = express()
    const port = process.env.PORT || 5000;
    app.use('/api/auth', require('./routes/user.route'))
    app.listen(port, ()=>{
        console.log(`server running on http://localhost:${port}`);
    })
})()