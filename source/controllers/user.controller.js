const UserModel = require('../models/user.model');
const {sign} = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorResponse = require('../utils/errorResponse')


exports.register = async (req,res, next) =>{
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.create({
            username, email, password
        })

        res.status(201).json({
            success: true,
            accessToken: sign(
                {id: user._id},
                process.env.access_token,
                {expiresIn: "15d"}, 
            )
        })
    } catch (error) {
        next(error)
    }
    res.send('this is register');
}





exports.login = async (req, res, next) =>{
    const { email, password } = req.body;
    if(!email || !password) {
        return next(new errorResponse("please provide email and password",400))
    }

    try {
        const user = await UserModel.findOne({ email }).select("+password");
        if(!user){
            return next(new errorResponse("user does not exists",404));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return next(new errorResponse("Invalid password",400));
        }


        
        res.status(200).json({
            success: true,
            accessToken: sign(
                {id: user._id},
                process.env.access_token,
                {expiresIn: "15d"}, 
            )
        })
    } catch (error) 
    {
        next(error);
    }
}


exports.forgetpassword = (req, res, next) =>{
    res.send('I forget the password!!!!')
}


exports.resetpassword = (req, res, next) =>{
    res.send('You can reset your password!!!')
}



exports.sendToken = (user, statusCode, res) =>{
    const token = user.getSignToken()
    res.status(statusCode).json({ success: true, token})
}
