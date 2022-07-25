import { Teacher } from "@prisma/client"
import categoryRepository from "../repositories/categoryRepository.js"
import disciplineRepository from "../repositories/disciplineRepository.js"
import teacherRepository from "../repositories/teacherRepository.js"
import teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js"
import testRepository, { TestInsertData } from "../repositories/testRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

export type TestInformations={
    name:string,
    pdfUrl:string,
    category:string,
    discipline:string,
    teacher:string
}

async function newTest(testInfo:TestInformations){
    const {name, pdfUrl, category, discipline, teacher} = testInfo
    const categoryData = await getByName(categoryRepository, category, 'categoria')
    const disciplineData = await getByName(disciplineRepository, discipline, 'disciplina')
    const teacherData = await getByName(teacherRepository, teacher, 'pessoa instrutora')
    const teacherDisciplineData = await getTeacherDiscipline(teacherData.id, disciplineData.id)
    const newTest:TestInsertData = {
        name: name,
        pdfUrl: pdfUrl,
        categoryId:categoryData.id,
        teacherDisciplineId: teacherDisciplineData.id
    } 
    await testRepository.newTest(newTest)
    return sucessMessage("Novo teste salvo com sucesso.")
    
}

async function getByName(repository:any, name:string, message:string) {
    const result = await repository.getByName(name)
    if(!result) ErrorMessage(404, `Esta ${message} não existe.`)
    return result
}

async function getTeacherDiscipline(teacherId:number, disciplineId:number) {
    const result = await teachersDisciplinesRepository.getTeacherDiscipline(teacherId, disciplineId)
    if(!result) ErrorMessage(404, `Esta esta pessoa instrutora não leciona esta disciplina.`)
    return result
}

async function getTestsByTeacher(){
    const teachersList = await teachersDisciplinesRepository.listTestsByTeacher()
    const testsByTeacher = await getTeacherTests(teachersList)
    return testsByTeacher

}

async function getTeacherTests(list: Teacher[]){
    const result = []
    for(let i=0; i<list.length; i++){
        const tdList =  await teachersDisciplinesRepository.getTeacherDisciplineId(list[i].id)
        let tests = []
        for(let i=0; i<tdList.length; i++){
           const cat = await categoryRepository.getCategoryWithTests(tdList[i].id)
           const category = cat.filter(cat =>{
            if(cat.tests.length !==0) return cat
           })
           const resultCateg=[]
           for(let i=0; i<category.length; i++){
            tests.push({
                category:category[i].name,
                tests: category[i].tests
            })
           }
        }

        const testsByTeacher = {
            teacher: list[i].name,
            tests: tests
        }
        result.push(testsByTeacher)
    }
    return result
}

async function getCategoriesWithTests(categoriesID:number[]){
    const categoryWithTests = []
    for(let i=0; i<categoriesID.length; i++){
        const categoryAndTests = await categoryRepository.getCategoryWithTests(categoriesID[i])
        categoryWithTests.push(categoryAndTests)
    }
    return categoryWithTests
}

const testService = {
    newTest,
    getTestsByTeacher
}
export default testService