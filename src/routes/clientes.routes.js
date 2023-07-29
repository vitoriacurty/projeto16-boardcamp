import { Router } from "express"
import { atualizarCliente, getClientes, getClientesById, inserirCliente } from "../controllers/controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js"
import { clientesSchema } from "../schemas/schemas.js"

const clientesRouter = Router()

clientesRouter.get("/customers", getClientes)
clientesRouter.get("/customers/:id", getClientesById)
clientesRouter.post("/customers", schemaValidation(clientesSchema), inserirCliente)
clientesRouter.put("/customers/:id", schemaValidation(clientesSchema), atualizarCliente)

export default clientesRouter