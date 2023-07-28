import { Router } from "express"
import { createJogo, getJogos } from "../controllers/controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { jogosSchema } from "../schemas/schemas.js"

const jogosRouter = Router()

jogosRouter.get("/games", getJogos)
jogosRouter.post("/games", schemaValidation(jogosSchema), createJogo)

export default jogosRouter

