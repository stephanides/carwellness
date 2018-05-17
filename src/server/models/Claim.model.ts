import { Document, Schema, model } from 'mongoose'
import { IClaim } from '../interfaces/Claim.interface'

export class Claim {
  city: number
  date: string
  deleted: boolean
  email: string
  fullName: string
  message: string
  phone: string
  image: string

  constructor(data: {
    city: number
    date: string
    deleted: boolean
    email: string
    fullName: string
    message: string
    phone: string
    image: string
  }) {
    this.city = data.city
    this.email = data.email
    this.fullName = data.fullName    
    this.message = data.message
    this.phone = data.phone
    this.image = data.image
  }
}

const ClaimSchema = new Schema({
  city: Number,
  date: {
    type: Date,
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
  image: String
})

export interface ClaimDocument extends Claim, Document {}

export const Claims = model<ClaimDocument>('Claim', ClaimSchema)