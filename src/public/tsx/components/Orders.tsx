import * as React from 'react'
import { Pagination } from './Pagination'

interface Props {
  boss: number
  carType: Array<string>
  list?: Array<object>
  page: number
  paginationItemCount: number
  pagesCount: number
  program: Array<string>
  orderState: Array<string>
  orderList?: Array<object>
  
  changeOrder(orders: object): void
  changePage(page: number, order: boolean): void
  changePageItemsCount(itemsCount: number, order: boolean): void
  getList(): void
  handleModal(message: string, success: boolean): void
  updateItem(item: object, callBack?: () => void): void
}

export class Orders extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.getList()
  }

  render() {
    return(
      <div className='table-responsive'>
        <table className='table'>
          <caption>
            Zoznam objednávok:
            <span className='bg-warning font-weight-bold'>NOVÁ</span>
            <span className='bg-danger font-weight-bold'>ZRUŠENÁ</span>
            <span className='bg-success font-weight-bold'>VYBAVENÁ</span>
          </caption>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              {
                this.props.boss === 0 ? <th className='text-center'>Prevádzka</th> : null
              }
              <th className='text-center' scope='col'>Termín</th>
              <th className='text-center' scope='col'>Stav Objednávky</th>
              <th className='text-center' scope='col'>Program</th>
              <th className='text-center' scope='col'>Typ auta</th>
              <th className='text-center' scope='col'>Detailný typ auta</th>
              <th className='text-center' scope='col'>Meno</th>
              <th className='text-center' scope='col'>Telefón</th>
              <th className='text-center' scope='col'>E-mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.list ?
              (
                this.props.list.length > 0 ? this.props.list.map((item, i) => {
                  const dt: Date = new Date(item['date'])
                  const day: number = dt.getDate()
                  const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
                  const year: number = dt.getFullYear()
                  const h: string = dt.getUTCHours() < 10 ? '0'+dt.getUTCHours() : String(dt.getUTCHours())
                  const min: string = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : String(dt.getMinutes())

                  let programs: Array<JSX.Element> = []

                  for(let k: number = 0; k < item['program'].length; k++) {
                    if(item['program'][k]) {
                      const spanElement: JSX.Element = <span className='text-nowrap' key={k}>{this.props.program[k]}</span>
                      programs.push(spanElement)
                    }
                  }

                  return(
                    <tr key={i} className={
                      this.props.list[i]['orderState'] > 0 ?
                      (
                        this.props.list[i]['orderState'] > 1 ?
                        'bg-success' : 'bg-danger'
                      ) : 'bg-warning'
                    }>
                      <th className='text-center' scope='row'>{i+1}</th>
                      {
                        this.props.boss === 0 ?
                        (
                          item['city'] < 2 ?
                          <td className='text-center'>Nitra</td> :
                          <td className='text-center'>Žilina</td>
                        ) : null
                      }
                      <td className='text-center'>{day+'/'+month+'/'+year+' - '}<span className='badge badge-info'>{h+':'+min}</span></td>
                      <td className='text-center'>
                        <select
                          value={this.props.list[i]['orderState']}
                          onChange={e => {
                            const orders: Array<object> = this.props.list

                            orders[i]['orderState'] = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value)

                            this.props.changeOrder(orders[i])                            
                            this.props.updateItem(orders[i])
                          }}
                        >
                          {
                            this.props.orderState.map((stateItem, j) => <option value={j} key={j}>{stateItem}</option>)
                          }
                        </select>
                      </td>
                      <td className='d-flex flex-column text-center'>{programs}</td>
                      <td className='text-center'>{item['carType'] > 1 ? this.props.carType[1] : this.props.carType[0]}</td>
                      <td className='text-center'>{item['carTypeDetail']}</td>
                      <td className='text-center'>{item['fullName']}</td>
                      <td className='text-center'>{item['phone']}</td>
                      <td className='text-center'>{item['email']}</td>
                      <td className='text-center'>
                        {
                          item['message'] && item['message'] !== '' ?
                          <button type='button' className='message' onClick={() => {
                            this.props.handleModal(item['message'], true)
                          }}>
                            <span className='badge badge-info'>
                              <i className='far fa-envelope'></i>
                            </span>
                          </button> : null
                        }
                      </td>
                    </tr>
                  )
                }) :
                <tr>
                  <td colSpan={11}>
                    <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
                  </td>
                </tr> 
              ) :
              <tr>
                <td colSpan={11}>
                  <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
                </td>
              </tr>
            }
          </tbody>
        </table>
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
