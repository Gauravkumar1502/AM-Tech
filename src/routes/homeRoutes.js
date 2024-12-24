import { Router } from "express";
import { validateJwtToken } from "../middlewares/authenticateToken.js";
import * as userService from "../services/userService.js";

const homeRouter = Router();

homeRouter.get('/', validateJwtToken, async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    try {
        const dbUser = await userService.getUserById(user.id);
        if (!dbUser) {
            return res.redirect('/login');
        }
        res.render('profile', { user: dbUser });
    } catch (error) {
        res.redirect('/login');
    }
});

export default homeRouter;