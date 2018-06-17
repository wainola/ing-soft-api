import moment from 'moment'
import * as jwt from 'jsonwebtoken'

const TOKEN_REGEX = new RegExp('Bearer\\s([^;$]+)')

function authorization(request, response, next){
  const res = {
    error: {
      message: 'Unauthorized request'
    }
  }

  const autorizationRequest = request.get('authorization')

  if(!authorization){
    return response.status(401).send(res)
  }

  const tokenMatch = authorization.match(TOKEN_REGEX)
  if(tokenMatch === null){
    return response.status(401).send(res)
  }

  const bearerString = tokenMatch[0];
  const [, token] = bearerString.split(/\s+/)
  const secretKey = process.env.SECRET_KEY

  jwt.verify(token, secretKey, (err, decoded) => {
    if(err){
      return response.status(401).send(res)
    }
    const now = moment().unix()

    const expiredAt = decoded.exp

    if(!isWithInTime(now, expiredAt)){
      return response.status(401).send(res)
    }

    request.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.roel
    }

    return next()
  })
}

function isWithInTime(currentTime, expireAt){
  return currentTime <= expireAt
}

export default authorization