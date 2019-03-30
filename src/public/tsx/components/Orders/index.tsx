import * as React from 'react'
import { Pagination } from '../Pagination';
import Table from './components/Table';

interface IProps {
  boss: number
  carType: string[]
  employeeList?: object[] | null
  list?: object[]
  page: number
  paginationItemCount: number
  pagesCount: number
  program: string[]
  orderState: string[]
  orderList?: object[]
  usersList?: object[]
  
  changeOrder(orders: object): void
  changePage(page: number, order: boolean): void
  changePageItemsCount(itemsCount: number, order: boolean): void
  getList(): void
  getEmployees(city?: number): Promise<void>
  getUsersList(): void
  handleModal(message: string, success: boolean, order?: boolean): void
  updateItem(item: object, callBack?: () => void): void
  updateOrderArriveTime(orderedOrderList: Array<Object>): void
}

export class Orders extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount(): void {
    this.props.getList();
    this.props.getUsersList();
    this.props.getEmployees(this.props.boss);
  }

  public render(): JSX.Element {
    return(
      <div className='table-responsive'>
        <Table
          changeOrder={this.props.changeOrder}
          updateItem={this.props.updateItem}
          boss={this.props.boss}
          carType={this.props.carType}
          employeeList={this.props.employeeList}
          list={this.props.list}
          program={this.props.program}
          orderState={this.props.orderState}
          usersList={this.props.usersList}
          handleModal={this.props.handleModal}
          updateOrderArriveTime={this.props.updateOrderArriveTime}
        />
        <div className='d-flex justify-content-end pagination-container'>
          <div className='form-group row mr-3'>
            <label className='col-form-label'>Počet zobrazených záznamov</label>
            <select className='form-control ml-3' onChange={e => {
              const pageItemsCountVal: number = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value)

              this.props.changePageItemsCount(pageItemsCountVal, true)
            }}>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>∞</option>
            </select>
          </div>
          {
            this.props.orderList ?
            (
              this.props.pagesCount > 1 ?
              Pagination({
                order: true,
                page: this.props.page,
                pagesCount: this.props.pagesCount,
                changePage: this.props.changePage
              }) : null
            ) : null            
          }
        </div>
      </div>
    )
  }
}
