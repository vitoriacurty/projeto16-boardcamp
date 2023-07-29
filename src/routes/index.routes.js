import { Router } from "express"
import clientesRouter from "./clientes.routes.js"
import jogosRouter from "./jogos.routes.js"

const router = Router()
router.use(jogosRouter)
router.use(clientesRouter)

export default router