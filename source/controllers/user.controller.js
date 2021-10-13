
exports.register = (req,res, next) =>{
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

