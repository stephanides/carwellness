import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IOrder } from '../interfaces/Order.interface'
import { Order, OrderDocument, Orders } from '../models/Order.model'

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await Orders.findOne({ date: req.body.date })
      
      if(order)
        this.throwError('Order allready exist on selected time', 409, next)
      else {
        let orderData: object = {} as IOrder

        for(let i: number = 0; i < Object.keys(req.body).length; i++)
          orderData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]

        const newOrder: object = new Order(orderData as IOrder)
        const saveOrder = await Orders.create(newOrder)

        if(saveOrder)
          res.json({ message: 'Order has been created', success: true })
        else
          res.json({ message: saveOrder, success: false })
      }
    }
    catch(err) {
      return next(err)
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const query: object = parseInt(req.params.city) > 0 ? { $and: [{ city: parseInt(req.params.city) }, { deleted: false }] } : { deleted: false }
      const orders: Array<object> = await Orders.find(query)

      if(!orders || orders.length === 0)
        this.throwError('Nothing found', 404, next)
      else
        res.json({ data: orders, success: true })
    }
    catch(err) {
      return next(err)
    }
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage)

    err['status'] = errStatus
    return next(err)
  }
}