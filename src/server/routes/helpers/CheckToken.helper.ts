import config from '../../config'
import * as jwt from 'jsonwebtoken'

export const checkToken: Function = (req, res, next, callBack?: (next) => void) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if(!token) {
    const err: Error = new Error('No token provided')
    
    err['status'] = 499
    return next(err)
  }
  else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err) {
        const err: Error = new Error('Provided token is invalid')
        
        err['status'] = 498
        return next(err)
      }
      req['decoded'] = decoded
      
      if(typeof callBack === 'function')
        callBack(next)      
    })
  }
}