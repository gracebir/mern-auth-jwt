const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "please provider the username"],
    },
    email:{
        type: String,
        required: [true, "please provider the email"],
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please provider a valider email"]
    },
    password:{
        type:String,
        required: [true, 'please provide a password'],
        minlength: 6,
        select: false,
    },
    resetPassword: String,
    resetPasswordExpire : Date
});


module.exports = mongoose.model('user',UserSchema);