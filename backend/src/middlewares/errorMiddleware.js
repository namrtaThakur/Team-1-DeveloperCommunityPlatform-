const errorMiddleware = (err, req, res, next) => {

    if (process.env.NODE_ENV !== "test") {
    console.error(err);
    }
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";


    if(err.code === 11000){
        statusCode = 409;
        message = "Duplicate field value already exists";
    }


    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }


    if(err.name === "JsonWebTokenError"){
        statusCode = 401;
        message = "Invalid authentication token";
    }


    if(err.name === "TokenExpiredError"){
        statusCode = 401;
        message = "Authentication token expired";
    }


    res.status(statusCode).json({
        success:false,
        message,
        ...(process.env.NODE_ENV !== "production" && {
            stack:err.stack,
        }),
    });
};
module.exports = errorMiddleware;
