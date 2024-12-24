import jwt from 'jsonwebtoken';
import 'dotenv/config';


export const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}