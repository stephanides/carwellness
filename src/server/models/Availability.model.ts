import { Document, Schema, model } from 'mongoose'
import { IAvailability } from '../interfaces/Availability.interface'

export class Availability {
  city: number
  date: Date
  available: boolean
  arrN: number
  editedBy: string
  editedAt: Date

  constructor(data: {
    city: number
    date: Date
    available: boolean
    arrN: number
    editedBy: string
    editedAt: Date
  }) {
    this.city = data.city
    this.date = data.date
    this.available = data.available
    this.arrN = data.arrN
    this.editedBy = data.editedBy
    this.editedAt = data.editedAt
  }
}

const AvailabilitySchema = new Schema({
  city: Number,
  date: Date,
  available: Boolean,
  arrN: Number,
  editedBy: String,
  editedAt: {
    type: Date,
    default: Date.now()
  }
})

export interface AvailabilityDocument extends Availability, Document {}

export const Availabilities = model<AvailabilityDocument>('Availability', AvailabilitySchema)