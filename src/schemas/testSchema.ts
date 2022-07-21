import Joi from "joi"
import { TestInformations } from "../services/testService.js"

export const testSchema = Joi.object<TestInformations>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().min(6).required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required()
})