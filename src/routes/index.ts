import express from "express"
import { add, all, update, remove } from "../controller/contacts"

const router = express.Router()

router.post("/contact", add)
router.get("/admin", all)
router.put("/admin/:id", update)
router.delete("/admin/:id", remove)

export default router