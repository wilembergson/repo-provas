import { faker } from "@faker-js/faker";
import bcrypt from  "bcrypt"
import supertest from "supertest";
import app from "../src/app.js";

import prisma from "../src/config/database.js"
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
    afterEach(async () => {
        //await deleteAll()
    })

    it("Deve retornar codigo 201 se um novo teste for criado", async () => {
        const newTest = await createTest()
        const response = await supertest(app).post("/newtest").set('Authorization', `Bearer ${token}`).send(newTest);
        expect(response.status).toEqual(201);
      });
})