import { UserRegister } from "../../src/services/authService";


export async function createUser(){
    const user:UserRegister = {
        email: "email@gmail.com",
        password: "doda123456",
        repeatPassword: "doda123456"
      };
      return user
}

export async function createUserWithDiferentPasswords(){
  const user:UserRegister = {
      email: "email@gmail.com",
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