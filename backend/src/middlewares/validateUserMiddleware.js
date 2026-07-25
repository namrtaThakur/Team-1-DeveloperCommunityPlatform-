const validateUserMiddleware = (req, res, next) => {
    let { username, email, password } = req.body;

    // Required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Username, email and password are required",
        });
    }

    // Normalize input
    if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string"){
        return res.status(400).json({success: false,message: "Invalid input types",});
    }
    username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    // Username validation
    if (username.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Username cannot be empty",
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }

    // Password validation
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long",
        });
    }

    // Store normalized values back into the request
    req.body.username = username;
    req.body.email = email;
    req.body.password = password;

    next();
};

module.exports = validateUserMiddleware;
