import { Router } from "express";
import { createNewTest } from "../controllers/testController.js"

const testRouter = Router()

testRouter.get("/newtest", createNewTest)

export default testRouter