import { Router } from "express"
import { createAluguel, getAlugueis } from "../controllers/controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { alugueisSchema } from "../schemas/schemas.js"

const alugueisRouter = Router()

alugueisRouter.get("/rentals", getAlugueis)
alugueisRouter.post("/rentals", schemaValidation(alugueisSchema), createAluguel)
alugueisRouter.post("/rentals/:id/return")
alugueisRouter.delete("/rentals/:id")

export default alugueisRouter
