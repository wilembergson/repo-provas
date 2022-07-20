import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"


import routers from "./routers/routers.js"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
dotenv.config()

const app = express()
app.use(json())
app.use(routers)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Running on port ${PORT}...`))
