import prisma from "../config/database.js"

async function getTeacherDiscipline(teacherId:number, disciplineId:number) {
    return await prisma.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    })
}

async function getTeacherDisciplineId(teacherId: number) {
    return await prisma.teacherDiscipline.findMany({
        where:{
            teacherId
        }
    })
}
async function listTestsByTeacher() {
    return await prisma.teacher.findMany({
        
    })
}
const teachersDisciplinesRepository = {
    getTeacherDiscipline,
    getTeacherDisciplineId,
    listTestsByTeacher
}
export default teachersDisciplinesRepository