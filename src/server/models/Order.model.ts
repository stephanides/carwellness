import { Document, Schema, model } from 'mongoose'
import { IOrder } from '../interfaces/Order.interface'

export class Order {
  city: string
  carType: number
  date: string
  deleted: boolean
  email: string
  fullName: string
  message: string
  phone: string
  program: Array<boolean> //number

  constructor(data: {
    city: string
    carType: number
    date: string
    deleted: boolean
    email: string
    fullName: string
    message: string
    phone: string
    program: Array<boolean> //number
  }) {
    this.city = data.city
    this.carType = data.carType
    this.date = data.date
    this.deleted = data.deleted
    this.email = data.email
    this.fullName = data.fullName
    this.message = data.message
    this.phone = data.phone
    this.program = data.program
  }
}

const OrderSchema = new Schema({
  city: String,
  carType: Number,
  date: {
    type: String,
    default: Date.now()
  },
  deleted: {
    type: Boolean,
    default: false
  },
  email: String,
  fullName: String,
  message: String,
  phone: String,
  program: Array
})

export interface OrderDocument extends Order, Document {}

export const Orders = model<OrderDocument>('Order', OrderSchema)