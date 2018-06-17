import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'
import Joi from 'joi'

import { userSchema, credentialsSchema } from '../validators/'

const SALT_ROUNDS = 10

class UserHandler{
  
  static create(request, response){
    let reply

    const isValidJSON = Joi.validate(request.body, userSchema)
    if(isValidJSON.error !== null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }
      return response.status(422).send(reply)
    }


    const { user } = request.body

    bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {

      reply = {
        data: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.phone
        }
      }

      return response.status(201).send(reply)
    })
  }

  static login(request, response){
    let reply

    console.log(request.body)

    const isValidJSON = Joi.validate(request.body, credentialsSchema)
    if(isValidJSON.error != null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }
      return response.status(422).send(reply)
    }

    reply = {
      credentials:{
        email: request.body.credentials.email,
        password: request.body.credentials.password
      }
    }

    return response.status(200).send(reply)
  }
}

export default UserHandler