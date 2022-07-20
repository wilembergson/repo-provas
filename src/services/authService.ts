import bcrypt from "bcrypt"

import authRepository, { UserInsertData } from "../repositories/authRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

export type UserRegister = {
    email: string,
    password: string,
    repeatPassword: string
}

async function newUser(user:UserRegister) {
const { email, password, repeatPassword} = user
    const foundUser = await authRepository.findUser(email)
    if(foundUser) ErrorMessage(401, "Já existe usuário com este email.")
    if(password !== repeatPassword) ErrorMessage(401, "A senha informada não confere. Repita com atenção.")
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser: UserInsertData = {
        email,
        password: cryptedPassword
    }
    await authRepository.newUser(newUser)
    return sucessMessage("Novo usuário criado com sucesso.")
}

const authService = {
    newUser
}
export default authService