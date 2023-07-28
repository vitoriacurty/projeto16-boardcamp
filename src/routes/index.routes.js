import { Router } from "express"
import jogosRouter from "./jogos.routes.js"

const router = Router()
router.use(jogosRouter)

export default router