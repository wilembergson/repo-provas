import { Request, Response } from "express";
import testService, { TestInformations } from "../services/testService.js";

export async function createNewTest(req:Request, res:Response){
    const test:TestInformations = res.locals.data
    const result = await testService.newTest(test)
    return res.status(201).json(result)
}

export async function listTestsByTeacher(req:Request, res:Response){
    const result = await testService.getTestsByTeacher()
    return res.status(200).json(result)
}

export async function listTestsByDisciplines(req:Request, res:Response){
    const result = await testService.getTestsByTerms()
    return res.status(200).json(result)
}