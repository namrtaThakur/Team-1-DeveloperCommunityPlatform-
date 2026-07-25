const AppError = require("../errors/AppError");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const registerUser = async (userData) => {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return newUser;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return {
        user,
        token,
    };
};

module.exports = {
    registerUser,
    loginUser,
};
