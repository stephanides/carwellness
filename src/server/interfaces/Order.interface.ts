export interface IOrder {
  city: number
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
}