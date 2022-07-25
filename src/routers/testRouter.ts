import { Router } from "express";

import { createNewTest, listTestsByTeacher } from "../controllers/testController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router()

testRouter.post("/newtest", validateSchemaAndTokenMiddleware(testSchema), createNewTest)
testRouter.get("/tests-by-teacher", validateTokenMiddleware(), listTestsByTeacher)

export default testRouter