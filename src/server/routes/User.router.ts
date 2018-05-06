import * as express from 'express'
import { UserController } from '../controllers/User.controller'

const router = express.Router()
const user = new UserController()

router.post('/admin/login', (req, res, next) => {
  user.login(req, res, next)
})

router.post('/admin/register', (req, res, next) => {
  user.register(req, res, next)
})

export default router