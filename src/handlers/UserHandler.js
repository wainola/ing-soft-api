import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'
import Joi from 'joi'

import { userSchema, credentialSchema } from '../validators/'

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
    }
  }
}