const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken')

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


UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.getSignToken = async function(){
    return sign({id: this._id}, process.env.access_token,{expiresIn: "30m"})
}


module.exports = mongoose.model('user',UserSchema);