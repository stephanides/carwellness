import { Document, Schema, model } from 'mongoose'
import { IUser } from '../interfaces/User.interface'

export class User {
  firstName: string
  lastName: string
  email: string
  city: number
  password: string
  role: number
  approved: boolean

  constructor(data: {
    firstName: string
    lastName: string
    email: string
    city: number
    password: string
    role?: number
    approved?: boolean
  }) {
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.city = data.city
    this.password = data.password
    this.role = data.role
    this.approved = data.approved
  }
}

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
  	type: String,
  	required: true,
  	unique: true
  },
  city: {
    type: Number,
    default: 0
  },
  password: String,
  role: {
    type: Number,
    default: 3
  },
  approved: {
    type: Boolean,
    default: false
  },
  dateCreated: {
  	type: Date,
  	default: Date.now()
  }
})

export interface UserDocument extends User, Document {}

export const Users = model<UserDocument>('User', UserSchema)