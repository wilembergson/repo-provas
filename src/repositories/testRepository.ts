import { Test } from "@prisma/client"
import prisma from "../config/database.js"

export type TestInsertData = Omit<Test, "id">

async function newTest(test:TestInsertData){
    return await prisma.test.create({
        data:test
    })
}



const testRepository = {
    newTest
}
export default testRepository