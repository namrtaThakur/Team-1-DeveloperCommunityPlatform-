function timeMiddleware(req, res, next) {
    console.log(`Time: ${new Date().toLocaleTimeString()}`);
    next();
}

module.exports = timeMiddleware;
