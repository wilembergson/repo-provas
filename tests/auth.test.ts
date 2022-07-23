import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"
import supertest from "supertest";

import app from "../src/app.js";
import prisma from "../src/config/database.js"
import { createLogin, createUser, createUserWithDiferentPasswords, createUserWithEmailTypeWrong, loginWithEmailNotFound, loginWithWrongPassword } from "./factories/authFactory.js";

describe("POST /register", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it("Deve retornar codigo 201 se for um usuario valido", async () => {
      const user = await createUser()
      const response = await supertest(app).post("/register").send(user);
      expect(response.status).toEqual(201);
    });

    it("Deve retornar codigo 401 se as senhas informadas não forem iguais", async () => {
      const user = await createUserWithDiferentPasswords()
      const response = await supertest(app).post("/register").send(user);
      expect(response.status).toEqual(401);
    });

    it("Deve retornar codigo 422 se o email não esttiver no formato correto", async () => {
      const user = await createUserWithEmailTypeWrong()
      const response = await supertest(app).post("/register").send(user);
      expect(response.status).toEqual(422);
    });

    it("Deve retornar status 401 para usuario já cadastrado", async () => {
        const user = await createUser()
        await prisma.user.create({
            data: {
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            }
        });
        const response = await supertest(app).post("/register").send(user);
        expect(response.status).toEqual(401);
      });

      it("Deve retornar status 422 para corpo da requisição vazio", async () => {
        const user = {};
        const response = await supertest(app).post("/register").send(user);
        expect(response.status).toEqual(422);
      });

      it("Deve retornar status 422 para corpo da requisição faltando a senha", async () => {
        const user = {
          email: "test2@gmail.com"
        };
        const response = await supertest(app).post("/register").send(user);
        expect(response.status).toEqual(422);
      });

      it("Deve retornar status 422 para corpo da requisição faltando o email", async () => {
        const user = {
          password: "doda123456"
        };
        const response = await supertest(app).post("/register").send(user);
        expect(response.status).toEqual(422);
      });
  });

  describe("GET /login", () => {
    beforeEach(async () => {
      await prisma.user.deleteMany()
  });

    it("Deve retornar codigo 200 se for um login valido", async () => {
      const login =  await createLogin()
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(200);
    });

    it("Deve retornar codigo 404 se o email não constar no banco de dados", async () => {
      const login =  await loginWithEmailNotFound()
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(404);
    });

    it("Deve retornar codigo 401 se a senha estiver errada", async () => {
      const login =  await loginWithWrongPassword()
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(401);
    });

    it("Deve retornar codigo 422 se não for passado email e senha corretamente", async () => {
      const login = {}
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se não for passado o email corretamente", async () => {
      const login =  {
        email:"testegmail.com",
        password:faker.internet.password()
      }
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(422);
    });

    it("Deve retornar codigo 422 se não for passado a senha corrematente", async () => {
      const login =  {
        email:faker.internet.email()
      }
      const response = await supertest(app).get("/login").send(login);
      expect(response.status).toEqual(422);
    });
  });