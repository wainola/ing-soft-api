import Joi from 'joi'
import uuid from 'uuid'
import { contractSchema } from '../validators/index'
import { Client } from 'pg'

const clientConn = new Client()
clientConn.connect()

class ContractHandler{
  static create(request, response){
    let reply
    const isValidJSON = Joi.validate(request.body, contractSchema)
    if(isValidJSON.error !== null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }
      return reponse.status(500).send(reply)
    }

    const { contract } = request.body
    const insertIntoContracts = 'INSERT INTO contrato (cod_contrato, descripcion_contrato, monto_pagar, cod_cliente, rut_empleado) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const cod_contrato = uuid.v1()
    const contractValues = [
      cod_contrato,
      contract.descripcion_contrato,
      contract.monto_pagar,
      contract.cod_cliente,
      contract.rut_empleado
    ]

    clientConn.query(insertIntoContracts, contractValues, (err, result) => {
      if(err){
        reply = {
          error: {
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }
      const contract = result.rows[0]
      reply = {
        data: {
          contract: {
            cod_contrato: contract.cod_contrato,
            descripcion_contrato: contract.descripcion_contrato,
            monto_pagar: contract.monto_pagar,
            cod_cliente: contract.cod_cliente,
            rut_empleado: contract.rut_empleado
          }
        }
      }

      return response.status(201).send(reply)
    })
  }
  static get(request, response){
    let reply
    const selectContracts = 'SELECT * FROM contrato'
    clientConn.query(selectContracts, (err, result) => {
      if(err){
        reply = {
          message: 'Internal server error',
          info: err
        }
        return response.status(500).send(reply)
      }
      const contracts = result.rows
      reply = {
        contratos: [ ...contracts]
      }
      return response.status(200).send(reply)
    })
  }
  static update(request, response){

  }
  static delete(request, response){
    
  }
}
