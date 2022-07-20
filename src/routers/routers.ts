import { Router } from "express";
import authRouter from "./auhRouter.js";

const routers = Router()

routers.use(authRouter)

export default routers