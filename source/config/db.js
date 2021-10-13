const mongoose = require('mongoose');

const connectDb = async () =>{
    await mongoose.connect(process.env.uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    },
        )

    console.log("mongosb connected");
}

module.exports = connectDb;