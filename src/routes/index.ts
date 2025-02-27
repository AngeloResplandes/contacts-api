import express from "express"
import { add, all } from "../controller/contacts"

const router = express.Router()

router.post("/contatos", add)
router.get("/contatos", all)

export default router