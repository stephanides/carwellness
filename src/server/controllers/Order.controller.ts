import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IOrder } from '../interfaces/Order.interface'
import { Order, OrderDocument, Orders } from '../models/Order.model'

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await Orders.findOne({ $and: [{ date: req.body.date }, { city: req.body.city}] })
      
      if(order)
        this.throwError('Order allready exist on selected time', 409, next)
      else {
        let orderData: object = {} as IOrder

        console.log('REQ BODY:')
        console.log(req.body)
        console.log('\n')

        for(let i: number = 0; i < Object.keys(req.body).length; i++)
          orderData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]

        console.log('INTERPOLATED DATA FROM REQEST:')
        console.log(orderData)

        const newOrder: object = new Order(orderData as IOrder)
        
        console.log('CREATED ORDER READY TO SAVE:')
        console.log(newOrder)

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

  async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderToUpdate: object = await Orders.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })

      if(!orderToUpdate)
        this.throwError('Not Found', 404, next)
      else {
        const dataToUpdate: object = new Order(req.body as IOrder)
        const updatedOrder: object = await Orders.update({ _id: mongoose.Types.ObjectId(req.body._id) }, dataToUpdate)

        if(updatedOrder)
          res.json({ message: 'Order has been successfully updated', success: true })
        else
          this.throwError('Can\'t update order data', 500, next)
      }
    }
    catch(err) {
      return next(err)
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
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