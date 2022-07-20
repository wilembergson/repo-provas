import Joi from "joi";
import { UserRegister } from "../services/authService.js";

export const userSchema = Joi.object<UserRegister>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string().required()
})