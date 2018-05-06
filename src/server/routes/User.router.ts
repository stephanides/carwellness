import * as express from 'express'
import { UserController } from '../controllers/User.controller'

const router = express.Router()
const user = new UserController()

router.post('/user/login', (req, res, next) => {
  user.login(req, res, next)
})

router.post('/user/register', (req, res, next) => {
  user.register(req, res, next)
})

export default router