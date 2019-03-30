import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IOrder } from '../interfaces/Order.interface'
import { Order, OrderDocument, Orders } from '../models/Order.model'

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      //From one user only one order chould be created on specific date
      const order = await Orders.findOne({ $and: [{ date: req.body.date }, { email: req.body.email}] })
      
      if(order)
        this.throwError('Order allready exist on selected time', 409, next)
      else {
        let orderData: object = {} as IOrder

        for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          if(Object.keys(req.body)[i].indexOf('program') > -1) {
            let tmpArr: Array<boolean> = []
            const arrToInterate: Array<string> = (<any>Object).values(req.body)[i]
            
            for(let j: number = 0; j < arrToInterate.length; j++) {
              if(arrToInterate[j] === 'true') tmpArr.push(true)
              else tmpArr.push(false)
            }

            orderData['program'] = tmpArr
          }
          else orderData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]
        }

        const newOrder: object = new Order(orderData as IOrder)
        const saveOrder = await Orders.create(newOrder)

        if(saveOrder) res.json({ message: 'Order has been created', success: true })
        else res.json({ message: saveOrder, success: false })
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
      const orders: Array<object> = await Orders.find(query);

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