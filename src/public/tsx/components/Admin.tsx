import * as React from 'react'
import { Availability } from './Availability'
import { Claims } from './Claims'
import { Filter } from './Filter'
import { Modal } from './Modal'
import { Nav } from './Nav'
import { Orders } from './Orders'
import { Redirect } from 'react-router'
import { TabNav } from './TabNav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  availableDates?: Array<object>
  availabilityDate?: string
  carType: Array<string>
  city?: number
  user: UserPayLoad
  claimList?: Array<object>
  orderedClaimList?: Array<object>
  dayOfWeek: number
  daysOfWeek: Array<string>
  modalMessage?: string | JSX.Element
  modalTitle: string
  claimPage: number
  claimPagesCount: number
  claimPagainationCount: number
  page: number
  paginationItemCount: number
  pagesCount: number
  program: Array<string>
  orderList?: Array<object>
  orderedOrderList?: Array<object>
  orderState: Array<string>
  workingHours: string[][]
  workingHoursAvailability: Array<boolean>

  changeAvailability(e: React.FormEvent<HTMLElement>, i: number): void
  changeCity(e: React.FormEvent<HTMLDivElement>): void
  changeClaim(claim: object): void
  changeOrder(orders: object): void
  changePage(page: number, order: boolean): void
  changePageItemsCount(itemsCount: number, order: boolean): void
  getClaimList(): void
  getOrderList(): void
  handleModal(message: string, success: boolean): void
  orderByTime(order: boolean): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
  updateOrder(order: object, callBack?: () => void): void
  updateClaim(claim: object, callBack?: () => void): void
  setDay(e: string): void
  signOut(): void
  socketListener(): void 
  submitAvailability(i: number): void
  updateAvailability(item: object): void
}

export class Admin extends React.Component<Props, {}> {
  private checkInterval: number

  constructor(props: Props) {
    super(props)
    
    this.checkInterval = 0
  }

  componentDidMount() {
    this.props.getOrderList()
    this.props.socketListener()
  }

  render() {
    return(
      <div>
        {
          Modal({
            modalMessage: this.props.modalMessage,
            modalTitle: this.props.modalTitle
          })
        }
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
                  carType={this.props.carType}
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
                  handleModal={this.props.handleModal}
                  updateItem={this.props.updateOrder}
                />
              </div>
              <div className='tab-pane fade' id='claims' role='tabpanel' aria-labelledby='claims-tab'>
                <Claims
                  boss={this.props.user.city}
                  claimState={this.props.orderState}
                  claimList={this.props.claimList}
                  list={this.props.orderedClaimList}
                  page={this.props.claimPage}
                  paginationItemCount={this.props.claimPagainationCount}
                  pagesCount={this.props.claimPagesCount}

                  changeClaims={this.props.changeClaim}
                  changePage={this.props.changePage}
                  changePageItemsCount={this.props.changePageItemsCount}
                  getList={this.props.getClaimList}
                  updateItem={this.props.updateClaim}
                />
              </div>
              <div className='tab-pane fade' id='availability' role='tabpanel' aria-labelledby='availability-tab'>
                <Availability
                  availableDates={this.props.availableDates}
                  availabilityDate={this.props.availabilityDate}
                  city={this.props.city}
                  dayOfWeek={this.props.dayOfWeek}
                  daysOfWeek={this.props.daysOfWeek}
                  user={this.props.user}
                  workingHours={this.props.workingHours}
                  workingHoursAvailability={this.props.workingHoursAvailability}

                  changeAvailability={this.props.changeAvailability}
                  changeCity={this.props.changeCity}
                  setDay={this.props.setDay}
                  submitAvailability={this.props.submitAvailability}
                  updateAvailability={this.props.updateAvailability}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}