import { Document, Schema, model } from 'mongoose'
import { IClaim } from '../interfaces/Claim.interface'

export class Claim {
  city: number
  claimState: number
  date: string
  deleted: boolean
  editedBy: string
  editedAt: Date
  email: string
  fullName: string
  message: string
  phone: string
  image: string

  constructor(data: {
    city: number
    claimState: number
    date: string
    deleted: boolean
    editedBy: string
    editedAt: Date
    email: string
    fullName: string
    message: string
    phone: string
    image: string
  }) {
    this.city = data.city
    this.claimState = data.claimState
    this.editedBy = data.editedBy,
    this.editedAt = data.editedAt,
    this.email = data.email
    this.fullName = data.fullName    
    this.message = data.message
    this.phone = data.phone
    this.image = data.image
  }
}

const ClaimSchema = new Schema({
  city: Number,
  claimState: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  },
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
  image: String
})

export interface ClaimDocument extends Claim, Document {}

export const Claims = model<ClaimDocument>('Claim', ClaimSchema)