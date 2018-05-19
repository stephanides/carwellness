import * as React from 'react'
import { Claims } from './Claims'
import { Filter } from './Filter'
import { Nav } from './Nav'
import { Orders } from './Orders'
import { Redirect } from 'react-router'
import { TabNav } from './TabNav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  claimList?: Array<object>
  paginationItemCount: number
  program: Array<string>
  orderList?: Array<object>
  orderedOrderList?: Array<object>
  orderState: Array<string>

  changeOrders(orders: Array<object>): void
  getClaimList(): void
  getOrderList(): void
  orderByTime(): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
  updateOrder(order: object, callBack?: () => void): void
  //onWebSockets(): void
  signOut(): void
}

export class Admin extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    //this.props.onWebSockets()
    this.props.getOrderList()
  }

  render() {
    return(
      <div className='admin-content'>
        {
          Nav({ user: this.props.user, signOut: this.props.signOut })
        }
        <div className='container-fluid'>
          {
            TabNav({ tabs: [{ title: 'Objednávky', param: 'orders' }, { title: 'Reklamácie', param: 'claims' }] })
          }
          <div className='tab-content p-3' id='adminTabContent'>
            <div className='tab-pane fade show active' id='orders' role='tabpanel' aria-labelledby='orders-tab'>
              {
                Filter({
                  program: this.props.program,
                  orderState: this.props.orderState,
                  orderByTime: this.props.orderByTime,
                  orderByOrderState: this.props.orderByOrderState,
                  orderByOrderProgram: this.props.orderByOrderProgram
                })
              }
              <Orders
                boss={this.props.user.city}
                list={this.props.orderedOrderList}
                paginationItemCount={this.props.paginationItemCount}
                program={this.props.program}
                orderList={this.props.orderList}
                orderState={this.props.orderState}

                changeOrders={this.props.changeOrders}
                getList={this.props.getOrderList}
                updateItem={this.props.updateOrder}
              />
            </div>
            <div className='tab-pane fade' id='claims' role='tabpanel' aria-labelledby='claims-tab'>
              <Claims
                boss={this.props.user.city}
                list={this.props.claimList}
                getList={this.props.getClaimList}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
