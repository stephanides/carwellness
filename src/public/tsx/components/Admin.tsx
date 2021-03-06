import * as React from 'react'
import { Availability } from './Availability'
import { Claims } from './Claims'
import { Filter } from './Filter'
import { Modal } from './Modal'
import Nav from './Nav';
import { Orders } from './Orders'
import AddOrder from './Orders/components/AddOrder';
// import Products from './Products';
// import { Redirect } from 'react-router';
import { TabNav } from './TabNav'
import { IUserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  addOrder?: boolean
  pdfData?: object
  dateFrom?: number
  dateTo?: number
  availableDates?: object[]
  availabilityDate?: string
  carType: string[]
  city?: number
  employeeList?: object[] | null
  user: IUserPayLoad
  usersList?: object[]
  claimList?: object[]
  orderedClaimList?: object[]
  dayOfWeek: number
  daysOfWeek: string[]
  modalMessage?: string | JSX.Element
  modalTitle: string
  modalOrder?: boolean
  claimPage: number
  claimPagesCount: number
  claimPagainationCount: number
  page: number
  paginationItemCount: number
  pagesCount: number
  program: string[]
  timeAscend: boolean
  orderList?: object[]
  orderedOrderList?: object[]
  orderState: string[]
  workingHours: string[][]
  workingHoursAvailability: boolean[]
  products?: object[]

  handlePDFData(pdf: object, callBack?: () => void): void
  changeDateFrom(dateFrom: number): void
  changeDateTo(dateTo: number): void
  changeAvailability(e: React.FormEvent<HTMLElement>, i: number): void
  changeCity(e: React.FormEvent<HTMLDivElement>): void
  changeClaim(claim: object): void
  changeOrder(orders: object): void
  changeOrderByTime(): void
  changePage(page: number, order: boolean): void
  changePageItemsCount(itemsCount: number, order: boolean): void
  getEmployees(city?: number): Promise<void>
  getClaimList(): void
  getOrderList(): void
  getUsersList(): void
  handleModal(message: string, success: boolean, order?: boolean): void
  handleSubmitOrder(e: React.FormEvent<HTMLFormElement>): Promise<void>
  handleAddOrder(addOrder: boolean, callBack?: () => void): void
  orderByTime(order: boolean): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
  updateOrder(order: object, callBack?: () => void): void
  updateOrderArriveTime(orderedOrderList: Array<Object>): void
  updateClaim(claim: object, callBack?: () => void): void
  setDay(e: string): void
  signOut(): void
  socketListener(): void 
  submitAvailability(i: number): void
  updateAvailability(item: object): void
  getProducts(): Promise<void>
}

export class Admin extends React.Component<Props, {}> {
  private checkInterval: number

  constructor(props: Props) {
    super(props)
    
    this.checkInterval = 0
  }

  public componentDidMount() {
    this.props.getOrderList()
    this.props.socketListener()
  }

  public render(): JSX.Element {
    return(
      <div>
        <Modal
          addOrder={this.props.addOrder}
          user={this.props.user}
          modalMessage={this.props.modalMessage}
          modalTitle={this.props.modalTitle}
          modalOrder={this.props.modalOrder}
          pdfData={this.props.pdfData}
          handleSubmitOrder={this.props.handleSubmitOrder}
          handlePDFData={this.props.handlePDFData}
        />
        <div className='admin-content'>
          <Nav
            signOut={this.props.signOut}
            user={this.props.user}
          />
          {
            // Nav({ user: this.props.user, signOut: this.props.signOut })
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
                },
                /* {
                  title: 'Produkty/Služby', param: 'products'
                } */]
              })
            }
            <div className='tab-content p-3' id='adminTabContent'>
              <div className='tab-pane fade show active' id='orders' role='tabpanel' aria-labelledby='orders-tab'>
                <Filter
                  dateFrom={this.props.dateFrom}
                  dateTo={this.props.dateTo}
                  program={this.props.program}
                  orderState={this.props.orderState}
                  timeAscend={this.props.timeAscend}

                  changeDateFrom={this.props.changeDateFrom}
                  changeDateTo={this.props.changeDateTo}
                  changeOrderByTime={this.props.changeOrderByTime}
                  orderByTime={this.props.orderByTime}
                  orderByOrderState={this.props.orderByOrderState}
                  orderByOrderProgram={this.props.orderByOrderProgram}
                />
                <AddOrder
                  handleAddOrder={this.props.handleAddOrder}
                  handleModal={this.props.handleModal}
                />
                <Orders
                  carType={this.props.carType}
                  boss={this.props.user.city}
                  employeeList={this.props.employeeList}
                  list={this.props.orderedOrderList}
                  page={this.props.page}
                  paginationItemCount={this.props.paginationItemCount}
                  pagesCount={this.props.pagesCount}
                  program={this.props.program}
                  orderList={this.props.orderList}
                  orderState={this.props.orderState}
                  usersList={this.props.usersList}
                  products={this.props.products}

                  handlePDFData={this.props.handlePDFData}
                  changeOrder={this.props.changeOrder}
                  changePage={this.props.changePage}
                  changePageItemsCount={this.props.changePageItemsCount}
                  getList={this.props.getOrderList}
                  getUsersList={this.props.getUsersList}
                  getEmployees={this.props.getEmployees}
                  handleModal={this.props.handleModal}
                  updateItem={this.props.updateOrder}
                  updateOrderArriveTime={this.props.updateOrderArriveTime}
                  getProducts={this.props.getProducts}
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
              { /*
              <div className='tab-pane fade' id='products' role='tabpanel' aria-labelledby='products-tab'>
                <Products user={this.props.user} />
              </div> */
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}