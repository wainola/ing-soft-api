import db from '../db'
import Joi from 'joi'
import uuid  from 'uuid'
import { clientSchema } from '../validators/index'
import { Client } from 'pg'
import * as lodash from 'lodash'

const clientConn = new Client()
clientConn.connect()

class ClientHandler{
  static create(request, response){
    let reply
    const isValidJSON = Joi.validate(request.body, clientSchema)
    if(isValidJSON.error !== null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }

      return response.status(422).send(reply)
    }

    const { client } = request.body
    const insertIntoCliente = 'INSERT INTO cliente (cod_cliente, nombre_cliente, descripcion_cliente) VALUES ($1, $2, $3) RETURNING *'

    const clientCod = uuid.v1()
    const clientValues = [
      clientCod,
      client.name,
      client.description
    ]

    clientConn.query(insertIntoCliente, clientValues, (err, result) => {
      if(err){
        reply = {
          error: {
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }

      const client = result.rows[0]
      const { cod_cliente, nombre_cliente, descripcion_cliente } = client
      reply = {
        data: {
          client:{
            cod_cliente,
            nombre_cliente,
            descripcion_cliente
          }
        }
      }
      return response.status(201).send(reply)
      
    })
  }

  static getClient(request, response){
    let reply
    const selectClients = 'SELECT * FROM cliente'
    clientConn.query(selectClients, (err, result) => {
      if(err){
        reply = {
          error: {
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }
      
      const clients = result.rows
      reply = {
        clients: [...clients]
      }
      return response.status(200).send(reply)
    })
  }

  static update(request, response){
    let reply
    const { client, data } = request.body
    const updateClient = 'UPDATE cliente SET nombre_cliente = $1, descripcion_cliente = $2 WHERE cod_cliente = $3 RETURNING *'
    const clientValues = [ data.name, data.description, client.client_cod ]
    clientConn.query(updateClient, clientValues, (err, result) => {
      if(err){
        reply = {
          error: {
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }
      const clientUpdated = result.rows[0]
      return response.status(201).send(clientUpdated)
    })
  }
}

export default ClientHandler