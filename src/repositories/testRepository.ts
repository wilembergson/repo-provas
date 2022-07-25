import { Test } from "@prisma/client"
import prisma from "../config/database.js"

export type TestInsertData = Omit<Test, "id">

async function newTest(test:TestInsertData){
    return await prisma.test.create({
        data:test
    })
}

async function getTestsByTerms(){
     return await prisma.term.findMany({
        include:{
            disciplines:{
                include:{
                    theachersDiscipline:{
                        
                    }
                }
            }
        }
     })
}

async function getCategoryWithTests(theacherDisciplineId:number){
    return await prisma.category.findMany({
        include:{
            tests:{
                where:{
                    teacherDisciplineId:theacherDisciplineId
                },
                include:{
                    teacherDiscipline:{
                        select:{
                            teacher:{}
                        }
                    }
                }
            }
        }
    })
}

const testRepository = {
    newTest,
    getTestsByTerms,
    getCategoryWithTests
}
export default testRepository