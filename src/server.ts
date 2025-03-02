import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", router);

server.listen(3000, () => {
    console.log("Servidor rodando no link http://localhost:3000/");
});
