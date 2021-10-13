class ErrorResponse extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCodes;
    }
}


module.exports = ErrorResponse