import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import * as userService from "../services/userService.js";
import * as jwtUtil from "../utils/jwtUtil.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (await userService.isUserExistsByUsernameOrEmail(username, email)) {
            return res.render('register', { error: 'User already exists with that username or email.' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await userService.saveUser(username, email, hashedPassword);
        const jwtToken = jwtUtil.generateJwtToken({ id: newUser.id });
        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.redirect('/profile');
    } catch (error) {
        res.render('register', { error: 'An error occurred. Please try again.' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password, recaptchaToken } = req.body;
        const user = await userService.getUserByUsernameOrEmail(email);
        if (!user) {
            return res.render('login', { error: 'Invalid username or password.' });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', { error: 'Invalid username or password.' });
        }
        const jwtToken = jwtUtil.generateJwtToken({ id: user.id });
        res.cookie('jwtToken', jwtToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
}