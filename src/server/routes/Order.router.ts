import * as express from 'express'
import { OrderController } from '../controllers/Order.controller'
import { checkToken } from './helpers/CheckToken.helper'

const router = express.Router()
const order = new OrderController()

router.get('/order/orders/:city', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    order.getOrders(req, res, next)
  })
})

router.post('/order/order-create', (req, res, next) => {
  order.createOrder(req, res, next)
})

router.put('/order/orders/:id', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    order.updateOrder(req, res, next)
  })
})

export default router