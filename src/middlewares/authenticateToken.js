import * as jwtUtil from "../utils/jwtUtil.js";

export const validateJwtToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.redirect('/login');
        }
        const decodedUser = jwtUtil.verifyToken(token);
        if (!decodedUser) {
            res.clearCookie('jwtToken');
            return res.redirect('/login');
        }
        req.user = decodedUser;
        next();
    } catch (err) {
        res.clearCookie('jwtToken');
        return res.redirect('/login');
    }
};