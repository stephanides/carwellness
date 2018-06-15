import * as React from 'react'
import { Pagination } from './Pagination'

interface IProps {
  claimState: string[]
  boss: number
  claimList?: object[]
  list?: object[]
  page: number
  paginationItemCount: number
  pagesCount: number  

  changeClaims(claim: object): void
  changePage(page: number, order: boolean): void
  changePageItemsCount(itemsCount: number, order: boolean): void
  getList(): void
  updateItem(item: object, callBack?: () => void): void
}

export class Claims extends React.Component <IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }

  public componentDidMount(): void {
    this.props.getList()
  }

  public render(): JSX.Element {
    return(
      <div className='table-responsive'>
        <table className='table'>
          <caption>
            Zoznam reklamácií:
            <span className='bg-new font-weight-bold'>NOVÁ</span>
            <span className='bg-danger font-weight-bold'>ZRUŠENÁ</span>
            <span className='bg-success font-weight-bold'>VYBAVENÁ</span>
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
                  const min: string = dt.getUTCMinutes() < 10 ? '0'+dt.getUTCMinutes() : String(dt.getUTCMinutes())
                  
                  return(
                    <tr key={i} className={
                      this.props.list[i]['claimState'] > 0 ?
                      (
                        this.props.list[i]['claimState'] > 1 ?
                        'bg-success' : 'bg-danger'
                      ) : 'bg-new'
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
                            
                            this.props.changeClaims(claims[i])
                            this.props.updateItem(claims[i])
                          }}
                        >
                          {
                            this.props.claimState.map((stateItem, j) => <option value={j} key={j}>{stateItem}</option>)
                          }
                        </select>
                      </td>
                      <td className='text-center'>{item['image'] !== 'undefined' ? <img src={item['image']} /> : 'Obrázok nie je k dispozícii'}</td>
                      <td className='text-center'>{item['fullName']}</td>
                      <td className='text-center'>{item['phone']}</td>
                      <td className='text-center'>{item['email']}</td>
                    </tr>
                  )
                }) :
                <tr>
                  <td colSpan={8}>
                    <h6 className='text-center'>Neboli nájdené žiadne reklamácie</h6>
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

              this.props.changePageItemsCount(pageItemsCountVal, false)
            }}>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>∞</option>
            </select>
          </div>
          {
            this.props.claimList ?
            (
              this.props.claimList.length > this.props.paginationItemCount ?
              Pagination({
                order: false,
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
