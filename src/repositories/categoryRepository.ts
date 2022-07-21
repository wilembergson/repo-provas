import prisma from "../config/database.js"

async function getByName(name:string) {
    return await prisma.category.findFirst({
        where:{
            name
        }
    })
}

const categoryRepository = {
    getByName
}
export default categoryRepository