import * as React from 'react'

interface Props {
  boss: number
  list?: Array<object>
  paginationItemCount: number
  program: Array<string>
  orderState: Array<string>
  orderList?: Array<object>
  
  changeOrders(orders: Array<object>): void
  getList(): void
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
            <span className='table-warning font-weight-bold'>NOVÁ</span>
            <span className='table-danger font-weight-bold'>VYBAVUJE SA</span>
            <span className='table-success font-weight-bold'>VYBAVENÁ</span>
          </caption>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              {
                this.props.boss === 0 ? <th className='text-center'>Mesto</th> : null
              }
              <th className='text-center' scope='col'>Termín</th>
              <th className='text-center' scope='col'>Stav Objednávky</th>
              <th className='text-center' scope='col'>Program</th>
              <th className='text-center' scope='col'>Typ auta</th>
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

                  for(let k: number = 0; k < item['program'].length; k++)
                    if(item['program'][k]) {
                      const spanElement: JSX.Element = <span className='text-nowrap' key={k}>{this.props.program[k]}</span>
                      programs.push(spanElement)
                    }

                  return(
                    <tr key={i} className={
                      this.props.list[i]['orderState'] > 0 ?
                      (
                        this.props.list[i]['orderState'] > 1 ?
                        'table-success' : 'table-danger'
                      ) : 'table-warning'
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
                      <td className='text-center'>{day+'/'+month+'/'+year+' - '+h+':'+min}</td>
                      <td className='text-center'>
                        <select
                          value={this.props.list[i]['orderState']}
                          onChange={e => {
                            const orders: Array<object> = this.props.list

                            orders[i]['orderState'] = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value)
                            this.props.changeOrders(orders)
                          }}
                        >
                          {
                            this.props.orderState.map((stateItem, j) => <option value={j} key={j}>{stateItem}</option>)
                          }
                        </select>
                      </td>
                      <td className='d-flex flex-column text-center'>{programs}</td>
                      <td className='text-center'>{item['carType']}</td>
                      <td className='text-center'>{item['fullName']}</td>
                      <td className='text-center'>{item['phone']}</td>
                      <td className='text-center'>{item['email']}</td>
                      <td className='text-center'>
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={e => {
                            const itemToUpdate = this.props.list[i]
                            this.props.updateItem(itemToUpdate)
                          }}
                        >Aktualizovať</button>
                      </td>
                    </tr>
                  )
                }) :
                <tr>
                  <td colSpan={7}>
                    <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
                  </td>
                </tr> 
              ) :
              <tr>
                <td colSpan={7}>
                  <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
                </td>
              </tr>
            }
          </tbody>
        </table>
        {
          this.props.orderList && this.props.orderList.length > this.props.paginationItemCount ?
          <div>PAGINATION</div> : null
        }
      </div>
    )
  }
}