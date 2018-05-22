import { Document, Schema, model } from 'mongoose'
import { IOrder } from '../interfaces/Order.interface'

export class Order {
  city: number
  carType: number
  carTypeDetail: string
  date: Date
  deleted: boolean
  editedBy: string
  editedAt: Date
  email: string
  fullName: string
  message: string
  phone: string
  program: Array<boolean>
  orderState: number

  constructor(data: {
    city: number
    carType: number
    carTypeDetail: string
    date: Date
    deleted: boolean
    editedBy: string
    editedAt: Date
    email: string
    fullName: string
    message: string
    phone: string
    program: Array<boolean>
    orderState: number
  }) {
    this.city = data.city
    this.carType = data.carType
    this.carTypeDetail = data.carTypeDetail
    this.date = data.date
    this.deleted = data.deleted
    this.editedBy = data.editedBy
    this.editedAt = data.editedAt
    this.email = data.email
    this.fullName = data.fullName
    this.message = data.message
    this.phone = data.phone
    this.program = data.program
    this.orderState = data.orderState
  }
}

const OrderSchema = new Schema({
  city: Number,
  carType: Number,
  carTypeDetail: String,
  date: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  editedBy: String,
  editedAt: Date,
  email: String,
  fullName: String,
  message: String,
  phone: String,
  program: Array,
  orderState: {
    type: Number,
    default: 0
  }
})

export interface OrderDocument extends Order, Document {}

export const Orders = model<OrderDocument>('Order', OrderSchema)