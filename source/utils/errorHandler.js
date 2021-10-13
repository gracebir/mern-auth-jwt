class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCodes;
    }
}


module.exports = ErrorHandler