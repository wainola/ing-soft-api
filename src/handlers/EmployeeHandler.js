import Joi from "joi";
import uuid from "uuid";
import { employeeSchema } from "../validators/index";
import { Client } from "pg";

const clientConn = new Client();
clientConn.connect();

class EmployeeHandler {
  static create(request, response) {
    let reply;
    const isValidJSON = Joi.validate(request.body, employeeSchema);
    if (isValidJSON.error !== null) {
      reply = {
        error: {
          message: "Malformed json"
        }
      };
      return response.status(500).send(reply)
    }
    const { employee } =  request.body

    const insertIntoEmployees = 'INSERT INTO empleado (rut_empleado, nombre_empleado, apellido_empleado, cargo_empleado) VALUES ($1,$2,$3,$4) RETURNING *'

    const employeeValues = [
        employee.rut_empleado,
        employee.nombre_empleado,
        employee.apellido_empleado,
        employee.cargo_empleado
    ]

    clientConn.query(insertIntoEmployees, employeeValues, (err, result) => {
        if(err){
            reply = {
                error: {
                    message: 'Internal server error',
                    info: err
                }
            }
            return response.status(500).send(response.json(reply))
        }

        const employee = result.rows[0]

        reply = {
            data: {
                empleado: {
                    rut_empleado: employee.rut_empleado,
                    nombre: employee.nombre_empleado,
                    apellido: employee.apellido_empleado,
                    cargo_empleado: employee.cargo_empleado
                }
            }
        }
        return response.status(201).send(reply)
    })
  }
  static get(request, response) {
      let reply
      const selectClients = 'SELECT * FROM empleado'
      clientConn.query(selectClients, (err, result) => {
          if(err){
              reply = {
                  message: 'Internal server error',
                  info: err
              }
              return response.status(500).send(reply)
          }
          const { employees } = result.rows[0]
          reply = {
              employees: [ ...employeess]
          } 
      }) 
  }
  static update(request, response) {
      let reply
      const { employee, data } = request.body
      const updateEmployee = 'UPDATE empleado SET, nombre_empleado = $1, apellido_empleado = $2, cargo_empleado = $3 WHERE rut_empleado = $4 RETURNING *'
      const employeeValues = [
          data.nombre_empleado,
          data.apellido_empleado,
          data.cargo_empleado,
          employee.rut
      ]

      clientConn.query(updateEmployee, employeeValues, (err, result) => {
          if(err){
              reply = {
                  error: {
                      message: 'Internal server error',
                      info: err
                  }
              }

              return response.status(500).send(reply)
          }
          const employeeUpdated = result.rows[0]
          return response.status(200).send(employeeUpdated)
      })
  }
  static delete(request, response) {}
}

export default EmployeeHandler;
