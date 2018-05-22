import * as React from 'react'
import { Pagination } from './Pagination'

interface Props {
  claimState: Array<string>
  boss: number
  list?: Array<object>
  //page: number
  //paginationItemCount: number
  //pagesCount: number

  changeClaims(claims: Array<object>): void
  //changePage(page: number, order: boolean): void
  //changePageItemsCount(itemsCount: number, order: boolean): void
  getList(): void
  updateItem(item: object, callBack?: () => void): void
}

export class Claims extends React.Component <Props, {}> {
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
            Zoznam reklamácií:
            <span className='table-warning font-weight-bold'>NOVÁ</span>
            <span className='table-danger font-weight-bold'>VYBAVUJE SA</span>
            <span className='table-success font-weight-bold'>VYBAVENÁ</span>
          </caption>
          <thead>
            <tr>
              <th className='text-center' scope='col'>#</th>
              {
                this.props.boss === 0 ?
                <th className='text-center' scope='col'>Prevádzka</th> : null
              }
              <th className='text-center' scope='col'>Čas vytvorenia rekl.</th>
              <th className='text-center' scope='col'>Stav reklamácie</th>
              <th className='text-center' scope='col'>Obr.</th>
              <th className='text-center' scope='col'>Meno</th>
              <th className='text-center' scope='col'>Telefón</th>
              <th className='text-center' scope='col'>E-mail</th>
              <th></th>
            </tr>
           </thead>
           <tbody>
             {
                this.props.list && this.props.list.length > 0 ? this.props.list.map((item, i) => {
                  const dt: Date = new Date(item['date'])
                  const day: number = dt.getDate()
                  const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
                  const year: number = dt.getFullYear()
                  const h: string = dt.getUTCHours() < 10 ? '0'+dt.getUTCHours() : String(dt.getUTCHours())
                  const min: string = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : String(dt.getMinutes())
                  
                  return(
                    <tr key={i} className={
                      this.props.list[i]['claimState'] > 0 ?
                      (
                        this.props.list[i]['claimState'] > 1 ?
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
                          value={this.props.list[i]['claimState']}
                          onChange={e => {
                            const claims: Array<object> = this.props.list

                            claims[i]['claimState'] = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value)
                            this.props.changeClaims(claims)
                          }}
                        >
                          {
                            this.props.claimState.map((stateItem, j) => <option value={j} key={j}>{stateItem}</option>)
                          }
                        </select>
                      </td>
                      <td className='text-center'>{item['image'] ? <img src={item['image']['src']} /> : 'Obrázok nie je k dispozícii'}</td>
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
                    <h6 className='text-center'>Neboli nájdené žiadne reklamácie</h6>
                  </td>
                </tr> 
             }
           </tbody>
        </table>
      </div>
    )
  }
}
