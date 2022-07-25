import { Router } from "express";

import { createNewTest, listTestsByDisciplines, listTestsByTeacher } from "../controllers/testController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router()

testRouter.post("/newtest", validateSchemaAndTokenMiddleware(testSchema), createNewTest)
testRouter.get("/tests-by-teacher", validateTokenMiddleware(), listTestsByTeacher)
testRouter.get("/tests-by-discipline", validateTokenMiddleware(), listTestsByDisciplines)

export default testRouter