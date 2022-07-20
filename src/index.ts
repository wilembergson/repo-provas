import express, { json } from "express"
import dotenv from "dotenv"
import routers from "./routers/routers.js"
dotenv.config()

const app = express()
app.use(json())
app.use(routers)

const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Running on port ${PORT}...`))
