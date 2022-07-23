import { UserRegister } from "../../src/services/authService.js";
import {faker} from "@faker-js/faker"; 
import bcrypt from "bcrypt"
import { UserInsertData } from "../../src/repositories/authRepository.js";
import prisma from "../../src/config/database.js";

export async function createUser(){
    const user:UserRegister = {
        email: faker.internet.email(),
        password: "doda123456",
        repeatPassword: "doda123456"
      };
      return user
}

export async function createUserWithDiferentPasswords(){
  const user:UserRegister = {
      email: faker.internet.email(),
      password: "doda123456",
      repeatPassword: "doda123457"
    };
    return user
}

export async function createUserWithEmailTypeWrong(){
  const user:UserRegister = {
      email: "emailgmail.com",
      password: "doda123456",
      repeatPassword: "doda123456"
    };
    return user
}

export async function createLogin(){
  const user = await createUser()
  const login:UserInsertData = {
    email:user.email,
    password:bcrypt.hashSync(user.password,10)
  }
  await prisma.user.create({
    data:login
  })
  return {
    email:user.email,
    password:user.password
  }
}

export async function loginWithEmailNotFound(){
  const user = await createUser()
  return {
    email:user.email,
    password:user.password
  }
}

export async function loginWithWrongPassword(){
  const user = await createUser()
  const login:UserInsertData = {
    email:user.email,
    password:bcrypt.hashSync(user.password,10)
  }
  await prisma.user.create({
    data:login
  })
  return {
    email:user.email,
    password:faker.internet.password()
  }
}