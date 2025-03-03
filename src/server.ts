import express from "express"
import helmet from "helmet"
import cors from "cors"
import router from "./routes"
import { errorHandler, NotFoundRequest } from "./routes/errorHandler"

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use("/", router)

server.use(NotFoundRequest)
server.use(errorHandler)

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});