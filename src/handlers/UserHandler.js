import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'
import Joi from 'joi'
import { Client } from 'pg'

import { userSchema, credentialsSchema } from '../validators/'

const client = new Client()
client.connect()

const SALT_ROUNDS = 10

class UserHandler{
  
  static create(request, response){
    let reply

    //console.log('request body', request.body)

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

      user.password = hashedPassword

      const insertIntoAlumno = 'INSERT INTO ALUMNO(rut_alumno, nombre_alumno, apellido_alumno, correo_alumno, hashed_password) VALUES ($1,$2,$3,$4,$5) RETURNING *'

      const alumnosValues = [
        user.rut_alumno,
        user.nombre_alumno,
        user.apellido_alumno,
        user.correo_alumno,
        user.password
      ]

      client.query(insertIntoAlumno, alumnosValues, (err, result) => {

        if(err) {
          reply = {
            error: {
              message: 'Internal server error',
              info: err
            }
          }

          return response.status(500).send(response.json(reply))
        }

        const alumno = result.rows[0]

        reply = {
          data: {
            alumno: {
              rut: alumno.rut_alumno,
              nombre: alumno.nombre_alumno,
              apellido: alumno.apellido_alumno,
              correo: alumno.correo_alumno,
              hashed_password: alumno.hashed_password
            }
          }
        }

        return response.status(201).send(reply)
      })
    })
  }

  static login(request, response){
    let reply

    const isValidJSON = Joi.validate(request.body, credentialsSchema)
    if(isValidJSON.error != null){
      reply = {
        error: {
          message: 'Malformed json'
        }
      }
      return response.status(422).send(reply)
    }

    const { credentials : { rut, password } } = request.body
    const selectAlumnos = 'SELECT * FROM ALUMNO WHERE rut_alumno = $1'

    const alumnoValues = [ rut ]

    client.query(selectAlumnos, alumnoValues, (err, result) => {
      if(err){
        reply = {
          error:{
            message: 'Internal server error',
            info: err
          }
        }
        return response.status(500).send(reply)
      }

      if(result.rowCount === 0){
        reply = {
          error: {
            message: 'Unauthorized. No credentials found'
          }
        }
        return response.status(401).send(reply)
      }

      const alumno = result.rows[0]

      bcrypt.compare(password, alumno.hashed_password, (err, isValid) => {
        if(!isValid){
          reply = {
            error: {
              message: 'Unproccessable entity'
            }
          }
          return response.status(422).send(reply)
        }

        const jwtSchema = {
          exp: moment().add(8, 'hours').unix(),
          id: alumno.rut_alumno,
          role: 'STUDENT'
        }

        const token = jwt.sign(jwtSchema, process.env.SECRET_KEY)

        reply = {
          data: {
            token,
            email: alumno.correo_alumno,
            id: alumno.rut_alumno,
            role: 'STUDENT'
          }
        }

        return response.status(201).send(reply)
      })
    })
  }
}

export default UserHandler