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

export const paymentSchema = Joi.object().keys({
  payment_details: Joi.object().keys({
    id_pago: Joi.string().required(),
    monto_pagado: Joi.number().required(),
    rut_alumno: Joi.string().required(),
    cod_contrato: Joi.string().required()
  })
})

export const contractSchema = Joi.object().keys({
  contract_details: Joi.object().keys({
    cod_contrato: Joi.string().required(),
    descripcion_contrato: Joi.string().required(),
    monto_pagar: Joi.number().required(),
    cod_cliente: Joi.string().required(),
    rut_empleado: Joi.string().required()
  })
})

export const clientSchema = Joi.object().keys({
  client: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
})

export const studentSchema = Joi.object().keys({

})

export const employeeSchema = Joi.object().keys({
  employee: Joi.object().keys({
    rut_empleado: Joi.string().required(),
    nombre_empleado: Joi.string().required(),
    apellido_empleado: Joi.string().required(),
    cargo_empleado: Joi.string().required()
  })
})