const UserModel = require('../models/user.model');


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
        res.status(501).json({error:error.message()})
    }
    res.send('this is register');
}

exports.login = (req, res, next) =>{
    res.send('this is login!!!!!!!');
}


exports.forgetpassword = (req, res, next) =>{
    res.send('I forget the password!!!!')
}


exports.resetpassword = (req, res, next) =>{
    res.send('You can reset your password!!!')
}

