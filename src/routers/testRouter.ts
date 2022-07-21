import { Router } from "express";

import { createNewTest } from "../controllers/testController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router()

testRouter.get("/newtest", validateSchemaAndTokenMiddleware(testSchema), createNewTest)

export default testRouter