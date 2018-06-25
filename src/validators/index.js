import Joi from 'joi'

const UUID_REGEX = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
const LIMIT_AMOUMT = 99999999

export const userSchema = Joi.object().keys({
  user: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    role: Joi.any().valid(['STUDENT', 'GUARDIAN', 'EXECUTIVE']).required()
  }).required()
})

export const credentialsSchema = Joi.object().keys({
  credentials: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    ROLE: Joi.any().valid(['STUDENT', 'GUARDIAN', 'EXECUTIVE']).required()
  }).required()
})