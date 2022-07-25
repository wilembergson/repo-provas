import prisma from "../config/database.js"

async function getByName(name:string) {
    return await prisma.category.findFirst({
        where:{
            name
        }
    })
}

async function getCategoryWithTests(id:number){
    return await prisma.category.findMany({
        include:{
            tests:{
                where:{
                    teacherDisciplineId:id
                },
                include:{
                    teacherDiscipline:{
                        include:{
                            discipline:{
                                include:{
                                    term:{}
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

const categoryRepository = {
    getByName,
    getCategoryWithTests
}
export default categoryRepository