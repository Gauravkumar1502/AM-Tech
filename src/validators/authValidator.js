import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    // recaptchaToken: Joi.string().required()
});