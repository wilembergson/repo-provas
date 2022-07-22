import prisma from "../config/database.js"

async function getTeacherDiscipline(teacherId:number, disciplineId:number) {
    return await prisma.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    })
}

async function listTestsByTeacher2() {
    return await prisma.test.findMany({
        include:{
            teacherDiscipline:{
                include:{
                    teacher:{},
                    discipline:{},
                }
            }
        }
    })
}
async function listTestsByTeacher() {
    return await prisma.teacher.findMany({
        
    })
}
const teachersDisciplinesRepository = {
    getTeacherDiscipline,
    listTestsByTeacher
}
export default teachersDisciplinesRepository