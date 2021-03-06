import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

//MIDDLEWARES
import authorization from './middlewares/authorization'
import accessControlList from './middlewares/access_control_list'

//HANDLERS
import UserHandler from './handlers/UserHandler'
import ClientHandler from './handlers/ClientHandler'
import ContractHandler from './handlers/ContractHandler'
import EmployeeHander from './handlers/EmployeeHandler'
import EnsuranceHandler from './handlers/EnsuranceHandler'
import GuardianHandler from './handlers/GuardianHandler'
import PaymentHandler from './handlers/PaymentHandler'
import StudentHandler from './handlers/StudentHandler'
import TestHandler from './handlers/TestHandler'
import { ServerRequest } from 'http';

//dotenv
dotenv.config({ silent: process.env.NODE_ENV !== 'development'})
console.log(process.env.NODE_ENV)

const port = process.env.PORT
const server = express()

//body parser
express.json()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
// server.use('/api', authorization)
// server.use('/api', accessControlList)


//Public Endpoints
server.post('/alumnos', UserHandler.create)
server.post('/login', UserHandler.login)

// CLIENT ENDPOINTS
server.post('/api/clients', ClientHandler.create)
server.get('/api/clients', ClientHandler.getClient)
server.patch('/api/clients', ClientHandler.update)
server.delete('/api/clients', ClientHandler.delete)
// CONTRACT ENDPOINTS
// EMPLOYEE ENDPOINTS
server.get('/api/employees', EmployeeHander.get)
server.post('/api/employees', EmployeeHander.create)
server.patch('/api/employees', EmployeeHander.update)
server.delete('/api/employees', EmployeeHander.delete)
// ENSURANCE ENDPOINTS
// GUARDIAN ENDPOINTS
// PAYMENT ENDPOINTS
server.get('/api/payment/:rut_alumno', PaymentHandler.getPaymentByStudent)
server.get('/api/payments', PaymentHandler.get)
server.post('/api/payment', PaymentHandler.postPayment)
// STUDENT ENDPOINTS
// TEST ENDPOINT
server.get('/api/test', TestHandler.testEndpoint)

server.listen(port)
console.log(`Server running at: ${port}`)