import Joi from "joi"

export const jogosSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required()
})