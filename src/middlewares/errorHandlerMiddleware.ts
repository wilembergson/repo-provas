import {Request, Response, NextFunction} from "express"

export default async function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  if(error.message && error.status){
    return res.status(error.status).json({message: error.message})
  }
  return res.status(500).json({message: 'Erro ao tentar acessar o banco de dados.'})
}