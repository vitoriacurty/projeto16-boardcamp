import { Router } from "express"
import { getAlugueis } from "../controllers/controllers.js"

const alugueisRouter = Router()

alugueisRouter.get("/rentals", getAlugueis)
alugueisRouter.post("/rentals")
alugueisRouter.post("/rentals/:id/return")
alugueisRouter.delete("/rentals/:id")

export default alugueisRouter
