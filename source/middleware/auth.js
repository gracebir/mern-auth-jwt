const {verify} = require('jsonwebtoken');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');



exports.protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse("Not authorized to acces this route",401));
    }

    try {
        const decoded = verify(token, process.env.access_token);
        const user = await User.findById(decoded.id);

        if(!user){
            return next(new ErrorResponse("No user found with this id",404));
        }
        next()
    } catch (error) {
        return next(new ErrorResponse(error))
    }
}