import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../src/app.js";
import { createLogin } from "./factories/authFactory.js";
import { createTest, deleteAll, generateTablesData } from "./factories/testsFactory.js";

describe("POST /newtest", () => {
    let token: any = undefined
    beforeEach(async () => {
        await deleteAll()
        await generateTablesData()
        const login = await createLogin()
        const response = await supertest(app).get("/login").send(login);
        token = response.body.token
    });

    it("Deve retornar codigo 201 se um novo teste for criado", async () => {
        const newTest = await createTest()
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(201);
    });

    it("Deve retornar codigo 401 se o token não for passado", async () => {
        const newTest = await createTest()
        const response = await supertest(app).post("/newtest").send(newTest);
        expect(response.status).toEqual(401);
    });

    it("Deve retornar codigo 422 se o corpo da requisição não for passado", async () => {
        const newTest = undefined
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se nome não for passado corretamente", async () => {
        const newTest = await createTest()
        newTest.name = undefined || null
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se a URL não for passado corretamente", async () => {
        const newTest = await createTest()
        newTest.pdfUrl = undefined || null
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se a categoria não for passado corretamente", async () => {
        const newTest = await createTest()
        newTest.category = undefined || null
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se a disciplina não for passado corretamente", async () => {
        const newTest = await createTest()
        newTest.discipline = undefined || null
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se a pessoa instrutora não for passado corretamente", async () => {
        const newTest = await createTest()
        newTest.teacher = undefined || null
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 404 se a categoria passada não estiver cadastrada", async () => {
        const newTest = await createTest()
        newTest.category = faker.fake.name
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(404);
    });

    it("Deve retornar codigo 404 se a disciplina passada não estiver cadastrada", async () => {
        const newTest = await createTest()
        newTest.discipline = faker.fake.name
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(404);
    });

    it("Deve retornar codigo 404 se a pessoa instrutora passada não estiver cadastrada", async () => {
        const newTest = await createTest()
        newTest.teacher = faker.fake.name
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(404);
    });

    it("Deve retornar codigo 200 se o token for passado corretamente", async () => {
        const response = await supertest(app).get("/tests-by-teacher").set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it("Deve retornar codigo 401 se o token não for passado", async () => {
        const response = await supertest(app).get("/tests-by-teacher");
        expect(response.status).toEqual(404);
    });
})