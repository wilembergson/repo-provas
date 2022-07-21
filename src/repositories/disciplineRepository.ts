import prisma from "../config/database.js"

async function getByName(name:string) {
    return await prisma.discipline.findFirst({
        where:{
            name
        }
    })
}

const disciplineRepository = {
    getByName
}
export default disciplineRepository