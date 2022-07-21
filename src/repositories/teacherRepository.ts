import prisma from "../config/database.js"

async function getByName(name:string) {
    return await prisma.teacher.findFirst({
        where:{
            name
        }
    })
}

const teacherRepository = {
    getByName
}
export default teacherRepository