import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Register
const register = async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            friends,
            location,
            occupation,
            views,
            impressions
        } = request.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picture,
            friends,
            location,
            occupation,
            views: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const newUserSave = await newUser.save();
        response.status(201).json(newUserSave);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

// Login
const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            response.status(400).json({ error: "User does not exist." });
        } else {
            const checkPassword = bcrypt.compare(password, checkUser.password);
            if (!checkPassword) {
                response.status(400).json({ error: "Invalid credentials" });
            } else {
                const newToken = jwt.sign({ id: checkUser._id }, process.env.SECRET_TOKEN, { expiresIn: "15m" });
                delete checkUser.password;
                response.status(200).json({ token: newToken, user: checkUser });
            }
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export { register, login };