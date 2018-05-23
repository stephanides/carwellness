import { Document, Schema, model } from 'mongoose'
import { IAvailability } from '../interfaces/Availability.interface'

export class Availability {
  date: string
  available: boolean

  constructor(data: {
    date: string
    available: boolean
  }) {
    this.date = data.date
    this.available = data.available
  }
}

const AvailabilitySchema = new Schema({
  date: String,
  available: Boolean
})

export interface AvailabilityDocument extends Availability, Document {}

export const Availabilities = model<AvailabilityDocument>('Availability', AvailabilitySchema)