import { Document, Schema, model } from 'mongoose'
import { IEmployee } from '../interfaces/Employee.interface'

export class Employee {
  name: string
  city: number
  
  constructor(data: {
    name: string
    city: number
  }) {
    this.name = data.name
    this.city = data.city
  }
}

const EmployeeSchema = new Schema({
  name: String,
  city: Number
})

export interface EmployeeDocument extends Employee, Document {};

export const Employees = model<EmployeeDocument>('Employee', EmployeeSchema);
