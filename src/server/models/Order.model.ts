import { Document, Schema, model } from 'mongoose'
import { IOrder } from '../interfaces/Order.interface'

export class Order {
  city: number
  carType: number
  date: Date
  deleted: boolean
  email: string
  fullName: string
  message: string
  phone: string
  program: Array<boolean> //number

  constructor(data: {
    city: number
    carType: number
    date: Date
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
  city: Number,
  carType: Number,
  date: Date,
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