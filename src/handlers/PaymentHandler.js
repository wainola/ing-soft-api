import Joi from 'joi'
import { Client } from 'pg'

import { paymentSchema } from '../validators/'

class PaymentHandler {
  static getPaymentByStudent(request, response, next){
    
  }

  static postPayment(request, response, next){
    let reply

    const isValidJSON = Joi.validate(request.body, paymentSchema)
    if(isValidJSON.error !== null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }
      return response.status(422).send(reply)
    }

    const { payment_details } = request.body

    const getAlumnoByRut = 'SELECT rut_alumno FROM ALUMNO WHERE rut_alumno = $1'
    const rutValue = [ payment_details.rut_alumno ]

    client.query(getAlumnoByRut, rutValue, (err, result) => {
      if(err){
        reply = {
          error: {
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }

      if(result.rowCount === 0){
        reply = {
          error: {
            message: 'No entity found'
          }
        }
        return response.status(401).send(reply)
      }
      
    })

    return response.status(201).send({'data': 'data posteada correctamente'})
  }
}

export default PaymentHandler