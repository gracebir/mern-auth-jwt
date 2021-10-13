const UserModel = require('../models/user.model');
const {sign} = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.register = async (req,res, next) =>{
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.create({
            username, email, password
        })

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(501).json({error:error.message})
    }
    res.send('this is register');
}





exports.login = async (req, res, next) =>{
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({success: false, error: "Please provide email and password"});
    }

    try {
        const user = await UserModel.findOne({ email }).select("+password");
        if(!user){
            res.status(404).json({ success: false, error: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(404).json({ success: false, error:"Invalid Password"})
        }


        res.status(201).json({
            success: true,
            accessToken: sign(
                {id: user._id},
                "mern_secret",
                {expiresIn: "15d"}, 
            )
        })
    } catch (error) {
        res.status(501).json({error: error.message})
    }
}


exports.forgetpassword = (req, res, next) =>{
    res.send('I forget the password!!!!')
}


exports.resetpassword = (req, res, next) =>{
    res.send('You can reset your password!!!')
}

