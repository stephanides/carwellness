import * as express from 'express'
import { Email } from '../controllers/Email.controller'

const router = express.Router()
const email = new Email()

router.post('/email/send', (req, res, next) => {
  console.log('Attempting to send mail')
  email.sendEmail(req, res, next)
})

export default router