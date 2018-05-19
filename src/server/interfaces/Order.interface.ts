export interface IOrder {
  city: number
  carType: number
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
}