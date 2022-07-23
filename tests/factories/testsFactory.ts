import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database.js";
import { TestInformations } from "../../src/services/testService.js"

export async function createTest(){
    const test:TestInformations = {
        name: faker.internet.domainName(),
        pdfUrl: faker.internet.url(),
        category:"Projeto",
        discipline:"HTML e CSS",
        teacher:"Diego Pinho"
      };
      return test
}

export async function createCategory(){
  await prisma.category.create({
    data:{
      name:"Projeto"
    }
  })
}

export async function createTerm(){
  await prisma.term.create({
    data:{
      number:1
    }
  })
}

export async function createDiscipline(){
  await prisma.discipline.create({
    data:{
      name:"HTML e CSS",
      termId:1
    }
  })
}

export async function createTeacher(){
  await prisma.teacher.create({
    data:{
      name:"Diego Pinho"
    }
  })
}

export async function createTeachersDisciplines(){
  await prisma.teacherDiscipline.create({
    data:{
      teacherId:1,
      disciplineId:1
    }
  })
}

export async function generateTablesData(){
  await createCategory(),
  await createTerm(),
  await createDiscipline(),
  await createTeacher(),
  await createTeachersDisciplines()
}
export async function deleteAll(){
  await prisma.test.deleteMany({})
  await resetId('tests')
  await prisma.category.deleteMany({})
  await resetId('categories')
  await prisma.teacherDiscipline.deleteMany({})
  await resetId('teachersDisciplines')
  await prisma.discipline.deleteMany({})
  await resetId('disciplines')
  await prisma.term.deleteMany({})
  await resetId('terms')
  await prisma.teacher.deleteMany({})
  await resetId('teachers')
  await prisma.user.deleteMany({})
  await resetId('users')
}

async function resetId(table:string) {
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1;`);
}