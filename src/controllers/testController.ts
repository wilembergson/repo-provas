import { Request, Response } from "express";
import testService, { TestInformations } from "../services/testService.js";

export async function createNewTest(req:Request, res:Response){
    const test:TestInformations = req.body
    const result = await testService.newTest(test)
    return res.status(201).json(result)
}