import Joi from "joi"


// validação jogos 
export const jogosSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required()
})

//validação clientes
export const clientesSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]{11}$/).required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]{11}$/).required(),
    birthday: Joi.date().iso().raw().required()
})

// validação aluguéis
export const alugueisSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().min(1).required()
})