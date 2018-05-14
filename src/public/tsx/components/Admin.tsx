import * as React from 'react'
import { Link } from 'react-router'
import { Nav } from './Nav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  orderList?: Array<object>

  getOrderList(): void
  //onWebSockets(): void
  signOut(): void
}

export const Admin: Function = (props: Props) => {
  //props.onWebSockets()

  if(!props.orderList || props.orderList.length === 0)
    props.getOrderList()

  return(
    <div className='admin-content'>
      {
        Nav({ user: props.user, signOut: props.signOut })
      }
      <div className='container-fluid'>
        <div className='list-group order-list-container'>
          <div className='list-group-item'>
            <div className='row'>
              <div className='col text-center'>Termín</div>
              <div className='col text-center'>Mesto</div>
              <div className='col text-center'>E-mail</div>
              <div className='col text-center'>Typ auta</div>
              <div className='col text-center'>Meno</div>
              <div className='col text-center'>Telefón</div>
              <div className='col text-center'>Program</div>
            </div>
          </div>
          {
            props.orderList && props.orderList.length > 0 ? props.orderList.map((item, i) => {
              const dt: Date = new Date(parseInt(item['date']))
              const day: number = dt.getDate()
              const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
              const year: number = dt.getFullYear()

              return(
                <div className='list-group-item' key={i}>
                  <div className='row align-items-center'>
                    <div className='col text-center align-items-center'>{day+'/'+month+'/'+year}</div>
                    <div className='col text-center align-items-center'>{item['city']}</div>
                    <div className='col text-center align-items-center'>{item['email']}</div>
                    <div className='col text-center align-items-center'>{item['carType']}</div>
                    <div className='col text-center align-items-center'>{item['fullName']}</div>
                    <div className='col text-center align-items-center'>{item['phone']}</div>
                    <div className='col text-center align-items-center'>{item['program']}</div>
                  </div>
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
}
