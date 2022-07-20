import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type UserInsertData = Omit<User, "id">

async function newUser(user: UserInsertData){
    return await prisma.user.create({
        data: user
    })
}

async function findUser(email: string){
    return await prisma.user.findFirst({
        where:{
            email: email
        }
    })
}

const authRepository = {
    newUser,
    findUser
}

export default authRepository