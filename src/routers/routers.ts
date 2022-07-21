import { Router } from "express";
import authRouter from "./auhRouter.js";
import testRouter from "./testRouter.js";

const routers = Router()

routers.use(authRouter)
routers.use(testRouter)

export default routers