import Joi from 'joi'

const UUID_REGEX = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
const LIMIT_AMOUMT = 99999999

export const userSchema = Joi.object().keys({
  user: Joi.object().keys({
    rut_alumno: Joi.string().required(),
    nombre_alumno: Joi.string().required(),
    apellido_alumno: Joi.string().required(),
    correo_alumno: Joi.string().required(),
    password: Joi.string().min(7).required()
  }).required()
})

export const credentialsSchema = Joi.object().keys({
  credentials: Joi.object().keys({
    rut: Joi.string().required(),
    password: Joi.string().min(7).required()
  }).required()
})