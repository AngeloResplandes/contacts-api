import express from "express"
import { add, all, update, remove } from "../controller/contacts"

const router = express.Router()

router.post("/contatos", add)
router.get("/contatos", all)
router.put("/contatos/:id", update)
router.delete("/contatos/:id", remove)

export default router