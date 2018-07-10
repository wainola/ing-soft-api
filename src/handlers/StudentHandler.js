import Joi from 'joi'
import uuid from 'uuid'
import { studentSchema } from '../validators/index'
import { Client } from 'pg'

const clientConn = new Client()
clientConn.connect()

class StudentHandler{

  static create(request, response){

  }
  static get(request, response){

  }
  static update(request, response){

  }
  static delete(request, response){
    
  }
}