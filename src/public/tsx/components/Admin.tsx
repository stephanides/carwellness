import * as React from 'react'
import { Availability } from './Availability'
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
  page: number
  paginationItemCount: number
  pagesCount: number
  program: Array<string>
  orderList?: Array<object>
  orderedOrderList?: Array<object>
  orderState: Array<string>

  changeOrder(orders: object): void
  changePage(page: number): void
  changePageItemsCount(itemsCount: number): void
  getClaimList(): void
  getOrderList(): void
  orderByTime(): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
  updateOrder(order: object, callBack?: () => void): void
  updateClaim(claim: object, callBack?: () => void): void
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
            TabNav({
              tabs: [{
                title: 'Objednávky', param: 'orders'
              },
              {
                title: 'Reklamácie', param: 'claims'
              },
              {
                title: 'Obsadenosť', param: 'availability'
              }]
            })
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
                page={this.props.page}
                paginationItemCount={this.props.paginationItemCount}
                pagesCount={this.props.pagesCount}
                program={this.props.program}
                orderList={this.props.orderList}
                orderState={this.props.orderState}

                changeOrder={this.props.changeOrder}
                changePage={this.props.changePage}
                changePageItemsCount={this.props.changePageItemsCount}
                getList={this.props.getOrderList}
                updateItem={this.props.updateOrder}
              />
            </div>
            <div className='tab-pane fade' id='claims' role='tabpanel' aria-labelledby='claims-tab'>
              <Claims
                boss={this.props.user.city}
                claimState={this.props.orderState}
                list={this.props.claimList}

                changeClaims={this.props.changeOrder}
                getList={this.props.getClaimList}
                updateItem={this.props.updateClaim}
              />
            </div>
            <div className='tab-pane fade' id='availability' role='tabpanel' aria-labelledby='availability-tab'>
              <Availability />
            </div>
          </div>
        </div>
      </div>
    )
  }
}