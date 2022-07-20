import Joi from "joi";
import { UserInsertData } from "../repositories/authRepository.js";

export const loginSchema = Joi.object<UserInsertData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})