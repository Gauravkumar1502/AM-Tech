import { Router } from "express";
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRequest } from "../middlewares/requestValidator.js";
import { userLoginSchema, userRegistrationSchema } from "../validators/authValidator.js";

const authRouter = Router();
authRouter.get('/', (req, res) => res.redirect('/login'));
authRouter.get('/login', (req, res) => {
    res.render('login', { error: null });
});
authRouter.post('/login', validateRequest(userLoginSchema, 'body', 'login'), loginUser);

authRouter.get('/register', (req, res) => res.render('register'));
authRouter.post('/register', validateRequest(userRegistrationSchema, 'body', 'register'), registerUser);

authRouter.get('/logout', (req, res) => {
    res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.redirect('/login');
});

export default authRouter;