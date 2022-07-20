import { Router } from "express";

import { createNewUser, login } from "../controllers/authController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js"
import { loginSchema } from "../schemas/loginSchema.js";
import { userSchema } from "../schemas/userSchema.js"

const authRouter = Router()

authRouter.post("/newuser", validateSchemaMiddleware(userSchema), createNewUser)
authRouter.get("/login", validateSchemaMiddleware(loginSchema), login)

export default authRouter