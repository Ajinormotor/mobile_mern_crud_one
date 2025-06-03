import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import bookRoutes from "./routes/book.routes.js"

import { connectDB } from "./lib/connectDB.js"

const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is listening at localhost:${PORT}`)
})