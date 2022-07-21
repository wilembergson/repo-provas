import prisma from "../config/database.js"

async function getTeacherDiscipline(teacherId:number, disciplineId:number) {
    return await prisma.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    })
}

const teachersDisciplinesRepository = {
    getTeacherDiscipline
}
export default teachersDisciplinesRepository