import * as React from 'react'
import { Claims } from './Claims'
import { Nav } from './Nav'
import { Orders } from './Orders'
import { Redirect } from 'react-router'
import { TabNav } from './TabNav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  claimList?: Array<object>
  orderList?: Array<object>

  getClaimList(): void
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
        {
          TabNav({
            tabs: [
              { title: 'Objednávky', param: 'orders' },
              { title: 'Reklamácie', param: 'claims' }
            ]
          })
        }
        <div className='tab-content p-3' id='adminTabContent'>
          <div className='tab-pane fade show active' id='orders' role='tabpanel' aria-labelledby='orders-tab'>
            {
              Orders({
                boss: props.user.city,
                list: props.orderList,
                getList: props.getOrderList
              })
            }
          </div>
          <div className='tab-pane fade' id='claims' role='tabpanel' aria-labelledby='claims-tab'>
            {
              Claims({
                boss: props.user.city,
                list: props.claimList,
                getList: props.getClaimList
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}