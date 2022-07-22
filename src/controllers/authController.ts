import { Request, Response } from "express";

import authService, { UserRegister } from "../services/authService.js";

export async function createNewUser(req:Request, res:Response){
    const { email, password, repeatPassword } = req.body
    const newUser: UserRegister = {
        email,
        password,
        repeatPassword
    }
    const result = await authService.newUser(newUser)
    return res.status(201).json(result)
}

export async function login(req: Request, res: Response){
    const { email, password } = req.body
    const result = await authService.login(email, password)
    return res.status(200).json(result)
}