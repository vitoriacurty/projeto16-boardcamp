import { Router } from "express"
import alugueisRouter from "./alugueis.routes.js"
import clientesRouter from "./clientes.routes.js"
import jogosRouter from "./jogos.routes.js"

const router = Router()
router.use(jogosRouter)
router.use(clientesRouter)
router.use(alugueisRouter)

export default router