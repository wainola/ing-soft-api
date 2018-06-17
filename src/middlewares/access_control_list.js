import * as jwt from 'jsonwebtoken'
import ACL from './ACL'

function accessControlList(request, response, next){
  const reply = {
    error: {
      message: 'Forbiden request'
    }
  }

  const authorization = request.get('authorization')
  const [, token] = authorization.split(' ')

  const secretKey = process.env.SECRET_KEY
  jwt.verify(token, secretKey, (err, decoded) => {
    if(err){
      return response.status(401).send(reply)
    }

    const { role } = decoded;
    if(role === 'EJECUTIVO'){
      return next()
    }

    const methodAndURL = `${request.method}${request.baseUrl}${request.path}`

    if(!ACL[role].includes(methodAndURL)){
      return response.status(403).send(reply)
    }

    next()
  })
}

export default accessControlList