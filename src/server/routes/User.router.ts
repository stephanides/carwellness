import * as express from 'express'
import { UserController } from '../controllers/User.controller'

const router = express.Router()
const user = new UserController()

router.get('/user/users', (req, res, next) => {
  user.getUsers(req, res, next)
})

router.post('/user/login', (req, res, next) => {
  user.login(req, res, next)
})

router.post('/user/register', (req, res, next) => {
  user.register(req, res, next)
})

router.put('/user/user/:id', (req, res, next) => {
  user.updateUser(req, res, next)
})

export default router