import express from "express"
import { boilerCode } from "../../controllers/code-controller/boilerPlate-code-controller.js"

const router= express.Router()

router.get("/:lang",boilerCode)
export default router