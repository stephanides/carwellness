import { Document, Schema, model } from 'mongoose'
import { IOrder } from '../interfaces/Order.interface'
import { Products } from './Product.model';

export class Order {
  city: number
  car: string
  carType: number
  carTypeDetail: string
  date: Date
  deleted: boolean
  editedBy: string
  editedAt: Date
  email: string
  fullName: string
  managed: string
  managedTime: string
  message: string
  phone: string
  program: Array<boolean>
  products: Array<object>
  orderState: number

  constructor(data: {
    city: number
    car: string
    carType: number
    carTypeDetail: string
    date: Date
    deleted: boolean
    editedBy: string
    editedAt: Date
    email: string
    fullName: string
    managed: string
    managedTime: string
    message: string
    phone: string
    program: Array<boolean>
    products: Array<object>
    orderState: number
  }) {
    this.city = data.city
    this.car = data.car
    this.carType = data.carType
    this.carTypeDetail = data.carTypeDetail
    this.date = data.date
    this.deleted = data.deleted
    this.editedBy = data.editedBy
    this.editedAt = data.editedAt
    this.email = data.email
    this.fullName = data.fullName
    this.managed = data.managed
    this.managedTime = data.managedTime
    this.message = data.message
    this.phone = data.phone
    this.program = data.program
    this.products = data.products
    this.orderState = data.orderState
  }
}

const OrderSchema = new Schema({
  city: Number,
  car: String,
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
  managed: String,
  managedTime: String,
  message: String,
  phone: String,
  program: Array,
  products: {
    type: Array,
    default: [],
  },
  orderState: {
    type: Number,
    default: 0
  }
})

export interface OrderDocument extends Order, Document {}

export const Orders = model<OrderDocument>('Order', OrderSchema)