import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IOrder } from '../interfaces/Order.interface'
import { Order, OrderDocument, Orders } from '../models/Order.model'
import * as nodemailer from 'nodemailer';

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      //From one user only one order chould be created on specific date
      // const order = await Orders.findOne({}); // { $and: [{ date: req.body.date }, { email: req.body.email}] 
      
      // if(order)
        // this.throwError('Order allready exist on selected time', 409, next)
      // else {
        let orderData: object = {} as IOrder

        for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          if(Object.keys(req.body)[i].indexOf('program') > -1) {
            let tmpArr: Array<boolean> = []
            const arrToInterate: Array<string> = (<any>Object).values(req.body)[i]
            
            for(let j: number = 0; j < arrToInterate.length; j++) {
              if(arrToInterate[j] === 'true') tmpArr.push(true)
              else tmpArr.push(false)
            }

            orderData['program'] = tmpArr;
          } /* else if (Object.keys(req.body)[i].indexOf('products') > -1) {
            let tmpProdArray: object[] = [];
            const arrayToIterate: string[] = (<any>Object).values(req.body)[i];

            for(let j: number = 0; j < arrayToIterate.length; j++) {
              
            }
          } */ else orderData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]
        }

        const newOrder: object = new Order(orderData as IOrder)
        const saveOrder = await Orders.create(newOrder);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'objednavky.mlyny@gmail.com',
            pass: 'rjqxkwwwuhnwkjkj',
          },
        });
        const sMPort = 'http'; // https
        const sMDomain = 'localhost:3434'; // carwellness.sk

        const _date = req.body.date.split('T')[0];
        const newDate = `${_date.split('-')[2]}/${_date.split('-')[1]}/${_date.split('-')[0]}`;
        const newTime = req.body.date.split('T')[1].split('.')[0];

        await transporter.sendMail({
          from: 'info@carwellness.sk',
          to: `${req.body.email}`,
          subject: 'CARwellness | Potvrdenie objednávky',
          html: `<h2>Vaša objednávka bola prijatá. Ďakujeme za rezerváciu a tešíme sa na Vás <span style="color:#dc002e;">${newDate}</span> o <span style="color:#dc002e;">${newTime}</span>.</h2>
          <p><strong>S pozdravom</strong></p>
          <img src='https://carwellness.sk/assets/images/logo.png' />
          <p><strong>OC MLYNY</strong></p>
          <p><strong>Štefánikova trieda 61, 949 01 Nitra</strong></p>
          <p><strong>Mobil: +421 903 716 656</strong></p>
          <p style="color:#dc002e;"><strong>www.carwellness.sk</strong></p>
           `,
        });

        res.json({ message: 'Order has been created', success: true });
      // }
    } catch(err) {
      console.log(err);
      return next(err);
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