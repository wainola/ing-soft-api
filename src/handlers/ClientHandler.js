import db from '../db'
import Joi from 'joi'
import { ClientCredentials } from '../validators/index'
class ClientHandler{
  static create(request, response){
    let reply
    const isValidJSON = Joi.validate(request.body, ClientCredentials)
  }
}

export default ClientHandler